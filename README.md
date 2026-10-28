# Vetri IT Systems Website (React + Node/Express + MySQL / PostgreSQL)

Rebuild of vetriitsystems.com. Every page section is stored in the database and edited from the admin panel.

- **Locally:** MySQL (the `DB_*` values in `server/.env`)
- **On Render:** Neon PostgreSQL (set `DATABASE_URL`). The same code runs on both. When `DATABASE_URL` is set, the server switches to PostgreSQL automatically.

## 1. Backend
```bash
cd server
npm install
npm run dev               # http://localhost:5000
```
`server/.env` holds the DB, JWT and SMTP values (see `.env.example`).

On first start the server automatically:
- creates the database (`DB_NAME`, default `vetri_vis`, MySQL only) and all tables
- creates the admin from `ADMIN_USERNAME` / `ADMIN_PASSWORD` (default **admin / admin123**)
- seeds every page with the SEO content
- lists the site's own files from `server/media` in the Media Library

Useful scripts:
- `npm run seed -- --force` – reset the home, About, Contact, Vetri Products and Our Expertise pages to the default content
- `npm run reset-admin` – reset the admin password back to the value in `.env`

The password changed from **Admin → Account & Password** is stored hashed in the database and takes priority over `.env`.

## 2. Frontend
```bash
cd client
npm install
npm run dev               # http://localhost:5173   admin: /admin
```
In development, Vite proxies `/api` and `/media` to `http://localhost:5000`.

## Media (images, videos, brochures)
All files live in **`server/media`** and are served at `/media/...`. No Cloudinary is used.
- **Site files** (banners, client logos, product videos, `brochures/VIS_Website_Brochures.zip`) are part of the code, so they deploy with it.
- **Admin uploads** are saved to `server/media/uploads/<year>/<month>/`. A copy of each upload is also stored in the database (`media_chunks` table). Render wipes its disk on every deploy. When an uploaded file is missing from disk, the server rebuilds it from the database the first time it is requested, so you never re-upload.
- Uploads count toward database storage. Neon's free plan includes 0.5 GB, so prefer compressed images and short videos.

## Deploy on Render (with Neon)
1. Create a Neon project and copy its connection string (`postgresql://…?sslmode=require`).
2. Push this folder to GitHub. On Render, choose **New → Blueprint**; `render.yaml` sets up one web service.
   - Without the blueprint, create a Node web service manually with Build Command `npm run build` and Start Command `npm start`.
3. Set the environment variables: `DATABASE_URL` (Neon), `ADMIN_PASSWORD` and the SMTP values. `JWT_SECRET` is generated for you.
4. Deploy. On first boot the server creates the tables in Neon, creates the admin and seeds the content. The same service serves the website, `/admin`, `/api` and `/media`.

**Copy your local content to Neon.** This copies pages, settings, SEO, enquiries, the admin login and the Media Library. It only reads local MySQL and replaces everything in Neon:
```bash
cd server
TARGET_DATABASE_URL="postgresql://…neon.tech/neondb?sslmode=require" npm run copy-to-neon -- --yes
```
Once the live site is in use, edit content in the live admin instead. Running the copy again would overwrite live edits and live enquiries.

## Admin panel
- **Explore VIS** in the sidebar lists every home section by name. Each opens its own tabbed editor, with no long scrolling forms.
- **Contact** (/contact) – consultation form (saves to Admin → Enquiries), direct contact card, office map and FAQs from the Contact SEO document. The navbar Get in Touch button opens it.
- **About** (/about) – live page layout with the About SEO document copy, plus its new Leadership and Our Team sections.
- **Vetri Products** (/solutions) – live page structure (product cards with screenshot + intro video) with the Products SEO document copy and its new sections.
- **Our Expertise** – Website, App and Software Development (content copied from the live site) and Digital Marketing (from its SEO document), each with its own numbered sections.
- **Section order & visibility** – reorder or hide sections on any page. The home page has exactly the live site's 9 sections.
- **Media Library** – every file in `server/media`. You can upload images, videos, PDF or ZIP and pick them in any media field.
- **Enquiries**, **SEO Meta Tags**, **Site Settings** (logo, contact, socials, footer), **Account & Password**.
- Every save shows a confirmation popup.

## API
Public: `GET /api/site`, `GET /api/pages/:slug`, `POST /api/enquiries`
Auth: `POST /api/auth/login` (username + password), `GET /api/auth/me`, `PUT /api/auth/password`
Admin (JWT): `/api/admin/dashboard`, `/api/admin/sections…`, `/api/admin/settings/:key`, `/api/admin/media…`, `/api/admin/c/:resource…` (services, solutions, pages, enquiries)
