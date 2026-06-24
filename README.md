# Super App

A production-ready "Super App" built with React + Vite, Zustand, React Router DOM v6, Axios, and Tailwind CSS. Includes registration, category selection, a multi-widget dashboard (profile, weather, news, notes, timer), and a movies browser powered by OMDb.

## Tech Stack

- React 18 + Vite (JavaScript)
- React Router DOM v6 (route protection / guarded flow)
- Zustand (with `persist` middleware for localStorage)
- Axios (API integration)
- Tailwind CSS (no UI component libraries)

## Folder Structure

```
src/
├── assets/
├── components/
│   ├── Layout/        # Navbar
│   ├── common/         # Input, Button, Loader, ErrorMessage
│   ├── Dashboard/      # ProfileWidget, WeatherWidget, NewsWidget, NotesWidget, TimerWidget
│   └── Movies/         # MovieCard, MovieModal, CategorySection
├── pages/               # RegistrationPage, CategoriesPage, DashboardPage, MoviesPage, NotFoundPage
├── services/            # weatherService, newsService, omdbService
├── store/               # useUserStore, useCategoryStore, useNotesStore
├── hooks/               # useInterval, useTimer, useLocalStorage
├── routes/              # ProtectedRoute, RegistrationGuard
├── utils/               # validators, constants
├── App.jsx
└── main.jsx
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and add your API keys:

```bash
cp .env.example .env
```

```
VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key_here
VITE_NEWS_API_KEY=your_newsapi_org_api_key_here
VITE_OMDB_API_KEY=your_omdb_api_key_here
```

Where to get keys:
- OpenWeatherMap: https://openweathermap.org/api
- NewsAPI: https://newsapi.org/
- OMDb: https://www.omdbapi.com/apikey.aspx

> Note: the free tier of NewsAPI only works from `localhost` in the browser (CORS restrictions apply when deployed to a live domain).

### 3. Run the dev server

```bash
npm run dev
```

Visit `http://localhost:5173`.

### 4. Build for production

```bash
npm run build
npm run preview
```

## Application Flow

1. **Registration** (`/`) — Name, Username, Email, Mobile Number with inline validation. On submit, data is saved to the Zustand `useUserStore` (persisted to localStorage) and the user is routed to Categories.
2. **Categories** (`/categories`) — Choose from Action, Comedy, Drama, Music, Sports, Thriller, Fantasy, Romance. Continue is disabled until at least 3 are selected. Protected by `RegistrationGuard` (must be registered first).
3. **Dashboard** (`/dashboard`) — Protected by `ProtectedRoute` (must be registered AND have selected categories). Contains:
   - **Profile Widget** — registration data + selected categories
   - **Weather Widget** — OpenWeatherMap: temperature, humidity, pressure, wind speed, icon, loading/error states
   - **News Widget** — NewsAPI headlines that auto-rotate every 2 seconds (interval cleaned up on unmount/pause)
   - **Notes Widget** — create, edit, delete, clear; persisted to localStorage via Zustand
   - **Timer Widget** — hours/minutes/seconds input, start/pause/resume/reset, alert on completion
4. **Movies** (`/movies`) — Protected the same way. Fetches OMDb movies for each selected category (mapped to representative search terms since OMDb doesn't support genre filtering natively), rendered in category-wise sections. Cards animate (hover scale 1.05, shadow). Clicking a card opens a modal with poster, title, genre, runtime, rating, plot, actors. The modal closes via the close button, the **Esc** key, or a backdrop click.

## Route Protection Logic

- `RegistrationGuard` — blocks `/categories` unless the user has completed registration.
- `ProtectedRoute` — blocks `/dashboard` and `/movies` unless the user is registered **and** has selected at least 3 categories. Users are redirected back to the appropriate step instead of being able to skip ahead by typing a URL.

## State Management (Zustand)

- `useUserStore` — `user`, `isRegistered`, `setUser`, `logout` (persisted)
- `useCategoryStore` — `categories`, `isCategoriesSelected`, `toggleCategory`, `setCategories`, `clearCategories` (persisted)
- `useNotesStore` — `notes`, `addNote`, `updateNote`, `deleteNote`, `clearNotes` (persisted)

## Notes on API Behavior

- All API calls have explicit `loading` and `error` states with retry buttons.
- If an API key is missing, the corresponding widget/section will show a clear error message instead of crashing.
- OMDb posters that are `"N/A"` or fail to load fall back to an inline SVG placeholder.

## Scripts

| Command           | Description                  |
| ------------------ | ----------------------------- |
| `npm run dev`       | Start Vite dev server          |
| `npm run build`     | Production build               |
| `npm run preview`   | Preview production build       |
