# المحتوى بالعربية (content/ar)

كل مقال ملف Markdown مستقل يُقابل رابطاً دلالياً تحت `/ar/...`.
عند البناء، يفحص `scripts/gen-articles.mjs` هذا المجلد ويولّد `src/i18n/generatedArticles.gen.ar.ts`،
ويدمجه مع `src/i18n/arArticles.ts` (ترجمات يدوية): أولوية لـ MD، وTS يغطي الناقص.

## حقول الـ frontmatter
```yaml
---
section: insurance        # إلزامي: insurance | trust | gold | emerging | arkPilot | guardian
id: hk-market-landscape   # اختياري: مفتاح داخلي ثابت؛ افتراضياً اسم الملف. تشارك الترجمات نفس id لاقتران hreflang
slug: hong-kong-market    # اختياري: slug الرابط لهذه اللغة؛ افتراضياً id. كل لغة لها slug دلالي مختلف
translationKey: hk-market # اختياري: مفتاح الاقتران بين اللغات؛ افتراضياً id
title: ...                # إلزامي
subtitle: ...             # اختياري
date: 2026-01-15          # اختياري: للترتيب
summary: ...              # اختياري
pin: true                 # اختياري: تثبيت بالأعلى
order: 1                  # اختياري: ترتيب التثبيت
category: mainland        # اختياري: mainland | offshore | macro | qa
---
```
النص يستخدم `## عنوان القسم`؛ تحته Markdown أصلي (فقرات/قوائم/خط عريض/روابط/اقتباسات محفوظة).

## الاقتران مع الصينية
لكي يُقترن مقال عربي مع نظيره الصيني (`content/zh`) عند تبديل اللغة / في hreflang،
يجب أن يتشاركا نفس `id` (أو `translationKey`). حالياً ar لا يزال عبر `arArticles.ts`؛
انقل الترجمات تدريجياً إلى هذا المجلد لتتولى خطوط MD إدارتها.
