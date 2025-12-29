# network-App

# NETWORK – Backend

NETWORK backend is built using TypeScript, GraphQL, Apollo Server, Prisma, and PostgreSQL.
It provides authentication and user-related APIs with secure JWT-based authorization and email utilities.

---

# Tech Stack

* TypeScript
* Node.js
* GraphQL
* Apollo Server
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Resend (Email Servie)

# Project Structure

```
backend/
│
├── prisma/
│   ├── migrations/        # Prisma migration files
│   └── schema.prisma      # Prisma database schema
│
├── src/
│   ├── resolvers/         # GraphQL resolvers
│   │   └── authResolver.ts
│   │
│   ├── schemas/           # GraphQL schema definitions
│   │   ├── auth.graphql
│   │   └── index.ts
│   │
│   ├── utils/             # Utility/helper functions
│   │   ├── email.ts       # Email sending logic (Resend)
│   │   ├── hash.ts        # Password hashing
│   │   ├── jwt.ts         # JWT generation & verification
│   │   └── otp.ts         # OTP generation & validation
│   │
│   ├── context.ts         # Apollo GraphQL context (auth + prisma)
│   ├── prisma.ts          # Prisma client setup
│   ├── schema.ts          # Combined GraphQL schema
│   └── index.ts           # Server entry point
│──.env
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

# Environment Variables

Create a `.env` file in the root of the backend directory and add the following:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
JWT_SECRET="your_jwt_secret_key"
RESEND_API_KEY="your_resend_api_key"
FROM_EMAIL="your_verified_email@example.com"
```

# How to Run the Project Locally

# Clone the Repository

```bash
git clone <your-repo-url>
cd backend
```

# Install Dependencies

```bash
npm install
```

# Setup Prisma

Generate Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

(Optional) Open Prisma Studio:

```bash
npx prisma studio
```

# Start the Server

```bash
npm run dev
```

The Apollo server will start at:

```
http://localhost:4000/
```

The Prisma Studio will start at:

```
http://localhost:5555/
```
# Authentication Flow (Example)

# Example: Register User (GraphQL Mutation)

```graphql
mutation Register {
  register(
    email: "user@example.com"
    password: "password123"
  ) {
    id
    email
  }
}
```

# Example: Login User

```graphql
mutation Login {
  login(
    email: "user@example.com"
    password: "password123"
  ) {
    token
    user {
      id
      email
    }
  }
}
```

# Example: Authorized Request Header

```http
Authorization: Bearer <JWT_TOKEN>
```

# Key Concepts Used

* Prisma ORM for database access
* GraphQL resolvers for handling business logic
* JWT for authentication and authorization
* Apollo Context to inject authenticated user & Prisma client
* Utility modules for hashing, email, OTP, and JWT handling

# Notes for Developers

* All GraphQL schemas are located inside `src/schemas`
* All resolvers are located inside `src/resolvers`
* Prisma schema changes require running migrations
* Authentication logic is centralized in `authResolver.ts`
* Utilities are reusable and isolated in `utils/`

# Documentation & References

The following official documentation links are useful for understanding and configuring this project:

1. Resend – Email Service
Used for sending transactional emails (OTP, verification, notifications).
Official Docs:
https://resend.com/docs/introduction

2. Prisma ORM
Used for database modeling, migrations, and type-safe database access.
Official Docs:
https://www.prisma.io/docs

Key Topics:
* Prisma schema
* Migrations
* Prisma Client
* PostgreSQL integration

3. GraphQL
Used as the API query language for client–server communication.
Official Docs:
https://graphql.org/learn/

Key Topics:
* Queries & Mutations
* Resolvers
* Schema definition
* Authentication patterns

4. Render – PostgreSQL Database
Used for hosting the PostgreSQL database in production.
Official Docs:
https://render.com/docs/postgresql

Key Topics:
* Creating a PostgreSQL instance
* Connection strings
* Environment variable configuration

Recommended Reading for Developers

5. Apollo Server Docs:
https://www.apollographql.com/docs/apollo-server/

6. JWT Authentication Concepts:
https://jwt.io/introduction