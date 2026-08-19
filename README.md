# Paid Workspace

A full-stack, multi-tenant workspace application built with Next.js, Prisma, PostgreSQL, and NextAuth for seamless authentication.

##  Live Demo

Check out the live deployment on Vercel:  
 **[https://paid-workspace.vercel.app](https://paid-workspace.vercel.app)**

---

##  Key Features

* **Authentication:** NextAuth integration supporting GitHub OAuth login flows.
* **Database Management:** Object-relational mapping using Prisma connected to PostgreSQL.
* **User Dashboard:** Protected routes with workspace settings and account management.
* **Production Deployment:** Configured for Vercel deployment with automatic Prisma client generation.

---

##  Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Database:** PostgreSQL & Prisma ORM
* **Authentication:** NextAuth.js
* **Deployment:** Vercel

---

##  Environment Variables

To run this project locally, create a `.env` file in the root directory and define the following variables:

```env
# Database Connections
DATABASE_URL="postgresql://user:password@localhost:5432/paid_workspace"
DIRECT_URL="postgresql://user:password@localhost:5432/paid_workspace"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
AUTH_SECRET="your-generated-nextauth-secret"

# GitHub OAuth Credentials
AUTH_GITHUB_ID="your_github_client_id"
AUTH_GITHUB_SECRET="your_github_client_secret"

OAuth Configuration
For GitHub authentication to function correctly across environments, configure your GitHub OAuth App with these endpoints:

Homepage URL: https://paid-workspace.vercel.app

Authorization Callback URIs:

Local Development: http://localhost:3000/api/auth/callback/github

Production Deployment: https://paid-workspace.vercel.app/api/auth/callback/github

🚀 Getting Started Locally
Clone the repository:
git clone [https://github.com/Counsellor-Olumayor/paid-workspace.git](https://github.com/Counsellor-Olumayor/paid-workspace.git)
cd paid-workspace

npm install

npx prisma generate

npx prisma db push

npm run dev

View the app:

Open http://localhost:3000 in your browser.
