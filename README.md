# Angular Storefront

A fully functional e-commerce storefront SPA built with **Angular 20**, demonstrating modern Angular patterns, reactive programming with RxJS, and a comprehensive unit testing suite.

> 🛠️ Built as a portfolio piece to showcase real-world Angular skills — clean architecture, reactive state management, OnPush change detection, and test-driven development.

---

## ✨ Features

- **Featured Games catalogue** — fetches and displays a list of games from a REST API, enriched with cart and ownership state
- **Shopping Cart** — add/remove items, running total, and clear cart — all driven by a reactive `signal`-based service
- **Hero Banner** — prominent game of the week promotional section
- **Responsive layout** — adapts gracefully from desktop (1060px) down to mobile
- **Environment-aware API** — separate `environment.ts` configs for development and production

---

## 🏗️ Architecture & Technical Highlights

### Angular Patterns

- **Standalone components** throughout — no `NgModule` boilerplate
- **`OnPush` change detection** on every component for optimal performance
- **Signal-based state** (`signal`, `computed`) in `CartService` for synchronous reactive state
- **`input.required`** for strict, type-safe component inputs (Angular 17+ signals API)
- **`toObservable`** bridge between signals and RxJS streams

### Reactive Data Flow

- `FeaturedGames` combines three streams with `combineLatest` — the games API, the user profile, and the live cart state — to derive a unified `Game[]` observable with `inCart` and `isOwned` flags computed on the fly
- `CartService` exposes both a `signal` (for synchronous template reads) and an `Observable` via `toObservable` (for composition)

### Project Structure

```
src/app/
├── app.ts / app.html          # Root component, layout shell
├── header/                    # Site header with logo and cart toggle
├── hero/                      # Hero banner component
├── featured-games/            # Games grid + individual game card
│   └── featured-game/
├── cart/                      # Cart overlay, cart service
├── services/
│   ├── games.service.ts       # HTTP — featured games endpoint
│   └── user.service.ts        # HTTP — user profile & owned games
├── models/
│   ├── game.ts                # GameResponse + enriched Game interfaces
│   └── user.ts                # User interface
└── utils/
    └── test.utils.ts          # Shared test helper (getElementByTestId)
```

### Testing

- **Karma + Jasmine** test runner with `ng-mocks` for clean, isolated unit tests
- Every component and service has its own `*.spec.ts`
- Components are tested via `data-testid` attributes — zero coupling to CSS classes or DOM structure
- Services are tested with `HttpTestingController` for full HTTP layer coverage
- `MockProvider` / `MockComponent` / `MockInstance` patterns used consistently for dependency isolation

---

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install dependencies

```bash
npm i --legacy-peer-deps
```

### Run the mock API

The app fetches data from a local [json-server](https://github.com/typicode/json-server) instance backed by `mock-api/mock-api.json`:

```bash
npm run local-api
```

### Start the dev server

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200) — the app hot-reloads on any file change.

---

## 🧪 Running Tests

```bash
npm test
```

Runs all unit tests headlessly via ChromeHeadless and Karma.

---

## 📦 Build

```bash
ng build
```

Production artefacts are output to `dist/`. The build applies full optimisation, tree-shaking, and output hashing.

---

## 🛠️ Tech Stack

| Technology      | Version   |
| --------------- | --------- |
| Angular         | 20        |
| TypeScript      | ~5.8      |
| RxJS            | ~7.8      |
| Angular CLI     | 20        |
| Karma / Jasmine | 6.4 / 5.7 |
| ng-mocks        | 14        |
| json-server     | 1.x       |
