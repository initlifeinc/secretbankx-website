# SecretBankX website

Bilingual, dependency-free static website. Chinese pages live at `/`, English at `/en/`; `/privacy.html` and `/terms.html` remain stable. The retired `/careers.html` is a contact page. Product images are original native App captures from isolated synthetic demo runs, with provenance in `evidence/native-assets.json`. Page composition uses CSS frames and shadows without changing screenshot pixels (lossless WebP encoding is verified pixel-identical).

## Local review

```sh
python3 scripts/build-site.py
python3 scripts/preview.py
```

Open `http://127.0.0.1:8899/?lang=zh` or `http://127.0.0.1:8899/en/?lang=en`.

Edit homepage copy/templates in `scripts/build-site.py`, migrated candidate policies in `i18n/zh.json` and `i18n/en.json`, visual styling in `style.css`, interactions in `site.js`. Rebuild after content changes. Generated HTML is committed so hosting needs no build runtime. Browser/system language chooses Chinese for Chinese locales and English otherwise on stable entry paths; manual preference persists when local storage is available. Language links work without storage and JavaScript.

## Validation

With Playwright and Google Chrome installed, run `node scripts/verify-site.cjs` while the server is active. `NODE_PATH` may point at an existing Playwright installation. See `evidence/README.md` for results, image provenance and outstanding publication checks.

## Publication boundary

Read-only GitHub API inspection on 2026-10-20 confirmed GitHub Pages **legacy deployment from `main` at `/`**, custom domain `secretbankx.initlife.com`. A push to main can publish immediately. The owner approved this redesign for commit and publication on 2026-10-21. Later preview-only or screenshot requests still need their own publication authorization before a push to main. Do not copy deployment commands from the InitLife reference repository.

Reusable native screenshot instructions and `$sbx-website-screenshots` live in the SBX engineering repository at `docs/publish/website-and-screenshots.md` and `.agents/skills/sbx-website-screenshots/`. They cover matching demo data, light/dark pairing, native Mac window controls, simulator capture and lossless export.
