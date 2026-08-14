# wordpress-elementor — local WordPress + Elementor

Local rebuild of the Rising Sun site using **WordPress + Elementor Free** and the custom theme `rsms-elementor`. Matches Next.js routes and design as closely as practical.

| | |
| --- | --- |
| Site URL | http://localhost:8891 |
| Admin | http://localhost:8891/wp-admin |
| Default login | `admin` / `password` (wp-env default) |
| Next.js (design truth) | http://localhost:3000 (`npm run dev`) |

**Staff day-to-day editing:** [docs/elementor-staff-editing-guide.md](../docs/elementor-staff-editing-guide.md)

---

## Prerequisites

- **Docker Desktop** running (required by `@wordpress/env`)
- **Node.js** 18+ (repo already uses npm)
- ~4 GB free disk for WordPress images

---

## Folder map (what is in git)

```text
wordpress-elementor/
├── .wp-env.json              # ports + path mappings
├── bin/                      # seed + Elementor convert scripts (mapped as wp-content/rsms-bin)
├── private/                  # local-only (DB dumps, notes) — gitignored except README
└── wp-content/
    ├── mu-plugins/           # wp rsms seed-pages, notices
    ├── plugins/              # NOT in git — install Elementor here locally
    └── themes/rsms-elementor/  # THEME = main code you edit
        ├── assets/css|js/
        ├── content/*.html    # HTML sources fed into the converter
        ├── functions.php     # bump RSMS_ELEMENTOR_VERSION on CSS/JS changes
        └── …

Repo also maps:
- ../public/wp-content/uploads  → Media + rsms-static (logo/fonts)
- ../public/images, ../public/assets → legacy root maps (prefer rsms-static URLs in theme)
```

**Do not commit:** third-party plugins, `.wpress` exports, production DB dumps, wp-env Docker volume data.

---

## First-time setup

From the **repo root**:

### 1. Start WordPress

```bash
npm run wp:el:start
```

Wait until Docker finishes. Site: http://localhost:8891

### 2. Install Elementor (required, not in git)

```bash
npm run wp:el:cli -- plugin install elementor --activate
```

Optional plugins you may want locally (also gitignored):

```bash
npm run wp:el:cli -- plugin install all-in-one-wp-migration --activate
npm run wp:el:cli -- plugin install wordpress-seo --activate
npm run wp:el:cli -- plugin install pdf-embedder --activate
```

### 3. Bootstrap theme + page tree

```bash
npm run wp:el:bootstrap
```

This activates `rsms-elementor`, sets permalinks, runs `wp rsms seed-pages` / staff seed. If Elementor is missing, bootstrap will try to install it.

### 4. Convert HTML → native Elementor pages

```bash
npm run wp:el:convert
```

Rebuilds pages from `wp-content/themes/rsms-elementor/content/*.html`.

### 5. (Optional) Register Media Library entries for existing uploads

If Media is empty but files exist under `public/wp-content/uploads/`:

```bash
npm run wp:el:cli -- eval-file wp-content/rsms-bin/import-uploads-to-media.php
```

### 6. Log in

http://localhost:8891/wp-admin → `admin` / `password`

---

## Daily commands

| Command | What it does |
| --- | --- |
| `npm run wp:el:start` | Start local WP (8891) |
| `npm run wp:el:stop` | Stop containers |
| `npm run wp:el:cli -- <wp-cli args>` | Run WP-CLI inside the env |
| `npm run wp:el:bootstrap` | Re-activate theme + re-seed page tree |
| `npm run wp:el:convert` | Rebuild all pages from `content/*.html` |
| `npm run wp:el:destroy` | **Wipe** local WP volumes (full reset) |

Examples:

```bash
npm run wp:el:cli -- theme list
npm run wp:el:cli -- plugin list
npm run wp:el:cli -- rsms seed-pages
npm run wp:el:cli -- eval-file wp-content/rsms-bin/rebuild-all-native.php
```

---

## How to develop locally

### Theme / CSS / JS (most common)

1. Edit files under `wp-content/themes/rsms-elementor/` (especially `assets/css`, `assets/js`, `style.css`).
2. Bump `RSMS_ELEMENTOR_VERSION` in `functions.php` so browsers load new CSS/JS.
3. Hard-refresh http://localhost:8891
4. Compare with Next.js at http://localhost:3000 when matching design.
5. Commit theme changes (see “What to commit”).
6. Deploy theme via SFTP — see **Deploy workflow** below.

### Page content structure (HTML → Elementor)

1. Edit or add `wp-content/themes/rsms-elementor/content/<stem>.html`
2. Add stem to `bin/pages.txt` and hero copy to `bin/page-heroes.json` if new
3. Ensure page exists: `npm run wp:el:cli -- rsms seed-pages`
4. Run `npm run wp:el:convert`
5. Review in Elementor / front-end

### Brand logo / fonts / icons

```text
public/wp-content/uploads/rsms-static/images/
public/wp-content/uploads/rsms-static/assets/fonts/
```

Theme URLs use `/wp-content/uploads/rsms-static/...` so full-site migrations include them. Staff use **Media Library** for page photos/PDFs — not these brand files.

---

## What to commit vs ignore

| Commit | Do not commit |
| --- | --- |
| Theme `rsms-elementor/` | `wp-content/plugins/*` (Elementor, Yoast, AIO, …) |
| `bin/`, `mu-plugins/`, `.wp-env.json`, this README | `private/*` dumps, `.wpress` |
| `public/wp-content/uploads/rsms-static/` | Generated `*-150x150.*` thumbnails |
| Staff guide under `docs/` | `.wp-env/` Docker data |

After cloning, every developer **reinstalls plugins** with WP-CLI (setup step 2).

---

## Deploy workflow (IT) — no continuous 2-way sync

Content and code are **two lanes**. There is no automatic sync between local and live.

| Lane | Who | Where | Tool |
| --- | --- | --- | --- |
| **Content** | School staff | Live (or staging for practice) | wp-admin + Elementor + Media |
| **Code** | IT / developer | Git → staging → production | Theme files + SFTP |

- Staff edits on live do **not** appear in git/local by themselves.
- Your local changes do **not** appear on live until you **deploy theme files**.

### Source of truth

| Thing | Source of truth |
| --- | --- |
| Page text, Media, PDFs, Elementor page content | **Server** (staging/live) |
| Theme CSS / JS / PHP (`rsms-elementor`) | **Git repo** |
| Brand static pack (`rsms-static`) | Repo + uploads on server |
| Menu, logo wiring, footer | IT |

**Local theme:** `wordpress-elementor/wp-content/themes/rsms-elementor/`  
**Remote theme:** `html/wp-content/themes/rsms-elementor/`

### Environments

| Environment | Role |
| --- | --- |
| **Local** (`localhost:8891`) | Develop and test theme/code |
| **Staging** (GoDaddy staging / `*.myftpupload.com`) | Stakeholder review |
| **Production** (`risingsunmontessori.org`) | Live school site |

Code flow: **local → staging → production**.  
Content flow: **staff on production** (or practice on staging).

### Theme update cycle (CSS / JS / PHP)

**Do not** use All-in-One for normal theme fixes.

1. **Edit locally** under `themes/rsms-elementor/`; bump `RSMS_ELEMENTOR_VERSION`; verify on `:8891`.
2. **Commit to git** (`git add` theme → commit → optional push).
3. **Upload to staging** via SFTP (GoDaddy → Settings → **staging** credentials):
   - Remote: `html/wp-content/themes/rsms-elementor/`
   - Overwrite changed files → hard refresh staging URL → verify.
4. **Upload the same theme to production** (production SFTP) only after staging looks good → hard refresh live.

### If theme was edited only on the server

1. SFTP download `html/wp-content/themes/rsms-elementor/`
2. Replace local theme folder → commit to git
3. Then follow the cycle above

### What not to upload in a normal theme deploy

| Skip | Why |
| --- | --- |
| Full All-in-One export/import | Overwrites DB/content |
| Entire `uploads/` (except intentional `rsms-static` updates) | Staff media lives on the server |
| Database dumps as routine | Risk of wiping staff edits |
| Unrelated plugin folders | Keep deploys small |

### When to use All-in-One WP Migration

| Use case | OK? |
| --- | --- |
| Big move: local → staging, or staging → prod cutover | Yes |
| Weekly CSS/JS fix | **No** — SFTP theme only |
| Pull live content into local for a special debug | Only when intentional; deploy **code only** back |

Never casually import a full backup onto production.

### Staff vs IT (quick)

| Task | Who |
| --- | --- |
| Change wording, swap a photo, update a PDF link | Staff |
| New simple page | Staff creates; IT adds menu link |
| Top menu, logo, footer, complex Home blocks | IT |
| Theme CSS/JS/PHP | IT (cycle above) |
| Plugins, security, redirects | IT |

---

## Reset / troubleshooting

**Site won’t start:** ensure Docker is running; retry `npm run wp:el:start`.

**White screen / missing Elementor:**

```bash
npm run wp:el:cli -- plugin install elementor --activate
npm run wp:el:cli -- theme activate rsms-elementor
```

**Pages empty / old layout:** re-run `npm run wp:el:convert`.

**Nuclear reset:**

```bash
npm run wp:el:destroy
npm run wp:el:start
# then setup steps 2–4 again
```

**Port in use:** change `"port"` in `.wp-env.json` (and remember the new URL).

---

## One-line summaries

- **Staff:** edit in wp-admin; no git.  
- **IT code:** edit theme locally → git → SFTP theme to staging → then production.  
- **No continuous 2-way sync** — pull live content/theme only when you choose to.  
- **All-in-One** = migrations/cutovers, not weekly CSS.

---

## Related docs

- [Staff Elementor editing guide](../docs/elementor-staff-editing-guide.md)
