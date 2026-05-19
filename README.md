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
   git remote add origin https://github.com/YOUR_USERNAME/lm-proto.git
   git push -u origin main
   ```

3. In the repo on GitHub: **Settings → Pages → Build and deployment → Source** → choose **GitHub Actions**.
4. After the workflow finishes, open **Settings → Pages** for the live URL (typically `https://YOUR_USERNAME.github.io/lm-proto/`).

### Preview production build locally

```bash
BASE_PATH=/lm-proto/ npm run build
npm run preview
```

Replace `lm-proto` with your repository name if it differs.
