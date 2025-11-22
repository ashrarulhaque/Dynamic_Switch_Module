Here you go! ✨
A clean, simple, well-structured **README.md** tailored for your current project architecture.

---

## 📌 README.md

```md
# Event Module Settings App 🎛️

A simple monolithic application built with **Node.js + Express** and **React (Vite)**  
This app allows configuring which modules are enabled for an event such as:

- Registration
- Agenda
- Chat
- Polling

Based on these settings, only enabled pages can be accessed.  
The configuration is stored in a single JSON file (`defaultConfig.json`) in the backend.

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| Admin UI | Enable/Disable event modules visually |
| Dynamic Navigation | Navbar shows only modules that are enabled |
| Page Access Control | Disabled modules are blocked from access |
| Monolithic Deployment | React is served as static build by Express |
| Clean UI | Modern responsive styling using Tailwind |

---

## 🏗️ Project Structure

```

project-root/
├─ index.js                # Node + Express server
├─ defaultConfig.json      # Stores module settings
├─ client/                 # React frontend (Vite)
│   ├─ src/
│   │   ├─ pages/          # Pages for each module
│   │   ├─ components/     # Shared UI components
│   │   ├─ config.js       # Nav + route configuration
│   │   └─ App.jsx
│   ├─ public/
│   └─ package.json
├─ package.json

````

---

## 📦 Installation

### 1️⃣ Install backend dependencies

```sh
npm install
````

### 2️⃣ Install frontend dependencies

```sh
cd client
npm install
cd ..
```

---

## 🚀 Running the App (Development Mode)

Run backend:

```sh
npm run dev
```

Run frontend (in another terminal):

```sh
cd client
npm run dev
```

Backend → `http://localhost:5000`
Frontend → `http://localhost:5173` (auto-proxy for `/api` calls)

---

## 🏁 Running Production Build (Monolithic Mode)

```sh
npm run start
```

This will:

✔ Build the React app
✔ Serve it with Express under the same server
✔ No CORS issues in production

Visit:

```
http://localhost:5000
```

---

## 🧩 How It Works

* The Admin panel modifies `defaultConfig.json`
* UI refreshes automatically to reflect updated settings
* Pages become accessible/unavailable based on the configuration
* Navbar updates based on enabled modules

---

## 🛠️ Technologies Used

* **Node.js + Express** — API & static serving
* **React + Vite** — frontend
* **TailwindCSS** — smart modern styling
