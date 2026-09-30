# Sacred National Backend API

Node.js & Express.js REST API with TypeScript, Firebase Firestore, and Nodemailer for **Sacred National - Meal to Smile**.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Firebase Cloud Firestore (`firebase-admin`)
- **Validation**: Zod
- **Email Service**: Nodemailer (SMTP)
- **Dev Runner**: `tsx` (TypeScript Execute & Watch)

---

## 📁 Directory Structure

```
backend/
├── .env.example              # Environment variables template
├── .env                      # Local environment configuration
├── package.json              # Backend dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── src/
    ├── server.ts             # Server entry point & listener
    ├── app.ts                # Express app setup, CORS, error handling
    ├── config/
    │   ├── env.ts            # Typed environment variables
    │   ├── firebase.ts       # Firebase Admin & Firestore init
    │   └── mailer.ts         # Nodemailer transporter config
    ├── controllers/
    │   ├── contribute.controller.ts # Contribution submission & management
    │   ├── project.controller.ts    # Projects data & queries
    │   └── health.controller.ts     # Health check & status
    ├── middlewares/
    │   ├── errorHandler.ts   # Centralized error handler
    │   ├── notFound.ts       # 404 handler
    │   └── validate.ts       # Zod schema validation
    ├── routes/
    │   ├── index.ts          # Master API router (/api)
    │   ├── contribute.routes.ts # /api/contribute
    │   ├── project.routes.ts    # /api/projects
    │   └── health.routes.ts     # /api/health
    ├── services/
    │   ├── firestore.service.ts # Firestore CRUD operations & storage
    │   └── email.service.ts     # Email templates & dispatch
    └── types/
        ├── contribution.types.ts
        └── project.types.ts
```

---

## 🚀 Getting Started

### 1. Install Dependencies

From the backend directory:
```bash
npm install
```

Or from the workspace root:
```bash
npm run install:all
```

### 2. Configure Environment Variables

Create `.env` inside `backend/`:
```bash
cp .env.example .env
```

Set the following variables:
- `PORT=5000`
- `FRONTEND_URL=http://localhost:3000`
- `ADMIN_EMAIL=sacrednational@majmau.com`

#### Firebase Firestore Setup:
1. Go to [Firebase Console](https://console.firebase.google.com/) -> Project Settings -> Service accounts.
2. Click **Generate new private key** and download `serviceAccountKey.json`.
3. Place `serviceAccountKey.json` inside the `backend/` directory or set `FIREBASE_SERVICE_ACCOUNT_KEY_PATH=./serviceAccountKey.json`.

*(Note: If no service account is provided during development, the backend automatically provides graceful in-memory storage fallback)*

#### SMTP Email Setup (Optional for local dev):
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="Meal to Smile" <your-email@gmail.com>
```

### 3. Run Development Server

```bash
npm run dev
```

The API will start at **http://localhost:5000**.

---

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Server and database status check

### Contributions / Inquiries
- `POST /api/contribute` - Submit a new contribution or support inquiry
  ```json
  {
    "name": "Rahul Sharma",
    "whatsapp": "+919847356680",
    "email": "rahul@example.com",
    "amount": "2000",
    "cause": "Meals to Smile",
    "message": "Happy to support!",
    "source": "Website Form"
  }
  ```
- `GET /api/contribute` - List inquiries (supports `?limit=50`)
- `GET /api/contribute/:id` - Get specific contribution inquiry
- `PATCH /api/contribute/:id/status` - Update status (`pending`, `contacted`, `completed`, `archived`)

### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/:slug` - Get specific project by slug

---

## 🏗️ Build & Production

```bash
npm run build
npm start
```
