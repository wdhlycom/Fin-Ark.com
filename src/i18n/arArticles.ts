import type { Article } from './types';

// 2026-11-09：早期直接写在代码里的 10 篇文章已全部移除。
// 文章统一由 content/ar/*.md 编译生成（见 generatedArticles.gen.ar.ts）。
// 保留空集合，维持 mergeArticles(base, extra) 的调用结构不变。
export const AR_ARTICLES: Record<string, Article[]> = {};
