# College Dynasty HQ

Static production site for College Dynasty HQ.

## Deploy

The repository root is the Netlify publish directory. No build command is required.

Required production files:

- `index.html`
- `hero-background.jpg`
- `assets/`

## Verify

Run:

```bash
node scripts/verify-site.mjs
```

The check confirms that local assets referenced by `index.html` exist and that inline JavaScript parses successfully.

