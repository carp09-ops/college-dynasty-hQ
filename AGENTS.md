# Project working agreement

- Treat `index.html` and the files under `assets/` as the production source of truth.
- Preserve the existing visual identity, content, responsive behavior, and browser-storage data unless a requested change explicitly requires otherwise.
- Make focused changes and avoid unrelated rewrites of the large single-file application.
- Keep asset paths relative so the site continues to work on Netlify and when opened locally.
- Never rename or remove browser-storage keys without documenting and testing a migration.
- Run `node scripts/verify-site.mjs` after every code or asset change.
- Check desktop and mobile layouts before publishing user-facing changes.
- Do not deploy automatically unless the user explicitly asks for a deployment.

