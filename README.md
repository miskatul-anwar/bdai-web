<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# BDAI Web

BanglaDesh Sectoral Knowledge Graphs and Large Language Models for Artificial Intelligence-Driven Insights.

Built with **Next.js 15** (App Router) and **Bun**.

## Run Locally

**Prerequisites:** [Bun](https://bun.sh)

1. Install dependencies:
   ```bash
   bun install
   ```
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key
3. Run the dev server:
   ```bash
   bun run dev
   ```

## Build for Production

```bash
bun run build
bun run start
```

## Project Structure

```
src/
├── app/          # Next.js App Router (routes & layout)
├── views/        # Page content components
├── components/   # Shared UI components
├── layouts/      # Navbar and layout components
└── lib/          # Utility functions
```
