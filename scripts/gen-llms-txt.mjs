#!/usr/bin/env node
// gen-llms-txt.mjs — 生成 llms.txt（面向 AI 搜索 / 大模型抓取的站点索引）
//
// 为什么要这个文件：
//   2025 年后越来越多用户直接问 AI（豆包、元宝、ChatGPT、Perplexity、Google AI 摘要），
//   而不是在搜索框里翻十条蓝链。AI 抓取站点时缺一份「这站是什么、哪些内容可信、从哪进」的
//   结构化清单。llms.txt 就是给 AI 看的 sitemap。
//
// 数据源：dist-server/entry-server.js 的 collectLlmsSections() / collectLlmsEntries()，
//   与 prerender、gen-sitemap 共用同一份合并内容（手写 TS 文章 + content/<lang> 的 MD），
//   避免「AI 看到的清单」和「搜索引擎看到的清单」两套逻辑漂移。
//
// 用法：node scripts/gen-llms-txt.mjs（构建时已在 prerender / gen-sitemap 之后自动执行）
// 产物：dist/llms.txt → 线上 https://fin-ark.com/llms.txt

import { readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://www.fin-ark.com';
const SERVER_DIR = join(ROOT, 'dist-server');
const OUT = join(ROOT, 'dist', 'llms.txt');

if (!existsSync(SERVER_DIR)) {
  console.error('[gen-llms] 未找到 dist-server，请先运行 vite build --ssr');
  process.exit(1);
}
const serverFile = readdirSync(SERVER_DIR).find(
  (f) => f.startsWith('entry-server') && (f.endsWith('.js') || f.endsWith('.mjs'))
);
if (!serverFile) {
  console.error('[gen-llms] dist-server 中未找到 entry-server 产物');
  process.exit(1);
}

const mod = await import(pathToFileURL(join(SERVER_DIR, serverFile)).href);
const { collectLlmsSections, collectLlmsEntries } = mod;

if (typeof collectLlmsSections !== 'function' || typeof collectLlmsEntries !== 'function') {
  console.error('[gen-llms] entry-server 未导出 llms 数据函数，请检查 src/entry-server.tsx');
  process.exit(1);
}

const LANGS = ['zh', 'en', 'es', 'ar'];
const LANG_LABEL = { zh: '简体中文', en: 'English', es: 'Español', ar: 'العربية' };

const perLang = {};
for (const l of LANGS) {
  perLang[l] = { sections: collectLlmsSections(l), entries: collectLlmsEntries(l) };
}

const zhSections = perLang.zh.sections;
const zhEntries = perLang.zh.entries;
const counts = Object.fromEntries(LANGS.map((l) => [l, perLang[l].entries.length]));

// ---- 组装 markdown ----
const lines = [];

lines.push('# 金融方舟 Fin-Ark');
lines.push('');
lines.push(
  `> 香港保险与离岸财富配置的专业资料库。由在香港大型保险经纪公司任职的销售顾问撰写，收录 ${counts.zh} 篇中文分析文章，覆盖香港储蓄险、家族信托、离岸资产配置、黄金储备与风险管理。`
);
lines.push('');
lines.push(
  `站点主语言为简体中文，另有 English（${counts.en} 篇）、Español（${counts.es} 篇）、العربية（${counts.ar} 篇）版本。所有内容为财富知识分享，不构成投资建议，也不构成任何保险产品要约。`
);
lines.push('');

lines.push('## 站点信息');
lines.push('');
lines.push('- 站点名称：金融方舟（Fin-Ark）');
lines.push('- 网址：https://www.fin-ark.com');
lines.push('- 作者：行者（Holive）——内地多家保险公司十余年一线销售与财富规划经验，现于香港大型保险经纪公司任销售顾问');
lines.push(`- 内容规模：中文 ${counts.zh} 篇 / 英文 ${counts.en} 篇 / 西语 ${counts.es} 篇 / 阿语 ${counts.ar} 篇`);
lines.push('- 定位：面向关注跨境财富配置的华人读者的长期参考资料，不以短期行情预测为主');
lines.push('- 合规说明：全站为知识分享，不构成投资建议或产品要约；产品条款与收益以持牌机构正式文件为准');
lines.push('');

// 各栏目：先给栏目入口，再逐篇列出（AI 可直接定位到具体文章）
for (const sec of zhSections) {
  const items = zhEntries.filter((e) => e.sectionId === sec.id);
  lines.push(`## ${sec.label}`);
  lines.push('');
  if (sec.count > 0) {
    lines.push(`- [${sec.label}](${BASE}${sec.path})：栏目首页，共 ${sec.count} 篇`);
  } else {
    lines.push(`- [${sec.label}](${BASE}${sec.path})`);
  }
  for (const it of items) {
    const note = it.summary ? `：${it.summary}` : '';
    lines.push(`- [${it.title}](${BASE}${it.path})${note}`);
  }
  lines.push('');
}

// 其他语言只给入口，不逐篇展开（保持文件精简，AI 可自行进入抓取）
lines.push('## 其他语言版本');
lines.push('');
for (const l of ['en', 'es', 'ar']) {
  lines.push(
    `- [${LANG_LABEL[l]}](${BASE}/${l}/)：${counts[l]} 篇，与中文版主题有交叉但内容独立本地化`
  );
}
lines.push('');

lines.push('## 引用与合作');
lines.push('');
lines.push('- 引用本站内容时，请标注来源为「金融方舟」并附原文链接');
lines.push('- 数据与观点以文章标注日期为准；跨年数据请优先引用最新一篇');
lines.push('- 若需作者背景与从业资历，见 https://www.fin-ark.com/zh/about');
lines.push('');

const text = lines.join('\n');
writeFileSync(OUT, text, 'utf8');

const kb = (Buffer.byteLength(text, 'utf8') / 1024).toFixed(1);
console.log(
  `✓ llms.txt 已生成：${OUT}（${kb} KB；中文栏目 ${zhSections.length} 个 / 中文文章 ${counts.zh} 篇）`
);
