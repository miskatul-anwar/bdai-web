<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# BDAI Web — Next.js

This project has been migrated from Vite + React to **Next.js** (App Router) and uses **Bun** as the package manager and runtime.

## Run Locally

**Prerequisites:** [Bun](https://bun.sh)

1. Install dependencies:
   ```
   bun install
   ```
2. Set the `GEMINI_API_KEY` in `.env.local`:
   ```
   GEMINI_API_KEY="your-key-here"
   ```
3. Run the development server:
   ```
   bun run dev
   ```

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start the development server on port 3000 |
| `bun run build` | Create an optimised production build |
| `bun run start` | Start the production server |
| `bun run clean` | Remove the `.next` build cache |
| `bun run lint` | Run linting and type checks |

## Project Structure

```
src/
  app/            # Next.js App Router (pages & layouts)
  components/     # Shared React components
  layouts/        # Navbar component
  views/          # Page content components (Home, About, etc.)
  lib/            # Utilities (cn helper)
  constants.ts    # App-wide constants & data
components/       # shadcn/ui base components
```

