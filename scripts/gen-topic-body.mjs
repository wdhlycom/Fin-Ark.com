/**
 * 由 deliverables/topic-body-<lang>/*.md 生成 src/data/topicBody.gen.ts。
 * 改稿后跑一次：node scripts/gen-topic-body.mjs
 *
 * MD 约定：首行 # 标题、> 引用行跳过；第一个 ## 之前的正文段是导语；
 *          ## 开头为小节标题，其余非空行各为一段。每个专题固定 5 节。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = ['zh', 'en', 'es', 'ar'];
const IDS = ['gold-storage', 'trust-succession', 'dividend-fulfillment', 'multi-currency-savings'];
const OUT = path.join(ROOT, 'src/data/topicBody.gen.ts');

const q = (s) => "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'";

function parseMd(file) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  let lead = '';
  const sections = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('# ') || line.startsWith('> ')) continue;
    if (line.startsWith('## ')) {
      sections.push({ heading: line.slice(3).trim(), paragraphs: [] });
    } else if (sections.length === 0) {
      lead = line;
    } else {
      sections[sections.length - 1].paragraphs.push(line);
    }
  }
  if (!lead || sections.length !== 5) {
    throw new Error(`[${file}] 结构异常：lead=${Boolean(lead)} sections=${sections.length}`);
  }
  return { lead, sections };
}

let out = `// 自动生成，勿手改。
// 来源：deliverables/topic-body-<lang>/*.md
// 重新生成：node scripts/gen-topic-body.mjs
import type { Lang } from '../i18n/types';

export type TopicBodySection = {
  heading: string;
  paragraphs: string[];
};

export type TopicBody = {
  lead: string;
  sections: TopicBodySection[];
};

export const TOPIC_BODY: Record<string, Partial<Record<Lang, TopicBody>>> = {
`;

for (const id of IDS) {
  out += `  ${q(id)}: {\n`;
  for (const lang of LANGS) {
    const file = path.join(ROOT, 'deliverables', `topic-body-${lang}`, `${id}.md`);
    const b = parseMd(file);
    out += `    ${lang}: {\n      lead: ${q(b.lead)},\n      sections: [\n`;
    for (const s of b.sections) {
      out += `        { heading: ${q(s.heading)}, paragraphs: [\n`;
      for (const p of s.paragraphs) out += `          ${q(p)},\n`;
      out += '        ] },\n';
    }
    out += '      ],\n    },\n';
    const chars =
      b.lead.length +
      b.sections.reduce((n, s) => n + s.heading.length + s.paragraphs.join('').length, 0);
    const parts = b.sections.reduce((n, s) => n + s.paragraphs.length, 0);
    console.log(`${lang}/${id}: 5 节 / ${parts} 段 / ${chars} 字符`);
  }
  out += '  },\n';
}
out += '};\n';

fs.writeFileSync(OUT, out, 'utf8');
console.log(`\n写出 ${path.relative(ROOT, OUT)}`);
