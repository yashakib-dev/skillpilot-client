# SkillPilot - Requirements Mapping & Implementation Roadmap 🎯

## 📋 Overview

**SkillPilot** is an AI-powered career roadmap generator that helps users map out personalized learning paths. It bridges the gap between career exploration and structured learning by providing tailored roadmaps, skill tracking, and AI-generated guidance.

The platform consists of two main components:
- **Frontend (Client):** A Next.js 16 application with a modern, responsive UI for exploring careers, creating personalized plans, and tracking progress.
- **Backend (Server):** An Express.js API that handles career CRUD operations and integrates with Google Gemini AI to generate dynamic learning roadmaps.

Built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

## 🌐 Live Links

| Resource | URL |
|----------|-----|
| **Frontend App** | [https://skillpilot-client.vercel.app](https://skillpilot-client.vercel.app) |
| **API Server** | [https://skillpilot-server-pc4b.onrender.com](https://skillpilot-server-pc4b.onrender.com) |
| **GitHub (Frontend)** | [https://github.com/yashakib-dev/skillpilot-client](https://github.com/yashakib-dev/skillpilot-client) |

## 📦 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Auth:** Better Auth (email/password + Google OAuth)
- **State Management:** Zustand + TanStack React Query
- **Charts:** Recharts
- **HTTP Client:** Axios

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB connection string
- Google OAuth credentials (optional, for social login)

### Clone & Install

```bash
git clone https://github.com/yashakib-dev/skillpilot-client.git
cd skillpilot-client
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
NEXT_PUBLIC_API_URL=https://skillpilot-server-pc4b.onrender.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Demo Login

Sign in at [https://skillpilot-client.vercel.app](https://skillpilot-client.vercel.app) using:

| Field | Value |
|-------|-------|
| **Email** | `demo@skillpilot.com` |
| **Password** | `Demo@123` |

Or sign up with a new account / use **Google OAuth**.

## 📁 Project Structure

```
app/
├── (auth)/             # Authentication pages (login, signup)
├── (dashboard)/        # Dashboard pages (protected)
│   ├── add-career/     # Create a new career plan
│   ├── dashboard/      # Main dashboard
│   └── mentor/         # AI mentor chat
├── api/                # API route handlers
│   └── careers/        # Career API routes
├── careers/            # Career detail pages
├── explore/            # Explore careers (public)
└── lib/                # Auth & DB utilities
components/             # Reusable UI components
hooks/                  # Custom React hooks
types/                  # TypeScript type definitions
styles/                 # Global styles
```

## 🔗 Related

- **Backend Server:** [skillpilot-server](https://github.com/yashakib-dev/skillpilot-server)