# Contenido en Español (content/es)

Cada artículo es un archivo Markdown independiente que corresponde a una URL semántica bajo `/es/...`.
En el build, `scripts/gen-articles.mjs` escanea este directorio y genera `src/i18n/generatedArticles.gen.es.ts`,
que se fusiona con `src/i18n/esArticles.ts` (traducciones manuales): el MD tiene prioridad, el TS cubre lo que falte.

## Campos del frontmatter
```yaml
---
section: insurance        # obligatorio: insurance | trust | gold | emerging | arkPilot | guardian
id: hk-market-landscape   # opcional: clave interna estable; por defecto el nombre de archivo. Las traducciones comparten el mismo id para emparejar hreflang
slug: mercado-hong-kong   # opcional: slug de URL de este idioma; por defecto usa id. Cada idioma puede tener un slug semántico distinto
translationKey: hk-market # opcional: clave de emparejamiento entre idiomas; por defecto id
title: ...                # obligatorio
subtitle: ...             # opcional
date: 2026-01-15          # opcional: orden
summary: ...              # opcional
pin: true                 # opcional: fijar arriba
order: 1                  # opcional: orden de fijación
category: mainland        # opcional: mainland | offshore | macro | qa
---
```
El cuerpo usa `## título de sección`; debajo va Markdown original (párrafos/listas/negritas/enlaces/citas se conservan).

## Emparejamiento con el chino
Para que un artículo en español se enlace con su versión china (`content/zh`) al cambiar de idioma / en hreflang,
ambos deben compartir el mismo `id` (o `translationKey`). Actualmente es/ar siguen usando `esArticles.ts` / `arArticles.ts`;
ve trasladando las traducciones a esta carpeta para que la pipeline MD las administre.
