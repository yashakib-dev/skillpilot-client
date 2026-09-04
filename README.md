# SkillPilot - AI-powered Career Roadmap Generator & AI Assistant

SkillPilot is an AI-powered career planning platform built with Next.js, React, TypeScript, and Better Auth. It helps users discover careers, create personalized learning goals, generate AI roadmaps, track their progress, and chat with an AI career mentor for guidance.

This repository contains the frontend client only. The app integrates with a separate backend server for career data and AI roadmap generation.

## Live App

- Frontend: https://skillpilot-client.vercel.app
- API backend: https://skillpilot-server-pc4b.onrender.com
- GitHub frontend: https://github.com/yashakib-dev/skillpilot-client

---

## Overview

SkillPilot is designed for people who want a more structured and actionable path into a career. Instead of browsing random tutorials, users can:

- Explore curated career paths
- Search and filter careers by category, difficulty, and salary
- Create a personal career plan
- Generate an AI roadmap based on their goals, experience, and available time
- Save progress for each learning plan
- Track plan status on a dashboard
- Ask an AI mentor career questions in a chat-like interface

The app balances a polished marketing site with protected user workflows and a dashboard-driven experience.

---

## Features

### 1. Public landing and marketing pages

The app includes a modern homepage with sections for:

- Hero section
- Feature overview
- How-it-works explanation
- AI feature highlights
- Career categories
- Statistics
- FAQ
- Call-to-action banner

These are built in the homepage components and are used in the root page.

### 2. Career exploration and filtering

The Explore page allows users to:

- Browse a list of careers
- Search by career title, description, or skill keywords
- Filter by category
- Filter by difficulty level
- Sort by title or average salary
- View a clean card-based career grid

The page fetches career data from the backend and normalizes it for display.

### 3. Authentication

Authentication uses Better Auth with MongoDB storage.

Supported flows:

- Email/password sign up
- Email/password sign in
- Google OAuth sign in
- Demo login for quick access
- Signed-in user session handling
- Sign out from the navigation UI

This is configured in:

- app/lib/auth.ts
- app/lib/auth-client.ts

### 4. User dashboard

The dashboard gives users a quick summary of their saved plans:

- Total career plans
- In-progress plans
- Completed plans
- Visual status charts using Recharts
- Quick action buttons for creating or viewing plans

This is implemented in the dashboard overview page.

### 5. Create career plans

Users can create a career plan with:

- Career title
- Short description
- Full description
- Image URL
- Priority duration (in months)
- Available time per week
- Experience level selections
- Preferred technologies

The form supports both:

- Manual save without AI generation
- AI-generated roadmap flow after saving

### 6. My careers management

The My Careers page lets users:

- View all saved career plans
- See progress bars for each plan
- Open a detailed plan page
- Delete a plan after confirmation

### 7. Career detail and progress tracking

Each career detail page includes:

- Plan metadata
- Status badge
- Optional image
- Progress slider
- Save progress action
- Delete plan confirmation modal
- AI roadmap generation button
- Roadmap rendering after generation

The app tracks progress as a numeric value and updates the status automatically to Completed or In Progress.

### 8. AI roadmap generation

One of the core features is AI-generated learning roadmaps. Users can:

- Create a plan
- Trigger roadmap generation from the detail page or AI generation flow
- Receive a structured roadmap JSON payload from the backend
- Render the roadmap visually with phased sections, skill focus, milestones, projects, and resources

The roadmap UI is implemented in the RoadmapDisplay component.

### 9. AI career mentor chat

The Mentor page is a chat-style interface where a user can:

- Start a new conversation
- Send career-related questions
- Receive AI responses from the backend
- View historical conversations
- Open previous chats
- Delete chats
- Keep conversation IDs in the URL

This is a strong AI assistant experience built around the backend AI mentor endpoint.

### 10. Responsive UI and modern styling

The app uses:

- Tailwind CSS
- Dark theme interface
- Mobile navigation
- Responsive card layouts
- Interactive buttons, charts, modals, and forms
- Toast notifications via react-hot-toast

### 11. SEO and app metadata

The root layout includes:

- Page metadata
- Open Graph metadata
- Keywords
- Responsive HTML attributes

---

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- App Router architecture

### Auth and data

- Better Auth
- MongoDB
- MongoDB adapter for Better Auth

### UI and app behavior

- React Hot Toast
- Recharts
- Zustand (present in dependencies, not the main app state pattern here)
- TanStack React Query (dependency installed, used for possible async app patterns)

### HTTP and integration

- Fetch API for backend communication
- Axios in the project dependencies

---

## Project Structure

```text
skillpilot-client/
├── app/
│   ├── (dashboard)/
│   │   ├── add-career/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── mentor/
│   │   │   └── page.tsx
│   │   └── my-careers/
│   │       ├── page.tsx
│   │       └── [id]/
│   │           └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── api/
│   │   └── careers/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   ├── auth/
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── careers/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── explore/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── lib/
│   │   ├── auth-client.ts
│   │   ├── auth.ts
│   │   └── db.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── ai/
│   ├── career/
│   ├── common/
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── dashboard/
│   │   ├── RoadmapDisplay.tsx
│   │   └── Sidebar.tsx
│   └── homepage/
│       ├── AIFeatures.tsx
│       ├── CareerCard.tsx
│       ├── CareerGrid.tsx
│       ├── Categories.tsx
│       ├── CTA.tsx
│       ├── FAQ.tsx
│       ├── Features.tsx
│       ├── Hero.tsx
│       ├── HowItWorks.tsx
│       ├── Statistics.tsx
│   └── ...
├── hooks/
├── public/
├── styles/
├── types/
│   └── career.ts
├── .env
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
└── package-lock.json
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_super_secret_value
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/skillpilot
SERVER_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Notes

- `NEXT_PUBLIC_API_URL` points to the separate backend server that serves career data and AI endpoints.
- `MONGODB_URI` is required for Better Auth database storage.
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are required only if Google OAuth is enabled.
- `SERVER_URL` is used by the Next.js server-side API routes to proxy requests to the backend.

---

## Installation

```bash
git clone https://github.com/yashakib-dev/skillpilot-client.git
cd skillpilot-client
npm install
```

---

## Running the Project

### Development mode

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Production build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## Authentication Flow

The auth system uses Better Auth with MongoDB persistence.

### Available accounts

- Email/password sign up and sign in
- Google sign in
- Demo login via a predefined demo account

### Demo account

The app includes a demo login flow that tries to sign in with:

- Email: demo@skillpilot.com
- Password: Demo@123

Or sign up with a new account / use Google OAuth.

---

## Main User Journeys

### 1. Explore careers

Users can visit the Explore page, search for a role, and browse available career tracks.

### 2. Build a roadmap

Users create a plan in the add-career flow and choose target duration, time availability, and technologies.

### 3. Generate AI guidance

The backend AI engine creates a structured roadmap using the plan data.

### 4. Track progress

Users can update progress on each career plan and mark it as completed when finished.

### 5. Ask for mentoring

Users can ask career questions and receive AI responses based on the conversation and saved context.

---

## Backend Integration Details

This frontend talks to a backend server for all core AI and career functions, including:

- GET /api/careers
- POST /api/careers
- GET /api/careers/:id
- PATCH /api/careers/:id
- DELETE /api/careers/:id
- POST /api/careers/:id/generate
- AI mentor endpoints used by the mentor chat page

The app proxies requests from Next.js route handlers and uses the user session to attach an authenticated user ID.

---

## Key Components

### Homepage

- Hero.tsx
- Features.tsx
- HowItWorks.tsx
- AIFeatures.tsx
- Categories.tsx
- Statistics.tsx
- FAQ.tsx
- CTA.tsx

### Common UI

- Navbar.tsx
- Footer.tsx
- Sidebar.tsx

### Dashboard

- DashboardOverviewPage
- MyCareersPage
- CareerDetailPage
- RoadmapDisplay.tsx

### Auth UI

- app/auth/login/page.tsx
- app/auth/register/page.tsx

---

## Design Notes

The UX is intentionally modern and dark-themed with accent colors built around indigo/violet gradients. This theme is used across:

- Navigation
- Buttons
- Cards
- Charts
- Roadmap panels
- Forms

---

## Current Limitations / Notes

- This repo is the frontend client, not the complete full-stack app.
- AI roadmap generation and career data come from an external backend service.
- Google OAuth requires valid credentials in the environment.
- MongoDB must be available for authentication sessions.

---

## Deployment

This project is set up for deployment on Vercel, which matches the existing frontend live URL. Ensure the environment variables are configured in the deployment environment.

Recommended deployment checklist:

1. Set production environment variables
2. Connect to the correct Vercel project
3. Ensure the backend API URL is valid in production
4. Configure MongoDB and Google OAuth credentials
5. Run build verification before deployment

---

## Useful Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

---

## Summary

SkillPilot is a full-featured career-planning application that combines:

- Career discovery
- AI-generated roadmap planning
- Progress tracking
- Personalized AI mentoring
- Secure user authentication
- Responsive dashboard experiences

It is a strong example of a modern Next.js product built around a career growth workflow and AI assistance.


