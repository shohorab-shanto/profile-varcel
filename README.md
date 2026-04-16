# Portfolio - Vercel Version (Standalone)

This is a standalone version of the portfolio designed for easy deployment to Vercel without requiring a running Laravel backend.

## Features
- **Zero Backend Required**: All data is mocked within `src/lib/api.ts`.
- **Static Site Generation Ready**: Works perfectly with Vercel's default Next.js deployment.
- **Dynamic UI**: Retains all animations, glassmorphism, and responsive design.

## Deployment to Vercel

1. **Push to GitHub**: Create a new repository and push the contents of this folder (`frontend_vercel`).
2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com/).
   - Click "New Project".
   - Import your GitHub repository.
3. **Build Settings**:
   - Framework Preset: **Next.js**.
   - Build Command: `npm run build`.
   - Output Directory: `.next`.
4. **Environment Variables**: No specific variables are required for the static version as data is bundled.

## How to Update Data
To update the content (Profile, Projects, Skills, etc.), modify the `MOCK_*` constants in `src/lib/api.ts`.

## Admin Access
The Admin Dashboard (`/admin`) is still accessible for demonstration purposes. Any login credentials will work with the mock authentication. Note that changes made in the Admin panel will not persist as there is no database.
