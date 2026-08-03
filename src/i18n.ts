export type { Lang, SectionId, Article, Dict } from './i18n/types';
export { LANGS, SECTIONS } from './i18n/types';

import type { Article, Dict, Lang } from './i18n/types';
import { ZH_SHARED } from './i18n/zhShared';
import { ZH_ARTICLES } from './i18n/zhArticles';
import { GENERATED_ARTICLES } from './i18n/generatedArticles.gen';
import { EN_SHARED } from './i18n/enShared';
import { EN_ARTICLES } from './i18n/enArticles';
import { ES_SHARED } from './i18n/esShared';
import { ES_ARTICLES } from './i18n/esArticles';
import { AR_SHARED } from './i18n/arShared';
import { AR_ARTICLES } from './i18n/arArticles';
// 各语言 MD 管线产物（content/<lang>/*.md 编译而来）；缺失语言目录时生成为 {}，由手写 TS 兜底。
import { GENERATED_ARTICLES_en } from './i18n/generatedArticles.gen.en';
import { GENERATED_ARTICLES_es } from './i18n/generatedArticles.gen.es';
import { GENERATED_ARTICLES_ar } from './i18n/generatedArticles.gen.ar';

// 合并手动文章与 MD 管线生成文章：重叠板块采用「追加」而非「覆盖」，
// 确保原有手动文章不丢失，同时生成文章也出现在对应栏目。
//
// 合并后处理：
//  1. 同 id 去重（保留 base 中已有的手动版本，避免重复出现）。
//  2. 排序：全部板块默认为 asc（早→晚，日期较早在前）；置顶文章(pin)始终最前，
//     不受排序方向影响。仅当某板块存在 pin 或显式配置了排序方向时才重排。
const SECTION_SORT_DIR: Record<string, 'asc' | 'desc'> = {
  insurance: 'asc',
  trust: 'asc',
  gold: 'asc',
  emerging: 'asc',
  guardian: 'asc',
  arkPilot: 'asc',
};

function sortSection(key: string, arr: Article[]): Article[] {
  const dir = SECTION_SORT_DIR[key] ?? 'desc';
  const cmp = (a: Article, b: Article) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
  const pinned = arr
    .filter((a) => a.pin)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || cmp(a, b));
  const rest = arr
    .filter((a) => !a.pin)
    .sort((a, b) => (dir === 'asc' ? cmp(a, b) : cmp(b, a)));
  return [...pinned, ...rest];
}

function mergeArticles(
  base: Record<string, Article[]>,
  extra: Record<string, Article[]>
): Record<string, Article[]> {
  const out: Record<string, Article[]> = { ...base };
  for (const key of Object.keys(extra)) {
    const merged = [...(out[key] ?? []), ...extra[key]];
    const seen = new Set<string>();
    const deduped = merged.filter((a) => (seen.has(a.id) ? false : (seen.add(a.id), true)));
    const needSort = deduped.some((a) => a.pin) || SECTION_SORT_DIR[key];
    out[key] = needSort ? sortSection(key, deduped) : deduped;
  }
  return out;
}

export const I18N: Record<Lang, Dict> = {
  zh: {
    ...ZH_SHARED,
    articles: mergeArticles(ZH_ARTICLES, GENERATED_ARTICLES) as Dict['articles'],
  },
  // 文章：手写 TS 作为基础层，MD 管线产物作为覆盖层（同 id 去重时 MD 优先），
  // 实现「每语言独立 Markdown 源、按语言加载」且迁移期不丢失既有译文。
  en: { ...EN_SHARED, articles: mergeArticles(EN_ARTICLES, GENERATED_ARTICLES_en) as Dict['articles'] },
  es: { ...ES_SHARED, articles: mergeArticles(ES_ARTICLES, GENERATED_ARTICLES_es) as Dict['articles'] },
  ar: { ...AR_SHARED, articles: mergeArticles(AR_ARTICLES, GENERATED_ARTICLES_ar) as Dict['articles'] },
};
