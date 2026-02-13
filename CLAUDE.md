# CLAUDE.md - AI Assistant Guide for MiFamilia479

## Project Overview

**MiFamilia479** is a personal portfolio website built with Next.js, owned by GummyBear479. The site showcases projects and provides contact information.

## Repository Structure

```
MiFamilia479/
├── CLAUDE.md              # AI assistant guide (this file)
├── README.md              # Project documentation
├── package.json           # Node.js dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── next.config.ts         # Next.js configuration
├── postcss.config.mjs     # PostCSS / Tailwind CSS configuration
├── public/                # Static assets (images, icons, etc.)
└── src/
    └── app/
        ├── globals.css    # Global styles (Tailwind CSS)
        ├── layout.tsx     # Root layout component
        └── page.tsx       # Homepage (hero, about, projects, contact)
```

## Development Setup

- **Prerequisites:** Node.js >= 18
- **Install dependencies:** `npm install`
- **Run development server:** `npm run dev` (opens at http://localhost:3000)
- **Build for production:** `npm run build`
- **Start production server:** `npm start`
- **Lint:** `npm run lint`

## Key Commands

| Command         | Description                        |
|-----------------|------------------------------------|
| `npm run dev`   | Start development server           |
| `npm run build` | Build for production               |
| `npm start`     | Start production server            |
| `npm run lint`  | Run ESLint                         |

## Code Conventions

### Git Workflow

- **Default branch:** `main`
- **Feature branches:** Use `claude/<description>-<id>` pattern for AI-assisted branches
- Write clear, descriptive commit messages focused on "why" not just "what"
- Keep commits atomic - one logical change per commit

### Style Guidelines

- **Language:** TypeScript (strict mode). Use TypeScript for all new files. Prefer `.tsx` for components and `.ts` for utilities.
- **Framework:** Next.js 16 with App Router
- **Styling:** Tailwind CSS v4
- **Linting:** ESLint via `next lint`

## Architecture

- **Tech stack:** Next.js, React, TypeScript, Tailwind CSS
- **Pattern:** Next.js App Router with server components by default
- **Pages:** Single-page portfolio with section-based navigation
- **Styling:** Utility-first CSS with Tailwind; dark mode via `prefers-color-scheme`

## Testing

No testing framework is configured yet. When added, document:

- Testing framework and runner
- Test file naming conventions
- How to run tests

## CI/CD

No CI/CD pipelines are configured yet.

## Workflow Rules

- After scaffolding or modifying project files, always verify the build succeeds by running `npm run build` before reporting completion.
- When creating multi-file changes, use TodoWrite to plan the full set of files before writing any of them, then check off each item as completed.

## Important Notes for AI Assistants

1. **Read before modifying** - Always read files before suggesting changes
2. **Minimal changes** - Only make changes directly requested or clearly necessary
3. **No over-engineering** - Keep solutions simple and focused on the task at hand
4. **Security first** - Never commit secrets, credentials, or sensitive data
5. **Update this file** - When you add significant structure, tooling, or conventions to this repo, update CLAUDE.md to reflect the current state
6. **Check README.md** - Keep README.md in sync with project changes
