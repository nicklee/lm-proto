<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/85d4d9ce-c22e-4ae6-8a62-b5897755f00d

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This app is a static Vite build. Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds and publishes to GitHub Pages.

### First-time setup

1. Create a new repository on GitHub (for example `lm-proto`).
2. From this folder, initialize git and push:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin git@github.com:YOUR_USERNAME/lm-proto.git
   git push -u origin main
   ```

3. In the repo on GitHub: **Settings → Pages → Build and deployment → Source** → choose **GitHub Actions**.
4. After the workflow finishes, open **Settings → Pages** for the live URL (typically `https://YOUR_USERNAME.github.io/lm-proto/`).

### Password protection (prototype)

The live site can show a password screen before the app loads. This keeps casual visitors out; it is **not** strong security (the hash is in the built JavaScript).

1. In GitHub: **Settings → Secrets and variables → Actions → New repository secret**
2. Name: `PROTOTYPE_PASSWORD` — value: your chosen password (plain text; the workflow hashes it at build time)
3. Push to `main` or re-run the deploy workflow

Locally, add to `.env.local` (hash only, not the plain password):

```bash
printf '%s' 'your-password' | shasum -a 256
# Copy the hex string into:
# VITE_PROTOTYPE_PASSWORD_HASH=...
```

Leave `VITE_PROTOTYPE_PASSWORD_HASH` unset for local dev with no gate.

### Preview production build locally

```bash
BASE_PATH=/lm-proto/ npm run build
npm run preview
```

Replace `lm-proto` with your repository name if it differs.
