# Copilot Instructions for MiFamilia479

**Concise guide for AI agents contributing to this React + Gemini AI application.**

## Architecture Overview

MiFamilia479 is a React 19 + Tailwind + Gemini API application with a clear layered architecture:

- **Views** (`src/components/views/`) - Full-page content areas (DashboardView, FOIAManager, HealingLedger, ProtocolIntelligence)
- **Layout** (`src/components/Layout/`) - Page structure (Sidebar, MobileHeader, MainLayout)
- **Components** (`src/components/ProtocolIntelligence/`, `SettingsPanel`) - Feature containers and reusable logic
- **UI** (`src/components/UI/`) - Atomic components (Card, Badge, InputField, LoadingSpinner)
- **Services** (`src/services/`) - Business logic: `geminiService` (all 20+ AI tool prompts), `configService` (API key management)
- **Hooks** (`src/hooks/`) - Reusable stateful logic: `useGeminiAPI`, `useChatHistory`, `useLocalStorage`, `useAudioPlayer`, `useToolInput`
- **Constants** (`src/constants/`) - Centralized: brand colors, tool definitions, mock data

## Key Patterns & Constraints

1. **Component Responsibility** - Each component has one clear purpose; extract complex state into custom hooks
2. **API Key Priority** - Load in order: `settings > localStorage > .env.local` (see `configService.js`)
3. **Persistence** - Use `useLocalStorage` hook for data that survives page reloads
4. **AI Tool Access** - All 20+ Gemini prompts live in `geminiService.js`; invoke via `useGeminiAPI` hook
5. **No Prop Drilling** - Use custom hooks or contexts for deeply nested data
6. **Error Handling** - ErrorBoundary wraps top-level components; never let rendering errors break the app

## Development Workflow

```bash
npm run dev        # Start server on localhost:5173
npm run build      # Production build
npm run lint       # Check code quality (ESLint)
```

**Git Branches** - Use pattern: `claude/<description>-<id>` (e.g., `claude/fix-chat-input-123`)

## When Adding Features

1. **New View** → Create file in `src/components/views/`, add tab in main navigation
2. **New AI Tool** → Add prompt definition to `src/constants/tools.js`, call via `geminiService`
3. **New UI Component** → Place reusable elements in `src/components/UI/`
4. **Complex State** → Extract into custom hook in `src/hooks/` following existing hook patterns
5. **Persistent Data** → Use `useLocalStorage(key, initialValue)` hook

## Critical Files

- `src/App.jsx` - Main app routing/navigation
- `src/services/geminiService.js` - All AI prompts and API orchestration
- `src/constants/tools.js` - Tool definitions for ProtocolIntelligence interface
- `src/hooks/useGeminiAPI.js` - API call wrapper with error handling
- `CLAUDE.md` - Comprehensive architecture guide (read before major changes)

## Before Committing

- [ ] No hardcoded API keys (use `.env.local`)
- [ ] Components tested manually against manual testing checklist (see CLAUDE.md)
- [ ] Follow existing code patterns in similar files (e.g., match hook style of `useAudioPlayer.js`)
- [ ] Update CLAUDE.md if adding new conventions or structure

## Stack & Tools

- **React 19** | **Vite** | **Tailwind CSS 4** | **Lucide Icons** | **Recharts** | **Google Gemini API**
