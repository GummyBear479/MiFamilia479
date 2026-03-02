# CLAUDE.md - AI Assistant Guide for MiFamilia479

## Project Overview

**MiFamilia479** is a newly initialized repository owned by GummyBear479. The project is in its early stages with no source code, build system, or dependencies configured yet. This file serves as the foundational guide for AI assistants contributing to this repository.

## Repository Structure

```text
MiFamilia479/
├── CLAUDE.md                  # AI assistant guide (this file)
├── README.md                  # Project documentation
├── .env.local.example         # Environment variables template
├── package.json               # Dependencies
├── vite.config.js             # Vite configuration
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # Main app component (refactored)
│   ├── components/
│   │   ├── Layout/            # Layout components
│   │   │   ├── Sidebar.jsx    # Desktop sidebar navigation
│   │   │   ├── MobileHeader.jsx
│   │   │   └── MainLayout.jsx
│   │   ├── views/             # Page-level view components
│   │   │   ├── DashboardView.jsx
│   │   │   ├── FOIAManager.jsx
│   │   │   ├── HealingLedger.jsx
│   │   │   ├── ProtocolIntelligence.jsx (view wrapper)
│   │   │   └── BrandSystem.jsx
│   │   ├── ProtocolIntelligence/  # AI tools interface
│   │   │   ├── ProtocolIntelligence.jsx (main container)
│   │   │   ├── ToolSelector.jsx
│   │   │   ├── InputPanel.jsx
│   │   │   ├── OutputPanel.jsx
│   │   │   └── ChatContainer.jsx
│   │   ├── UI/                # Reusable UI components
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── InputField.jsx
│   │   ├── ErrorBoundary.jsx  # Error boundary wrapper
│   │   └── SettingsPanel.jsx  # API key & preferences UI
│   ├── hooks/                 # Custom React hooks
│   │   ├── useLocalStorage.js
│   │   ├── useGeminiAPI.js
│   │   ├── useChatHistory.js
│   │   ├── useToolInput.js
│   │   ├── useMobileMenu.js
│   │   └── useAudioPlayer.js
│   ├── services/              # Business logic services
│   │   ├── geminiService.js   # Gemini API wrapper with all tools
│   │   └── configService.js   # Config & API key management
│   ├── utils/                 # Utility functions
│   │   ├── audioConverter.js
│   │   ├── validation.js
│   │   ├── formatters.js
│   │   └── dataExport.js
│   ├── constants/             # Constants & configuration
│   │   ├── colors.js          # Brand color palette
│   │   ├── tools.js           # 20+ AI tool definitions
│   │   └── mockData.js        # Sample data
│   └── config/
│       └── index.js           # Central config loader
└── .git/                      # Git metadata
```

## Development Setup

**Prerequisites:**

- Node.js >= 18+
- npm or yarn

**Installation & Running:**

```bash
# Install dependencies
npm install

# Copy environment template and add your API keys
cp .env.local.example .env.local
# Edit .env.local and add VITE_GEMINI_API_KEY

# Run development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

**Getting API Keys:**

1. Go to <https://makersuite.google.com/app/apikey>
2. Create a new API key
3. Copy it to `.env.local` as `VITE_GEMINI_API_KEY`
4. Or paste it in the Settings panel within the app (stored in localStorage)

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on localhost:5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## Code Conventions

### Git Workflow

- **Default branch:** `main`
- **Feature branches:** Use `claude/<description>-<id>` pattern for AI-assisted branches
- Write clear, descriptive commit messages focused on "why" not just "what"
- Keep commits atomic - one logical change per commit

### Style Guidelines

No linter or formatter is configured yet. When established, document:

- Language-specific style rules
- Linting tool and configuration file location
- Formatting tool and configuration file location
- Pre-commit hooks if any

## Architecture

### Tech Stack

- **Frontend:** React 19 with TypeScript support
- **Styling:** Tailwind CSS 4
- **Build Tool:** Vite
- **Icons:** Lucide React
- **Charts:** Recharts
- **AI:** Google Gemini API (Text, Vision, Audio)
- **State Management:** React Hooks + localStorage for persistence
- **Code Quality:** ESLint

### Design Patterns

**Component Organization:**

- **Layout Components** (`src/components/Layout/`) - Page structure controllers
- **View Components** (`src/components/views/`) - Full-page content areas
- **Subcomponents** (e.g., `ProtocolIntelligence/`) - Complex feature breakdowns
- **UI Components** (`src/components/UI/`) - Reusable, atomic UI elements
- **Special:** ErrorBoundary for error handling, SettingsPanel for configuration

**State Management:**

- Custom React Hooks (`src/hooks/`) for reusable stateful logic
- `useLocalStorage` for persistent data
- `useGeminiAPI` for API call orchestration
- `useChatHistory` for conversation persistence

**Business Logic:**

- Services layer (`src/services/`) wraps complex operations
- `geminiService` - All 20+ AI tool prompts and API calls
- `configService` - API key loading with priority: settings > localStorage > .env

**Data Organization:**

- Constants (`src/constants/`) - Brand colors, tool definitions, mock data
- Utilities (`src/utils/`) - Pure functions for audio, validation, formatting, export
- Config (`src/config/`) - Central config loader

### Data Flow

1. **User Input** → InputPanel/ChatContainer
2. **Validation** → useToolInput hook
3. **API Call** → useGeminiAPI hook → GeminiService
4. **Response Handling** → OutputPanel/ChatContainer
5. **Persistence** → useLocalStorage hook
6. **User Controls** → TTS (useAudioPlayer), Translation, Copy, Download

### API Key Management

**Priority Order (highest to lowest):**

1. Settings panel input (runtime override)
2. localStorage (user-persisted)
3. .env.local environment variable (secure)

See `src/config/index.js` and `ConfigService` for details.

## Testing

### Manual Testing Checklist

- [ ] Navigation - All 5 tabs switch correctly
- [ ] Dashboard - Chart loads and displays correctly
- [ ] FOIA Manager - Table displays FOIA requests
- [ ] Healing Ledger - Co-Care Credits and verified contributions display
- [ ] Protocol Intelligence:
  - [ ] Tool selector loads all 20+ tools
  - [ ] Chat mode works with Assistant tool
  - [ ] API calls complete (requires API key)
  - [ ] Text-to-Speech functionality works
  - [ ] Translation to Spanish works
  - [ ] Copy-to-clipboard works
  - [ ] Image generation works for "Vision Painter" tool
- [ ] Settings Panel:
  - [ ] Can input and save API key
  - [ ] Key is persisted in localStorage
  - [ ] Can clear all data
- [ ] Mobile Responsiveness:
  - [ ] Sidebar hides on mobile
  - [ ] Mobile header menu works
  - [ ] Content adapts to small screens
- [ ] Error Handling:
  - [ ] ErrorBoundary catches render errors
  - [ ] Invalid API keys show error messages
  - [ ] Network errors handled gracefully

### Future Testing Setup

When testing framework is added, create:

- Unit tests for hooks (`src/hooks/*.test.js`)
- Unit tests for utilities (`src/utils/*.test.js`)
- Component tests for UI components (`src/components/UI/*.test.jsx`)
- Integration tests for API services
- E2E tests for user workflows

## CI/CD

No CI/CD pipelines are configured. When added, document:

- Pipeline configuration file locations
- Build and deploy stages
- Required checks before merging

## Important Notes for AI Assistants

### General Principles

1. **Read before modifying** - Always read files before suggesting changes
2. **Minimal changes** - Only make changes directly requested or clearly necessary
3. **No over-engineering** - Keep solutions simple and focused on the task at hand
4. **Security first** - Never commit secrets, credentials, or sensitive data (API keys in .env.local)
5. **Update this file** - When you add significant structure, tooling, or conventions to this repo, update CLAUDE.md to reflect the current state
6. **Check README.md** - Keep README.md in sync with project changes

### Architectural Principles

1. **Component Responsibility** - Each component should have a single, clear purpose
2. **Hook Reusability** - Extract stateful logic into custom hooks for reuse
3. **Service Layer** - Complex operations go in services (e.g., `geminiService` for all AI calls)
4. **Constants Centralization** - Define brand colors, tool configs, and mock data in `src/constants/`
5. **API Key Handling** - Use `ConfigService` to load keys; never hardcode them in components
6. **Persistence** - Use `useLocalStorage` hook for data that should survive page reloads

### Development Workflow

1. **Atomic Commits** - Each commit should represent one logical change
2. **Feature Branches** - Use `claude/<description>-<id>` pattern for AI-assisted work
3. **Branch Cleanup** - Delete branches after merging to keep repo clean
4. **No Force Pushes** - Avoid destructive git operations on shared branches

### When Adding New Features

1. **Follow Existing Patterns** - Match the code style and organization of similar features
2. **Modularize First** - Break features into small, reusable components
3. **Test Manually** - Use the checklist in the Testing section
4. **Update Documentation** - Update this file and README.md to reflect changes

### Performance & Security

1. **Avoid Prop Drilling** - Use hooks or context for deeply nested data
2. **Memoize Expensive Renders** - Use React.memo() for components with heavy computations
3. **Error Boundaries** - Wrap features in ErrorBoundary; never let errors break the entire app
4. **Input Validation** - Always validate user input before sending to APIs (see `src/utils/validation.js`)
5. **Sensitive Data** - Store API keys securely; never log them; never commit them
# CLAUDE.md - AI Assistant Guide for MiFamilia479

## Project Overview

**MiFamilia479** is a newly initialized repository owned by GummyBear479. The project is in its early stages with no source code, build system, or dependencies configured yet. This file serves as the foundational guide for AI assistants contributing to this repository.

## Repository Structure

```text
MiFamilia479/
├── CLAUDE.md                  # AI assistant guide (this file)
├── README.md                  # Project documentation
├── .env.local.example         # Environment variables template
├── package.json               # Dependencies
├── vite.config.js             # Vite configuration
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # Main app component (refactored)
│   ├── components/
│   │   ├── Layout/            # Layout components
│   │   │   ├── Sidebar.jsx    # Desktop sidebar navigation
│   │   │   ├── MobileHeader.jsx
│   │   │   └── MainLayout.jsx
│   │   ├── views/             # Page-level view components
│   │   │   ├── DashboardView.jsx
│   │   │   ├── FOIAManager.jsx
│   │   │   ├── HealingLedger.jsx
│   │   │   ├── ProtocolIntelligence.jsx (view wrapper)
│   │   │   └── BrandSystem.jsx
│   │   ├── ProtocolIntelligence/  # AI tools interface
│   │   │   ├── ProtocolIntelligence.jsx (main container)
│   │   │   ├── ToolSelector.jsx
│   │   │   ├── InputPanel.jsx
│   │   │   ├── OutputPanel.jsx
│   │   │   └── ChatContainer.jsx
│   │   ├── UI/                # Reusable UI components
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── InputField.jsx
│   │   ├── ErrorBoundary.jsx  # Error boundary wrapper
│   │   └── SettingsPanel.jsx  # API key & preferences UI
│   ├── hooks/                 # Custom React hooks
│   │   ├── useLocalStorage.js
│   │   ├── useGeminiAPI.js
│   │   ├── useChatHistory.js
│   │   ├── useToolInput.js
│   │   ├── useMobileMenu.js
│   │   └── useAudioPlayer.js
│   ├── services/              # Business logic services
│   │   ├── geminiService.js   # Gemini API wrapper with all tools
│   │   └── configService.js   # Config & API key management
│   ├── utils/                 # Utility functions
│   │   ├── audioConverter.js
│   │   ├── validation.js
│   │   ├── formatters.js
│   │   └── dataExport.js
│   ├── constants/             # Constants & configuration
│   │   ├── colors.js          # Brand color palette
│   │   ├── tools.js           # 20+ AI tool definitions
│   │   └── mockData.js        # Sample data
│   └── config/
│       └── index.js           # Central config loader
└── .git/                      # Git metadata
```

## Development Setup

**Prerequisites:**

- Node.js >= 18+
- npm or yarn

**Installation & Running:**

```bash
# Install dependencies
npm install

# Copy environment template and add your API keys
cp .env.local.example .env.local
# Edit .env.local and add VITE_GEMINI_API_KEY

# Run development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

**Getting API Keys:**

1. Go to <https://makersuite.google.com/app/apikey>
2. Create a new API key
3. Copy it to `.env.local` as `VITE_GEMINI_API_KEY`
4. Or paste it in the Settings panel within the app (stored in localStorage)

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on localhost:5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## Code Conventions

### Git Workflow

- **Default branch:** `main`
- **Feature branches:** Use `claude/<description>-<id>` pattern for AI-assisted branches
- Write clear, descriptive commit messages focused on "why" not just "what"
- Keep commits atomic - one logical change per commit

### Style Guidelines

No linter or formatter is configured yet. When established, document:

- Language-specific style rules
- Linting tool and configuration file location
- Formatting tool and configuration file location
- Pre-commit hooks if any

## Architecture

### Tech Stack

- **Frontend:** React 19 with TypeScript support
- **Styling:** Tailwind CSS 4
- **Build Tool:** Vite
- **Icons:** Lucide React
- **Charts:** Recharts
- **AI:** Google Gemini API (Text, Vision, Audio)
- **State Management:** React Hooks + localStorage for persistence
- **Code Quality:** ESLint

### Design Patterns

**Component Organization:**

- **Layout Components** (`src/components/Layout/`) - Page structure controllers
- **View Components** (`src/components/views/`) - Full-page content areas
- **Subcomponents** (e.g., `ProtocolIntelligence/`) - Complex feature breakdowns
- **UI Components** (`src/components/UI/`) - Reusable, atomic UI elements
- **Special:** ErrorBoundary for error handling, SettingsPanel for configuration

**State Management:**

- Custom React Hooks (`src/hooks/`) for reusable stateful logic
- `useLocalStorage` for persistent data
- `useGeminiAPI` for API call orchestration
- `useChatHistory` for conversation persistence

**Business Logic:**

- Services layer (`src/services/`) wraps complex operations
- `geminiService` - All 20+ AI tool prompts and API calls
- `configService` - API key loading with priority: settings > localStorage > .env

**Data Organization:**

- Constants (`src/constants/`) - Brand colors, tool definitions, mock data
- Utilities (`src/utils/`) - Pure functions for audio, validation, formatting, export
- Config (`src/config/`) - Central config loader

### Data Flow

1. **User Input** → InputPanel/ChatContainer
2. **Validation** → useToolInput hook
3. **API Call** → useGeminiAPI hook → GeminiService
4. **Response Handling** → OutputPanel/ChatContainer
5. **Persistence** → useLocalStorage hook
6. **User Controls** → TTS (useAudioPlayer), Translation, Copy, Download

### API Key Management

**Priority Order (highest to lowest):**

1. Settings panel input (runtime override)
2. localStorage (user-persisted)
3. .env.local environment variable (secure)

See `src/config/index.js` and `ConfigService` for details.

## Testing

### Manual Testing Checklist

- [ ] Navigation - All 5 tabs switch correctly
- [ ] Dashboard - Chart loads and displays correctly
- [ ] FOIA Manager - Table displays FOIA requests
- [ ] Healing Ledger - Co-Care Credits and verified contributions display
- [ ] Protocol Intelligence:
  - [ ] Tool selector loads all 20+ tools
  - [ ] Chat mode works with Assistant tool
  - [ ] API calls complete (requires API key)
  - [ ] Text-to-Speech functionality works
  - [ ] Translation to Spanish works
  - [ ] Copy-to-clipboard works
  - [ ] Image generation works for "Vision Painter" tool
- [ ] Settings Panel:
  - [ ] Can input and save API key
  - [ ] Key is persisted in localStorage
  - [ ] Can clear all data
- [ ] Mobile Responsiveness:
  - [ ] Sidebar hides on mobile
  - [ ] Mobile header menu works
  - [ ] Content adapts to small screens
- [ ] Error Handling:
  - [ ] ErrorBoundary catches render errors
  - [ ] Invalid API keys show error messages
  - [ ] Network errors handled gracefully

### Future Testing Setup

When testing framework is added, create:

- Unit tests for hooks (`src/hooks/*.test.js`)
- Unit tests for utilities (`src/utils/*.test.js`)
- Component tests for UI components (`src/components/UI/*.test.jsx`)
- Integration tests for API services
- E2E tests for user workflows

## CI/CD

No CI/CD pipelines are configured. When added, document:

- Pipeline configuration file locations
- Build and deploy stages
- Required checks before merging

## Important Notes for AI Assistants

### General Principles

1. **Read before modifying** - Always read files before suggesting changes
2. **Minimal changes** - Only make changes directly requested or clearly necessary
3. **No over-engineering** - Keep solutions simple and focused on the task at hand
4. **Security first** - Never commit secrets, credentials, or sensitive data (API keys in .env.local)
5. **Update this file** - When you add significant structure, tooling, or conventions to this repo, update CLAUDE.md to reflect the current state
6. **Check README.md** - Keep README.md in sync with project changes

### Architectural Principles

1. **Component Responsibility** - Each component should have a single, clear purpose
2. **Hook Reusability** - Extract stateful logic into custom hooks for reuse
3. **Service Layer** - Complex operations go in services (e.g., `geminiService` for all AI calls)
4. **Constants Centralization** - Define brand colors, tool configs, and mock data in `src/constants/`
5. **API Key Handling** - Use `ConfigService` to load keys; never hardcode them in components
6. **Persistence** - Use `useLocalStorage` hook for data that should survive page reloads

### Development Workflow

1. **Atomic Commits** - Each commit should represent one logical change
2. **Feature Branches** - Use `claude/<description>-<id>` pattern for AI-assisted work
3. **Branch Cleanup** - Delete branches after merging to keep repo clean
4. **No Force Pushes** - Avoid destructive git operations on shared branches

### When Adding New Features

1. **Follow Existing Patterns** - Match the code style and organization of similar features
2. **Modularize First** - Break features into small, reusable components
3. **Test Manually** - Use the checklist in the Testing section
4. **Update Documentation** - Update this file and README.md to reflect changes

### Performance & Security

1. **Avoid Prop Drilling** - Use hooks or context for deeply nested data
2. **Memoize Expensive Renders** - Use React.memo() for components with heavy computations
3. **Error Boundaries** - Wrap features in ErrorBoundary; never let errors break the entire app
4. **Input Validation** - Always validate user input before sending to APIs (see `src/utils/validation.js`)
5. **Sensitive Data** - Store API keys securely; never log them; never commit them
# CLAUDE.md - AI Assistant Guide for MiFamilia479

## Project Overview

**MiFamilia479** is a newly initialized repository owned by GummyBear479. The project is in its early stages with no source code, build system, or dependencies configured yet. This file serves as the foundational guide for AI assistants contributing to this repository.

## Repository Structure

```text
MiFamilia479/
├── CLAUDE.md                  # AI assistant guide (this file)
├── README.md                  # Project documentation
├── .env.local.example         # Environment variables template
├── package.json               # Dependencies
├── vite.config.js             # Vite configuration
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # Main app component (refactored)
│   ├── components/
│   │   ├── Layout/            # Layout components
│   │   │   ├── Sidebar.jsx    # Desktop sidebar navigation
│   │   │   ├── MobileHeader.jsx
│   │   │   └── MainLayout.jsx
│   │   ├── views/             # Page-level view components
│   │   │   ├── DashboardView.jsx
│   │   │   ├── FOIAManager.jsx
│   │   │   ├── HealingLedger.jsx
│   │   │   ├── ProtocolIntelligence.jsx (view wrapper)
│   │   │   └── BrandSystem.jsx
│   │   ├── ProtocolIntelligence/  # AI tools interface
│   │   │   ├── ProtocolIntelligence.jsx (main container)
│   │   │   ├── ToolSelector.jsx
│   │   │   ├── InputPanel.jsx
│   │   │   ├── OutputPanel.jsx
│   │   │   └── ChatContainer.jsx
│   │   ├── UI/                # Reusable UI components
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── InputField.jsx
│   │   ├── ErrorBoundary.jsx  # Error boundary wrapper
│   │   └── SettingsPanel.jsx  # API key & preferences UI
│   ├── hooks/                 # Custom React hooks
│   │   ├── useLocalStorage.js
│   │   ├── useGeminiAPI.js
│   │   ├── useChatHistory.js
│   │   ├── useToolInput.js
│   │   ├── useMobileMenu.js
│   │   └── useAudioPlayer.js
│   ├── services/              # Business logic services
│   │   ├── geminiService.js   # Gemini API wrapper with all tools
│   │   └── configService.js   # Config & API key management
│   ├── utils/                 # Utility functions
│   │   ├── audioConverter.js
│   │   ├── validation.js
│   │   ├── formatters.js
│   │   └── dataExport.js
│   ├── constants/             # Constants & configuration
│   │   ├── colors.js          # Brand color palette
│   │   ├── tools.js           # 20+ AI tool definitions
│   │   └── mockData.js        # Sample data
│   └── config/
│       └── index.js           # Central config loader
└── .git/                      # Git metadata
```

## Development Setup

**Prerequisites:**

- Node.js >= 18+
- npm or yarn

**Installation & Running:**

```bash
# Install dependencies
npm install

# Copy environment template and add your API keys
cp .env.local.example .env.local
# Edit .env.local and add VITE_GEMINI_API_KEY

# Run development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

**Getting API Keys:**

1. Go to <https://makersuite.google.com/app/apikey>
2. Create a new API key
3. Copy it to `.env.local` as `VITE_GEMINI_API_KEY`
4. Or paste it in the Settings panel within the app (stored in localStorage)

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on localhost:5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## Code Conventions

### Git Workflow

- **Default branch:** `main`
- **Feature branches:** Use `claude/<description>-<id>` pattern for AI-assisted branches
- Write clear, descriptive commit messages focused on "why" not just "what"
- Keep commits atomic - one logical change per commit

### Style Guidelines

No linter or formatter is configured yet. When established, document:

- Language-specific style rules
- Linting tool and configuration file location
- Formatting tool and configuration file location
- Pre-commit hooks if any

## Architecture

### Tech Stack

- **Frontend:** React 19 with TypeScript support
- **Styling:** Tailwind CSS 4
- **Build Tool:** Vite
- **Icons:** Lucide React
- **Charts:** Recharts
- **AI:** Google Gemini API (Text, Vision, Audio)
- **State Management:** React Hooks + localStorage for persistence
- **Code Quality:** ESLint

### Design Patterns

**Component Organization:**

- **Layout Components** (`src/components/Layout/`) - Page structure controllers
- **View Components** (`src/components/views/`) - Full-page content areas
- **Subcomponents** (e.g., `ProtocolIntelligence/`) - Complex feature breakdowns
- **UI Components** (`src/components/UI/`) - Reusable, atomic UI elements
- **Special:** ErrorBoundary for error handling, SettingsPanel for configuration

**State Management:**

- Custom React Hooks (`src/hooks/`) for reusable stateful logic
- `useLocalStorage` for persistent data
- `useGeminiAPI` for API call orchestration
- `useChatHistory` for conversation persistence

**Business Logic:**

- Services layer (`src/services/`) wraps complex operations
- `geminiService` - All 20+ AI tool prompts and API calls
- `configService` - API key loading with priority: settings > localStorage > .env

**Data Organization:**

- Constants (`src/constants/`) - Brand colors, tool definitions, mock data
- Utilities (`src/utils/`) - Pure functions for audio, validation, formatting, export
- Config (`src/config/`) - Central config loader

### Data Flow

1. **User Input** → InputPanel/ChatContainer
2. **Validation** → useToolInput hook
3. **API Call** → useGeminiAPI hook → GeminiService
4. **Response Handling** → OutputPanel/ChatContainer
5. **Persistence** → useLocalStorage hook
6. **User Controls** → TTS (useAudioPlayer), Translation, Copy, Download

### API Key Management

**Priority Order (highest to lowest):**

1. Settings panel input (runtime override)
2. localStorage (user-persisted)
3. .env.local environment variable (secure)

See `src/config/index.js` and `ConfigService` for details.

## Testing

### Manual Testing Checklist

- [ ] Navigation - All 5 tabs switch correctly
- [ ] Dashboard - Chart loads and displays correctly
- [ ] FOIA Manager - Table displays FOIA requests
- [ ] Healing Ledger - Co-Care Credits and verified contributions display
- [ ] Protocol Intelligence:
  - [ ] Tool selector loads all 20+ tools
  - [ ] Chat mode works with Assistant tool
  - [ ] API calls complete (requires API key)
  - [ ] Text-to-Speech functionality works
  - [ ] Translation to Spanish works
  - [ ] Copy-to-clipboard works
  - [ ] Image generation works for "Vision Painter" tool
- [ ] Settings Panel:
  - [ ] Can input and save API key
  - [ ] Key is persisted in localStorage
  - [ ] Can clear all data
- [ ] Mobile Responsiveness:
  - [ ] Sidebar hides on mobile
  - [ ] Mobile header menu works
  - [ ] Content adapts to small screens
- [ ] Error Handling:
  - [ ] ErrorBoundary catches render errors
  - [ ] Invalid API keys show error messages
  - [ ] Network errors handled gracefully

### Future Testing Setup

When testing framework is added, create:

- Unit tests for hooks (`src/hooks/*.test.js`)
- Unit tests for utilities (`src/utils/*.test.js`)
- Component tests for UI components (`src/components/UI/*.test.jsx`)
- Integration tests for API services
- E2E tests for user workflows

## CI/CD

No CI/CD pipelines are configured. When added, document:

- Pipeline configuration file locations
- Build and deploy stages
- Required checks before merging

## Important Notes for AI Assistants

### General Principles

1. **Read before modifying** - Always read files before suggesting changes
2. **Minimal changes** - Only make changes directly requested or clearly necessary
3. **No over-engineering** - Keep solutions simple and focused on the task at hand
4. **Security first** - Never commit secrets, credentials, or sensitive data (API keys in .env.local)
5. **Update this file** - When you add significant structure, tooling, or conventions to this repo, update CLAUDE.md to reflect the current state
6. **Check README.md** - Keep README.md in sync with project changes

### Architectural Principles

1. **Component Responsibility** - Each component should have a single, clear purpose
2. **Hook Reusability** - Extract stateful logic into custom hooks for reuse
3. **Service Layer** - Complex operations go in services (e.g., `geminiService` for all AI calls)
4. **Constants Centralization** - Define brand colors, tool configs, and mock data in `src/constants/`
5. **API Key Handling** - Use `ConfigService` to load keys; never hardcode them in components
6. **Persistence** - Use `useLocalStorage` hook for data that should survive page reloads

### Development Workflow

1. **Atomic Commits** - Each commit should represent one logical change
2. **Feature Branches** - Use `claude/<description>-<id>` pattern for AI-assisted work
3. **Branch Cleanup** - Delete branches after merging to keep repo clean
4. **No Force Pushes** - Avoid destructive git operations on shared branches

### When Adding New Features

1. **Follow Existing Patterns** - Match the code style and organization of similar features
2. **Modularize First** - Break features into small, reusable components
3. **Test Manually** - Use the checklist in the Testing section
4. **Update Documentation** - Update this file and README.md to reflect changes

### Performance & Security

1. **Avoid Prop Drilling** - Use hooks or context for deeply nested data
2. **Memoize Expensive Renders** - Use React.memo() for components with heavy computations
3. **Error Boundaries** - Wrap features in ErrorBoundary; never let errors break the entire app
4. **Input Validation** - Always validate user input before sending to APIs (see `src/utils/validation.js`)
5. **Sensitive Data** - Store API keys securely; never log them; never commit them
# CLAUDE.md - AI Assistant Guide for MiFamilia479

## Project Overview

**MiFamilia479** is a newly initialized repository owned by GummyBear479. The project is in its early stages with no source code, build system, or dependencies configured yet. This file serves as the foundational guide for AI assistants contributing to this repository.

## Repository Structure

```text
MiFamilia479/
├── CLAUDE.md                  # AI assistant guide (this file)
├── README.md                  # Project documentation
├── .env.local.example         # Environment variables template
├── package.json               # Dependencies
├── vite.config.js             # Vite configuration
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # Main app component (refactored)
│   ├── components/
│   │   ├── Layout/            # Layout components
│   │   │   ├── Sidebar.jsx    # Desktop sidebar navigation
│   │   │   ├── MobileHeader.jsx
│   │   │   └── MainLayout.jsx
│   │   ├── views/             # Page-level view components
│   │   │   ├── DashboardView.jsx
│   │   │   ├── FOIAManager.jsx
│   │   │   ├── HealingLedger.jsx
│   │   │   ├── ProtocolIntelligence.jsx (view wrapper)
│   │   │   └── BrandSystem.jsx
│   │   ├── ProtocolIntelligence/  # AI tools interface
│   │   │   ├── ProtocolIntelligence.jsx (main container)
│   │   │   ├── ToolSelector.jsx
│   │   │   ├── InputPanel.jsx
│   │   │   ├── OutputPanel.jsx
│   │   │   └── ChatContainer.jsx
│   │   ├── UI/                # Reusable UI components
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── InputField.jsx
│   │   ├── ErrorBoundary.jsx  # Error boundary wrapper
│   │   └── SettingsPanel.jsx  # API key & preferences UI
│   ├── hooks/                 # Custom React hooks
│   │   ├── useLocalStorage.js
│   │   ├── useGeminiAPI.js
│   │   ├── useChatHistory.js
│   │   ├── useToolInput.js
│   │   ├── useMobileMenu.js
│   │   └── useAudioPlayer.js
│   ├── services/              # Business logic services
│   │   ├── geminiService.js   # Gemini API wrapper with all tools
│   │   └── configService.js   # Config & API key management
│   ├── utils/                 # Utility functions
│   │   ├── audioConverter.js
│   │   ├── validation.js
│   │   ├── formatters.js
│   │   └── dataExport.js
│   ├── constants/             # Constants & configuration
│   │   ├── colors.js          # Brand color palette
│   │   ├── tools.js           # 20+ AI tool definitions
│   │   └── mockData.js        # Sample data
│   └── config/
│       └── index.js           # Central config loader
└── .git/                      # Git metadata
```

## Development Setup

**Prerequisites:**

- Node.js >= 18+
- npm or yarn

**Installation & Running:**

```bash
# Install dependencies
npm install

# Copy environment template and add your API keys
cp .env.local.example .env.local
# Edit .env.local and add VITE_GEMINI_API_KEY

# Run development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

**Getting API Keys:**

1. Go to <https://makersuite.google.com/app/apikey>
2. Create a new API key
3. Copy it to `.env.local` as `VITE_GEMINI_API_KEY`
4. Or paste it in the Settings panel within the app (stored in localStorage)

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on localhost:5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## Code Conventions

### Git Workflow

- **Default branch:** `main`
- **Feature branches:** Use `claude/<description>-<id>` pattern for AI-assisted branches
- Write clear, descriptive commit messages focused on "why" not just "what"
- Keep commits atomic - one logical change per commit

### Style Guidelines

No linter or formatter is configured yet. When established, document:

- Language-specific style rules
- Linting tool and configuration file location
- Formatting tool and configuration file location
- Pre-commit hooks if any

## Architecture

### Tech Stack

- **Frontend:** React 19 with TypeScript support
- **Styling:** Tailwind CSS 4
- **Build Tool:** Vite
- **Icons:** Lucide React
- **Charts:** Recharts
- **AI:** Google Gemini API (Text, Vision, Audio)
- **State Management:** React Hooks + localStorage for persistence
- **Code Quality:** ESLint

### Design Patterns

**Component Organization:**

- **Layout Components** (`src/components/Layout/`) - Page structure controllers
- **View Components** (`src/components/views/`) - Full-page content areas
- **Subcomponents** (e.g., `ProtocolIntelligence/`) - Complex feature breakdowns
- **UI Components** (`src/components/UI/`) - Reusable, atomic UI elements
- **Special:** ErrorBoundary for error handling, SettingsPanel for configuration

**State Management:**

- Custom React Hooks (`src/hooks/`) for reusable stateful logic
- `useLocalStorage` for persistent data
- `useGeminiAPI` for API call orchestration
- `useChatHistory` for conversation persistence

**Business Logic:**

- Services layer (`src/services/`) wraps complex operations
- `geminiService` - All 20+ AI tool prompts and API calls
- `configService` - API key loading with priority: settings > localStorage > .env

**Data Organization:**

- Constants (`src/constants/`) - Brand colors, tool definitions, mock data
- Utilities (`src/utils/`) - Pure functions for audio, validation, formatting, export
- Config (`src/config/`) - Central config loader

### Data Flow

1. **User Input** → InputPanel/ChatContainer
2. **Validation** → useToolInput hook
3. **API Call** → useGeminiAPI hook → GeminiService
4. **Response Handling** → OutputPanel/ChatContainer
5. **Persistence** → useLocalStorage hook
6. **User Controls** → TTS (useAudioPlayer), Translation, Copy, Download

### API Key Management

**Priority Order (highest to lowest):**

1. Settings panel input (runtime override)
2. localStorage (user-persisted)
3. .env.local environment variable (secure)

See `src/config/index.js` and `ConfigService` for details.

## Testing

### Manual Testing Checklist

- [ ] Navigation - All 5 tabs switch correctly
- [ ] Dashboard - Chart loads and displays correctly
- [ ] FOIA Manager - Table displays FOIA requests
- [ ] Healing Ledger - Co-Care Credits and verified contributions display
- [ ] Protocol Intelligence:
  - [ ] Tool selector loads all 20+ tools
  - [ ] Chat mode works with Assistant tool
  - [ ] API calls complete (requires API key)
  - [ ] Text-to-Speech functionality works
  - [ ] Translation to Spanish works
  - [ ] Copy-to-clipboard works
  - [ ] Image generation works for "Vision Painter" tool
- [ ] Settings Panel:
  - [ ] Can input and save API key
  - [ ] Key is persisted in localStorage
  - [ ] Can clear all data
- [ ] Mobile Responsiveness:
  - [ ] Sidebar hides on mobile
  - [ ] Mobile header menu works
  - [ ] Content adapts to small screens
- [ ] Error Handling:
  - [ ] ErrorBoundary catches render errors
  - [ ] Invalid API keys show error messages
  - [ ] Network errors handled gracefully

### Future Testing Setup

When testing framework is added, create:

- Unit tests for hooks (`src/hooks/*.test.js`)
- Unit tests for utilities (`src/utils/*.test.js`)
- Component tests for UI components (`src/components/UI/*.test.jsx`)
- Integration tests for API services
- E2E tests for user workflows

## CI/CD

No CI/CD pipelines are configured. When added, document:

- Pipeline configuration file locations
- Build and deploy stages
- Required checks before merging

## Important Notes for AI Assistants

### General Principles

1. **Read before modifying** - Always read files before suggesting changes
2. **Minimal changes** - Only make changes directly requested or clearly necessary
3. **No over-engineering** - Keep solutions simple and focused on the task at hand
4. **Security first** - Never commit secrets, credentials, or sensitive data (API keys in .env.local)
5. **Update this file** - When you add significant structure, tooling, or conventions to this repo, update CLAUDE.md to reflect the current state
6. **Check README.md** - Keep README.md in sync with project changes

### Architectural Principles

1. **Component Responsibility** - Each component should have a single, clear purpose
2. **Hook Reusability** - Extract stateful logic into custom hooks for reuse
3. **Service Layer** - Complex operations go in services (e.g., `geminiService` for all AI calls)
4. **Constants Centralization** - Define brand colors, tool configs, and mock data in `src/constants/`
5. **API Key Handling** - Use `ConfigService` to load keys; never hardcode them in components
6. **Persistence** - Use `useLocalStorage` hook for data that should survive page reloads

### Development Workflow

1. **Atomic Commits** - Each commit should represent one logical change
2. **Feature Branches** - Use `claude/<description>-<id>` pattern for AI-assisted work
3. **Branch Cleanup** - Delete branches after merging to keep repo clean
4. **No Force Pushes** - Avoid destructive git operations on shared branches

### When Adding New Features

1. **Follow Existing Patterns** - Match the code style and organization of similar features
2. **Modularize First** - Break features into small, reusable components
3. **Test Manually** - Use the checklist in the Testing section
4. **Update Documentation** - Update this file and README.md to reflect changes

### Performance & Security

1. **Avoid Prop Drilling** - Use hooks or context for deeply nested data
2. **Memoize Expensive Renders** - Use React.memo() for components with heavy computations
3. **Error Boundaries** - Wrap features in ErrorBoundary; never let errors break the entire app
4. **Input Validation** - Always validate user input before sending to APIs (see `src/utils/validation.js`)
5. **Sensitive Data** - Store API keys securely; never log them; never commit them
# CLAUDE.md - AI Assistant Guide for MiFamilia479

## Project Overview

**MiFamilia479** is a newly initialized repository owned by GummyBear479. The project is in its early stages with no source code, build system, or dependencies configured yet. This file serves as the foundational guide for AI assistants contributing to this repository.

## Repository Structure

```text
MiFamilia479/
├── CLAUDE.md                  # AI assistant guide (this file)
├── README.md                  # Project documentation
├── .env.local.example         # Environment variables template
├── package.json               # Dependencies
├── vite.config.js             # Vite configuration
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # Main app component (refactored)
│   ├── components/
│   │   ├── Layout/            # Layout components
│   │   │   ├── Sidebar.jsx    # Desktop sidebar navigation
│   │   │   ├── MobileHeader.jsx
│   │   │   └── MainLayout.jsx
│   │   ├── views/             # Page-level view components
│   │   │   ├── DashboardView.jsx
│   │   │   ├── FOIAManager.jsx
│   │   │   ├── HealingLedger.jsx
│   │   │   ├── ProtocolIntelligence.jsx (view wrapper)
│   │   │   └── BrandSystem.jsx
│   │   ├── ProtocolIntelligence/  # AI tools interface
│   │   │   ├── ProtocolIntelligence.jsx (main container)
│   │   │   ├── ToolSelector.jsx
│   │   │   ├── InputPanel.jsx
│   │   │   ├── OutputPanel.jsx
│   │   │   └── ChatContainer.jsx
│   │   ├── UI/                # Reusable UI components
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── InputField.jsx
│   │   ├── ErrorBoundary.jsx  # Error boundary wrapper
│   │   └── SettingsPanel.jsx  # API key & preferences UI
│   ├── hooks/                 # Custom React hooks
│   │   ├── useLocalStorage.js
│   │   ├── useGeminiAPI.js
│   │   ├── useChatHistory.js
│   │   ├── useToolInput.js
│   │   ├── useMobileMenu.js
│   │   └── useAudioPlayer.js
│   ├── services/              # Business logic services
│   │   ├── geminiService.js   # Gemini API wrapper with all tools
│   │   └── configService.js   # Config & API key management
│   ├── utils/                 # Utility functions
│   │   ├── audioConverter.js
│   │   ├── validation.js
│   │   ├── formatters.js
│   │   └── dataExport.js
│   ├── constants/             # Constants & configuration
│   │   ├── colors.js          # Brand color palette
│   │   ├── tools.js           # 20+ AI tool definitions
│   │   └── mockData.js        # Sample data
│   └── config/
│       └── index.js           # Central config loader
└── .git/                      # Git metadata
```

## Development Setup

**Prerequisites:**

- Node.js >= 18+
- npm or yarn

**Installation & Running:**

```bash
# Install dependencies
npm install

# Copy environment template and add your API keys
cp .env.local.example .env.local
# Edit .env.local and add VITE_GEMINI_API_KEY

# Run development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

**Getting API Keys:**

1. Go to <https://makersuite.google.com/app/apikey>
2. Create a new API key
3. Copy it to `.env.local` as `VITE_GEMINI_API_KEY`
4. Or paste it in the Settings panel within the app (stored in localStorage)

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on localhost:5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## Code Conventions

### Git Workflow

- **Default branch:** `main`
- **Feature branches:** Use `claude/<description>-<id>` pattern for AI-assisted branches
- Write clear, descriptive commit messages focused on "why" not just "what"
- Keep commits atomic - one logical change per commit

### Style Guidelines

No linter or formatter is configured yet. When established, document:

- Language-specific style rules
- Linting tool and configuration file location
- Formatting tool and configuration file location
- Pre-commit hooks if any

## Architecture

### Tech Stack

- **Frontend:** React 19 with TypeScript support
- **Styling:** Tailwind CSS 4
- **Build Tool:** Vite
- **Icons:** Lucide React
- **Charts:** Recharts
- **AI:** Google Gemini API (Text, Vision, Audio)
- **State Management:** React Hooks + localStorage for persistence
- **Code Quality:** ESLint

### Design Patterns

**Component Organization:**

- **Layout Components** (`src/components/Layout/`) - Page structure controllers
- **View Components** (`src/components/views/`) - Full-page content areas
- **Subcomponents** (e.g., `ProtocolIntelligence/`) - Complex feature breakdowns
- **UI Components** (`src/components/UI/`) - Reusable, atomic UI elements
- **Special:** ErrorBoundary for error handling, SettingsPanel for configuration

**State Management:**

- Custom React Hooks (`src/hooks/`) for reusable stateful logic
- `useLocalStorage` for persistent data
- `useGeminiAPI` for API call orchestration
- `useChatHistory` for conversation persistence

**Business Logic:**

- Services layer (`src/services/`) wraps complex operations
- `geminiService` - All 20+ AI tool prompts and API calls
- `configService` - API key loading with priority: settings > localStorage > .env

**Data Organization:**

- Constants (`src/constants/`) - Brand colors, tool definitions, mock data
- Utilities (`src/utils/`) - Pure functions for audio, validation, formatting, export
- Config (`src/config/`) - Central config loader

### Data Flow

1. **User Input** → InputPanel/ChatContainer
2. **Validation** → useToolInput hook
3. **API Call** → useGeminiAPI hook → GeminiService
4. **Response Handling** → OutputPanel/ChatContainer
5. **Persistence** → useLocalStorage hook
6. **User Controls** → TTS (useAudioPlayer), Translation, Copy, Download

### API Key Management

**Priority Order (highest to lowest):**

1. Settings panel input (runtime override)
2. localStorage (user-persisted)
3. .env.local environment variable (secure)

See `src/config/index.js` and `ConfigService` for details.

## Testing

### Manual Testing Checklist

- [ ] Navigation - All 5 tabs switch correctly
- [ ] Dashboard - Chart loads and displays correctly
- [ ] FOIA Manager - Table displays FOIA requests
- [ ] Healing Ledger - Co-Care Credits and verified contributions display
- [ ] Protocol Intelligence:
  - [ ] Tool selector loads all 20+ tools
  - [ ] Chat mode works with Assistant tool
  - [ ] API calls complete (requires API key)
  - [ ] Text-to-Speech functionality works
  - [ ] Translation to Spanish works
  - [ ] Copy-to-clipboard works
  - [ ] Image generation works for "Vision Painter" tool
- [ ] Settings Panel:
  - [ ] Can input and save API key
  - [ ] Key is persisted in localStorage
  - [ ] Can clear all data
- [ ] Mobile Responsiveness:
  - [ ] Sidebar hides on mobile
  - [ ] Mobile header menu works
  - [ ] Content adapts to small screens
- [ ] Error Handling:
  - [ ] ErrorBoundary catches render errors
  - [ ] Invalid API keys show error messages
  - [ ] Network errors handled gracefully

### Future Testing Setup

When testing framework is added, create:

- Unit tests for hooks (`src/hooks/*.test.js`)
- Unit tests for utilities (`src/utils/*.test.js`)
- Component tests for UI components (`src/components/UI/*.test.jsx`)
- Integration tests for API services
- E2E tests for user workflows

## CI/CD

No CI/CD pipelines are configured. When added, document:

- Pipeline configuration file locations
- Build and deploy stages
- Required checks before merging

## Important Notes for AI Assistants

### General Principles

1. **Read before modifying** - Always read files before suggesting changes
2. **Minimal changes** - Only make changes directly requested or clearly necessary
3. **No over-engineering** - Keep solutions simple and focused on the task at hand
4. **Security first** - Never commit secrets, credentials, or sensitive data (API keys in .env.local)
5. **Update this file** - When you add significant structure, tooling, or conventions to this repo, update CLAUDE.md to reflect the current state
6. **Check README.md** - Keep README.md in sync with project changes

### Architectural Principles

1. **Component Responsibility** - Each component should have a single, clear purpose
2. **Hook Reusability** - Extract stateful logic into custom hooks for reuse
3. **Service Layer** - Complex operations go in services (e.g., `geminiService` for all AI calls)
4. **Constants Centralization** - Define brand colors, tool configs, and mock data in `src/constants/`
5. **API Key Handling** - Use `ConfigService` to load keys; never hardcode them in components
6. **Persistence** - Use `useLocalStorage` hook for data that should survive page reloads

### Development Workflow

1. **Atomic Commits** - Each commit should represent one logical change
2. **Feature Branches** - Use `claude/<description>-<id>` pattern for AI-assisted work
3. **Branch Cleanup** - Delete branches after merging to keep repo clean
4. **No Force Pushes** - Avoid destructive git operations on shared branches

### When Adding New Features

1. **Follow Existing Patterns** - Match the code style and organization of similar features
2. **Modularize First** - Break features into small, reusable components
3. **Test Manually** - Use the checklist in the Testing section
4. **Update Documentation** - Update this file and README.md to reflect changes

### Performance & Security

1. **Avoid Prop Drilling** - Use hooks or context for deeply nested data
2. **Memoize Expensive Renders** - Use React.memo() for components with heavy computations
3. **Error Boundaries** - Wrap features in ErrorBoundary; never let errors break the entire app
4. **Input Validation** - Always validate user input before sending to APIs (see `src/utils/validation.js`)
5. **Sensitive Data** - Store API keys securely; never log them; never commit them
# CLAUDE.md - AI Assistant Guide for MiFamilia479

## Project Overview

**MiFamilia479** is a newly initialized repository owned by GummyBear479. The project is in its early stages with no source code, build system, or dependencies configured yet. This file serves as the foundational guide for AI assistants contributing to this repository.

## Repository Structure

```
MiFamilia479/
├── CLAUDE.md                  # AI assistant guide (this file)
├── README.md                  # Project documentation
├── .env.local.example         # Environment variables template
├── package.json               # Dependencies
├── vite.config.js             # Vite configuration
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # Main app component (refactored)
│   ├── components/
│   │   ├── Layout/            # Layout components
│   │   │   ├── Sidebar.jsx    # Desktop sidebar navigation
│   │   │   ├── MobileHeader.jsx
│   │   │   └── MainLayout.jsx
│   │   ├── views/             # Page-level view components
│   │   │   ├── DashboardView.jsx
│   │   │   ├── FOIAManager.jsx
│   │   │   ├── HealingLedger.jsx
│   │   │   ├── ProtocolIntelligence.jsx (view wrapper)
│   │   │   └── BrandSystem.jsx
│   │   ├── ProtocolIntelligence/  # AI tools interface
│   │   │   ├── ProtocolIntelligence.jsx (main container)
│   │   │   ├── ToolSelector.jsx
│   │   │   ├── InputPanel.jsx
│   │   │   ├── OutputPanel.jsx
│   │   │   └── ChatContainer.jsx
│   │   ├── UI/                # Reusable UI components
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── InputField.jsx
│   │   ├── ErrorBoundary.jsx  # Error boundary wrapper
│   │   └── SettingsPanel.jsx  # API key & preferences UI
│   ├── hooks/                 # Custom React hooks
│   │   ├── useLocalStorage.js
│   │   ├── useGeminiAPI.js
│   │   ├── useChatHistory.js
│   │   ├── useToolInput.js
│   │   ├── useMobileMenu.js
│   │   └── useAudioPlayer.js
│   ├── services/              # Business logic services
│   │   ├── geminiService.js   # Gemini API wrapper with all tools
│   │   └── configService.js   # Config & API key management
│   ├── utils/                 # Utility functions
│   │   ├── audioConverter.js
│   │   ├── validation.js
│   │   ├── formatters.js
│   │   └── dataExport.js
│   ├── constants/             # Constants & configuration
│   │   ├── colors.js          # Brand color palette
│   │   ├── tools.js           # 20+ AI tool definitions
│   │   └── mockData.js        # Sample data
│   └── config/
│       └── index.js           # Central config loader
└── .git/                      # Git metadata
```

## Development Setup

**Prerequisites:**

- Node.js >= 18+
- npm or yarn

**Installation & Running:**

```bash
# Install dependencies
npm install

# Copy environment template and add your API keys
cp .env.local.example .env.local
# Edit .env.local and add VITE_GEMINI_API_KEY

# Run development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

**Getting API Keys:**

1. Go to <https://makersuite.google.com/app/apikey>
2. Create a new API key
3. Copy it to `.env.local` as `VITE_GEMINI_API_KEY`
4. Or paste it in the Settings panel within the app (stored in localStorage)

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on localhost:5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## Code Conventions

### Git Workflow

- **Default branch:** `main`
- **Feature branches:** Use `claude/<description>-<id>` pattern for AI-assisted branches
- Write clear, descriptive commit messages focused on "why" not just "what"
- Keep commits atomic - one logical change per commit

### Style Guidelines

No linter or formatter is configured yet. When established, document:

- Language-specific style rules
- Linting tool and configuration file location
- Formatting tool and configuration file location
- Pre-commit hooks if any

## Architecture

### Tech Stack

- **Frontend:** React 19 with TypeScript support
- **Styling:** Tailwind CSS 4
- **Build Tool:** Vite
- **Icons:** Lucide React
- **Charts:** Recharts
- **AI:** Google Gemini API (Text, Vision, Audio)
- **State Management:** React Hooks + localStorage for persistence
- **Code Quality:** ESLint

### Design Patterns

**Component Organization:**

- **Layout Components** (`src/components/Layout/`) - Page structure controllers
- **View Components** (`src/components/views/`) - Full-page content areas
- **Subcomponents** (e.g., `ProtocolIntelligence/`) - Complex feature breakdowns
- **UI Components** (`src/components/UI/`) - Reusable, atomic UI elements
- **Special:** ErrorBoundary for error handling, SettingsPanel for configuration

**State Management:**

- Custom React Hooks (`src/hooks/`) for reusable stateful logic
- `useLocalStorage` for persistent data
- `useGeminiAPI` for API call orchestration
- `useChatHistory` for conversation persistence

**Business Logic:**

- Services layer (`src/services/`) wraps complex operations
- `geminiService` - All 20+ AI tool prompts and API calls
- `configService` - API key loading with priority: settings > localStorage > .env

**Data Organization:**

- Constants (`src/constants/`) - Brand colors, tool definitions, mock data
- Utilities (`src/utils/`) - Pure functions for audio, validation, formatting, export
- Config (`src/config/`) - Central config loader

### Data Flow

1. **User Input** → InputPanel/ChatContainer
2. **Validation** → useToolInput hook
3. **API Call** → useGeminiAPI hook → GeminiService
4. **Response Handling** → OutputPanel/ChatContainer
5. **Persistence** → useLocalStorage hook
6. **User Controls** → TTS (useAudioPlayer), Translation, Copy, Download

### API Key Management

**Priority Order (highest to lowest):**

1. Settings panel input (runtime override)
2. localStorage (user-persisted)
3. .env.local environment variable (secure)

See `src/config/index.js` and `ConfigService` for details.

## Testing

### Manual Testing Checklist

- [ ] Navigation - All 5 tabs switch correctly
- [ ] Dashboard - Chart loads and displays correctly
- [ ] FOIA Manager - Table displays FOIA requests
- [ ] Healing Ledger - Co-Care Credits and verified contributions display
- [ ] Protocol Intelligence:
  - [ ] Tool selector loads all 20+ tools
  - [ ] Chat mode works with Assistant tool
  - [ ] API calls complete (requires API key)
  - [ ] Text-to-Speech functionality works
  - [ ] Translation to Spanish works
  - [ ] Copy-to-clipboard works
  - [ ] Image generation works for "Vision Painter" tool
- [ ] Settings Panel:
  - [ ] Can input and save API key
  - [ ] Key is persisted in localStorage
  - [ ] Can clear all data
- [ ] Mobile Responsiveness:
  - [ ] Sidebar hides on mobile
  - [ ] Mobile header menu works
  - [ ] Content adapts to small screens
- [ ] Error Handling:
  - [ ] ErrorBoundary catches render errors
  - [ ] Invalid API keys show error messages
  - [ ] Network errors handled gracefully

### Future Testing Setup

When testing framework is added, create:

- Unit tests for hooks (`src/hooks/*.test.js`)
- Unit tests for utilities (`src/utils/*.test.js`)
- Component tests for UI components (`src/components/UI/*.test.jsx`)
- Integration tests for API services
- E2E tests for user workflows

## CI/CD

No CI/CD pipelines are configured. When added, document:

- Pipeline configuration file locations
- Build and deploy stages
- Required checks before merging

## Important Notes for AI Assistants

### General Principles

1. **Read before modifying** - Always read files before suggesting changes
2. **Minimal changes** - Only make changes directly requested or clearly necessary
3. **No over-engineering** - Keep solutions simple and focused on the task at hand
4. **Security first** - Never commit secrets, credentials, or sensitive data (API keys in .env.local)
5. **Update this file** - When you add significant structure, tooling, or conventions to this repo, update CLAUDE.md to reflect the current state
6. **Check README.md** - Keep README.md in sync with project changes

### Architectural Principles

1. **Component Responsibility** - Each component should have a single, clear purpose
2. **Hook Reusability** - Extract stateful logic into custom hooks for reuse
3. **Service Layer** - Complex operations go in services (e.g., `geminiService` for all AI calls)
4. **Constants Centralization** - Define brand colors, tool configs, and mock data in `src/constants/`
5. **API Key Handling** - Use `ConfigService` to load keys; never hardcode them in components
6. **Persistence** - Use `useLocalStorage` hook for data that should survive page reloads

### Development Workflow

1. **Atomic Commits** - Each commit should represent one logical change
2. **Feature Branches** - Use `claude/<description>-<id>` pattern for AI-assisted work
3. **Branch Cleanup** - Delete branches after merging to keep repo clean
4. **No Force Pushes** - Avoid destructive git operations on shared branches

### When Adding New Features

1. **Follow Existing Patterns** - Match the code style and organization of similar features
2. **Modularize First** - Break features into small, reusable components
3. **Test Manually** - Use the checklist in the Testing section
4. **Update Documentation** - Update this file and README.md to reflect changes

### Performance & Security

1. **Avoid Prop Drilling** - Use hooks or context for deeply nested data
2. **Memoize Expensive Renders** - Use React.memo() for components with heavy computations
3. **Error Boundaries** - Wrap features in ErrorBoundary; never let errors break the entire app
4. **Input Validation** - Always validate user input before sending to APIs (see `src/utils/validation.js`)
5. **Sensitive Data** - Store API keys securely; never log them; never commit them
