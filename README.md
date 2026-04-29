<div align="center">

  <h1>BDAI Web</h1>

  <p><strong>BanglaDesh Sectoral Knowledge Graphs and Large Language Models for Artificial Intelligence-Driven Insights</strong></p>

  <p>
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white" />
    <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" />
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
    <img alt="Bun" src="https://img.shields.io/badge/Bun-latest-F9F1E1?logo=bun&logoColor=black" />
  </p>
</div>

---

## Overview

**BDAI Web** is the official web platform for the *BDAI* research project, which leverages **sectoral knowledge graphs** and **large language models (LLMs)** to deliver AI-driven analytical insights about Bangladesh. The platform surfaces research outputs, work package progress, consortium information, and an interactive SPARQL query tool — all within a responsive, modern interface.

---

## Features

| Section | Description |
|---|---|
| **Home** | Project landing page with a high-level introduction |
| **About → Background** | Research context and motivation |
| **About → BDAI Videos** | Embedded video resources |
| **About → Impact** | Expected societal and scientific impact |
| **About → Objectives** | Formal research objectives |
| **About → One Pager** | Printable one-page project summary |
| **Work Packages** | Detailed breakdown of WP1, WP2, and WP3 deliverables |
| **Consortium** | Partner institutions and collaborator profiles |
| **Results → Reports** | Published technical and progress reports |
| **Results → Publications** | Academic publications and preprints |
| **SPARQL Tool** | Interactive AI-assisted SPARQL query interface powered by Gemini |

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) — App Router |
| **Runtime / Package Manager** | [Bun](https://bun.sh/) |
| **Language** | TypeScript 5.8 |
| **UI** | React 19, Tailwind CSS 4, Framer Motion, Base UI |
| **Icons** | Lucide React, Tabler Icons |
| **Data Visualisation** | D3.js, Recharts |
| **AI** | Google Gemini (`@google/genai`) |
| **Markdown Rendering** | `react-markdown` |
| **Geo Mapping** | `dotted-map`, `countries-list` |

---

## Getting Started

### Prerequisites

- **[Bun](https://bun.sh/)** ≥ 1.0 — install with `curl -fsSL https://bun.sh/install | bash`
- A **Gemini API key** — obtain one at [Google AI Studio](https://aistudio.google.com/app/apikey)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/miskatul-anwar/bdai-web.git
cd bdai-web

# 2. Install dependencies
bun install

# 3. Configure environment variables
cp .env.example .env.local
#    Then open .env.local and set GEMINI_API_KEY to your key

# 4. Start the development server (http://localhost:3000)
bun run dev
```

### Production Build

```bash
bun run build   # Compile and optimise for production
bun run start   # Serve the production build
```

### Linting

```bash
bun run lint    # Run Next.js ESLint checks
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and populate the values before running the app.

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini API key used by the SPARQL Tool and any AI features |
| `APP_URL` | ⚠️ Optional | Public URL of the deployed app (used for self-referential links and OAuth callbacks) |

> **Never commit `.env.local` to version control.** It is already listed in `.gitignore`.

---

## Project Structure

```
bdai-web/
├── src/
│   ├── app/                  # Next.js App Router — routes & root layout
│   │   ├── layout.tsx        # Global layout (Navbar, fonts, global styles)
│   │   ├── page.tsx          # Home route
│   │   ├── about/            # About sub-routes (background, videos, impact …)
│   │   ├── work-packages/    # WP1 / WP2 / WP3 routes
│   │   ├── consortium/       # Consortium route
│   │   ├── results/          # Reports & Publications routes
│   │   └── sparql-tool/      # SPARQL Tool route
│   ├── views/                # Page-level React components (one per route)
│   ├── components/           # Shared, reusable UI components
│   ├── layouts/              # Navbar and structural layout components
│   ├── lib/                  # Utility functions and helpers
│   └── constants.ts          # App-wide constants
├── components/               # (root-level) shadcn/ui component overrides
├── .env.example              # Environment variable template
├── next.config.ts            # Next.js configuration
├── tailwind.config           # Tailwind CSS configuration (via PostCSS)
├── tsconfig.json             # TypeScript configuration
└── package.json              # Scripts and dependencies
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository and create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes** and ensure the code lints cleanly:
   ```bash
   bun run lint
   ```
3. **Commit** your changes with a descriptive message:
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. **Push** your branch and open a **Pull Request** against `main`.

Please keep pull requests focused and include a clear description of what has changed and why.

---

## License

This project is maintained by the BDAI research consortium. Please contact the repository maintainer for licensing and usage enquiries.
