# Aeroport — frontend (React)

Web client for the airport services system: flight board, ticket booking, terminal services,
statistics charts, and sign-up / login with JWT. The API is in
[aeroport-backend](https://github.com/ilhomjonshoyimov10-cyber/aeroport-backend).

> 🇺🇿 **O'zbekcha:** Aeroport tizimining veb-ilovasi: parvozlar jadvali, chipta bron qilish, terminal xizmatlari, statistika grafiklari, JWT orqali ro'yxatdan o'tish va kirish.

## Stack

React 19 · React Router 7 · Axios · Chart.js (react-chartjs-2) · Create React App

## Pages

| Page | File | What it shows |
|---|---|---|
| Home | `src/pages/Home.js` | Landing page (Tashkent airport) |
| Flights | `src/pages/Parvozlar.js` | Flight list from `/api/parvozlar/` |
| Booking | `src/pages/Bron.js` | Books a ticket: picks a flight, creates the passenger and the ticket |
| Services | `src/pages/Xizmatlar.js` | Terminal service points, filtered by category |
| Statistics | `src/pages/Statistika.js` | Charts built from flights, services and tickets |
| Login / Register | `src/pages/Login.js`, `src/pages/Register.js` | JWT authentication |

## Run locally

Start the backend first (it listens on `http://127.0.0.1:8000`), then:

```bash
npm install
npm start        # http://localhost:3000
npm run build    # production build in build/
```

The API address is currently written as `http://127.0.0.1:8000` inside the page components. To deploy,
move it to an environment variable (for example `REACT_APP_API_URL`) and point it to the hosted backend.
