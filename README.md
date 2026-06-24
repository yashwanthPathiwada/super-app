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

# Super App

## Features

* User Registration
* Category Selection
* Weather Widget
* News Widget
* Notes Widget
* Countdown Timer
* Movie Recommendations
* Movie Details Modal
* Route Protection
* Responsive Design

## Tech Stack

* React
* Vite
* Zustand
* React Router DOM
* Tailwind CSS
* Axios

## APIs

* OpenWeatherMap
* NewsAPI
* OMDb API

## Installation

npm install

npm run dev

## Build

npm run build

## Author

Yashwanth Pathiwada
