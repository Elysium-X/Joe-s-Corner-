# Food Order App 🍽️

Modern full-stack food ordering app with a polished React frontend and a hands-on Express backend.

## 🚀 Tech Stack
[![React](https://img.shields.io/badge/Frontend-React-61DBFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/Styles-CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![NPM](https://img.shields.io/badge/Build%20Tool-NPM-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/)
[![Express](https://img.shields.io/badge/Backend-Express-000000?logo=express&logoColor=white)](https://expressjs.com/)

## ✨ Features
- 🍔 Browse meals with responsive cards and modern UI
- 🛒 Manage cart items, quantities, and checkout flow
- 🌙☀️ Persistent dark/light mode switch
- 🔌 Frontend connected to backend API endpoints
- ✅ Backend validation before storing orders
- 📁 File-based data persistence for practical backend learning

## 🧠 Backend Focus
- Built API routes directly in Express (`GET /meals`, `POST /orders`)
- Handles CORS + JSON parsing
- Validates customer/order payloads
- Writes orders to `backend/data/orders.json`

## 📂 Project Structure
```text
Food Order App/
  backend/
    app.js
    data/
      available-meals.json
      orders.json
  public/
    logo.jpg
  src/
    Components/
    hooks/
    store/
    util/formatting.js
    App.jsx
    main.jsx
    index.css
```

## 🛠️ Run Locally
1. Install frontend deps:
```bash
npm install
```
2. Install backend deps:
```bash
cd backend
npm install
```
3. Start backend (`http://localhost:3000`):
```bash
npm start
```
4. Start frontend (`http://localhost:5173`):
```bash
cd ..
npm run dev
```

## 📡 API Endpoints
- `GET /meals` -> returns available meals
- `POST /orders` -> validates + stores order in JSON

## 📸 UI Preview
Add these two screenshot files, then they render automatically:
- `public/screenshot-dark.png`
- `public/screenshot-light.png`

![Dark Mode UI](./public/screenshot-dark.png)
![Light Mode UI](./public/screenshot-light.png)

## 📜 Scripts
- Frontend: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`
- Backend: `cd backend && npm start`
