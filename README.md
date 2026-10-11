# Shiva Bharti Portfolio

A full-stack portfolio application for Shiva Bharti built with React, Vite, Express, and MongoDB-ready architecture.

## Features

- Premium dark-mode portfolio with responsive sections
- Real frontend + backend architecture
- Contact form with validation
- Admin authentication and dashboard endpoints
- MongoDB-ready models with in-memory fallback for local development
- Project, skills, brand, experience, and AI/ML lab sections
- SEO-friendly app shell and deployment-ready docs

## Stack

Frontend:
- React + Vite + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons
- Recharts

Backend:
- Node.js
- Express.js
- JWT auth
- MongoDB-ready Mongoose models

## Local setup

1. Install dependencies:
   npm install
2. Copy `.env.example` to `.env` and update the secrets.
3. Start the app:
   npm run dev
4. Open the frontend at http://localhost:5173
5. Open the backend health check at http://localhost:5000/api/health

## Production deploy

- Frontend: Vercel
- Backend: Render or other Node.js hosting platform
- Database: MongoDB Atlas

## Admin login

Use the credentials from `.env` and the admin routes under `/api/admin`.

## Notes

- If MongoDB is not configured, the app runs in demo mode with in-memory storage.
- Placeholder assets and resume links are included; replace with your actual files and branding as needed.
