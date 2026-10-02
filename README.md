# Sacred National - Meal to Smile (Fullstack Project)

A fullstack web application for **Sacred National - Meal to Smile** featuring a **Next.js frontend** and an **Express.js + TypeScript backend** with **Firebase Firestore** and **Nodemailer**.

---

## 📁 Project Architecture

```
sacrednat/
├── frontend/                 # Next.js Frontend Application
│   ├── src/
│   │   ├── app/              # Next.js App Router (pages & layouts)
│   │   ├── components/       # UI Components (Navbar, Hero, ContributeForm, etc.)
│   │   ├── context/          # React Contexts
│   │   └── data/             # Static datasets & project details
│   ├── public/               # Static assets & images
│   ├── next.config.ts        # Next.js config with API proxy rewrites
│   └── package.json          # Frontend dependencies
│
├── backend/                  # Node.js Express.js API Server
│   ├── src/
│   │   ├── config/           # Firebase Admin, Nodemailer & Env configs
│   │   ├── controllers/      # API Controllers (Contribute, Projects, Health)
│   │   ├── middlewares/      # Error handler, 404, Zod validator
│   │   ├── routes/           # Express Route definitions
│   │   ├── services/         # Firestore DB service & Email service
│   │   ├── types/            # TypeScript interfaces & types
│   │   ├── app.ts            # Express app configuration
│   │   └── server.ts         # Server entry point
│   ├── .env.example          # Backend environment variables template
│   ├── .env                  # Local backend environment config
│   ├── tsconfig.json         # Backend TypeScript config
│   └── package.json          # Backend dependencies
│
├── package.json              # Monorepo Workspace root scripts
└── README.md
```

---

## 🚀 Quick Start

### 1. Install Dependencies

Install all dependencies across the workspace (root, frontend, backend):

```bash
npm run install:all
```

Or install individually:
```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && npm install
```

### 2. Configure Backend Environment

Copy `.env.example` to `.env` inside `backend/`:

```bash
cd backend
cp .env.example .env
```

Configure your Firebase credentials and SMTP settings in `backend/.env`.

### 3. Run Development Servers

Run both the frontend (Port 3000) and backend (Port 5000) simultaneously with one command from the project root:

```bash
npm run dev
```

Or run them individually:
```bash
# Run only Backend (http://localhost:5000)
npm run dev:backend

# Run only Frontend (http://localhost:3000)
npm run dev:frontend
```

---

## 📡 Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status & Firestore connectivity |
| `POST` | `/api/contribute` | Submit contribution / support form (saves to Firestore & sends email) |
| `GET` | `/api/contribute` | List contribution inquiries (admin) |
| `GET` | `/api/contribute/:id` | Get specific contribution details |
| `PATCH` | `/api/contribute/:id/status` | Update inquiry status (`pending`, `contacted`, `completed`, `archived`) |
| `GET` | `/api/projects` | List all charity projects |
| `GET` | `/api/projects/:slug` | Get project detail by slug |

---

## 🛠️ Build for Production

```bash
# Build both frontend and backend
npm run build

# Start both in production mode
npm start
```
