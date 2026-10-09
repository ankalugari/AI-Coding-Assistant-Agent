# CodeMentor AI

CodeMentor AI is a full-stack coding assistant and practice platform designed for beginners and intermediate learners. It combines a MySQL-backed problem library, a React frontend, and an Express API with AI-powered guidance from Groq models. Users can register, browse coding problems, run code, and ask the AI for explanations, debugging help, hints, and solution walkthroughs.

## Overview

This project provides:

- User authentication and session management
- A curated list of coding problems by difficulty and topic
- Problem detail pages with descriptions and challenge context
- AI-powered chat assistant for:
  - understanding a problem
  - generating hints
  - reviewing code
  - debugging errors
  - explaining concepts
  - checking solutions
- Code execution support for multiple languages using Judge0
- Conversation history tied to each problem and general assistant usage
- Learning-oriented data model for tracking user progress and knowledge topics

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Ant Design
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MySQL
- JWT authentication
- Groq SDK
- Judge0 for code execution
- Langfuse for AI tracing and observability

### Database

- MySQL with schema initialization in `database/schema.sql`

## Project Structure

```text
.
├── client/                     # React + Vite frontend
│   ├── src/                   # Application pages and components
│   ├── public/                # Static assets
│   ├── package.json
│   └── vite.config.js
├── database/
│   └── schema.sql             # MySQL schema and seed data
├── server/
│   ├── routes/                # API routes
│   ├── services/              # AI, DB, execution and agent logic
│   ├── middleware/            # Auth middleware
│   ├── db.js                  # MySQL pool config
│   ├── app.js                 # Express app setup
│   ├── server.js              # Server startup
│   ├── package.json
│   └── .env                   # Local environment variables
├── package.json               # Root-level metadata (optional wrapper)
├── README.md                  # Project documentation
└── .gitignore                 # Git ignore rules
```

## Features

### Authentication

- User registration
- User login
- JWT-based protected API routes
- Authenticated access to problem lists, assistant chat, and code execution

### Problem Experience

- Browse available coding challenges
- Open a specific problem detail page
- Read the challenge statement, difficulty, and topic
- Ask the assistant for guidance without spoiling the answer too early

### AI Assistant

The assistant can infer intent and respond appropriately to questions like:

- "Explain this problem"
- "Give me a hint"
- "Review my code"
- "Why is my code failing?"
- "Explain this concept"

The app also uses Langfuse to trace the AI workflow, capture prompts and responses, and help debug agent behavior during development.

### Code Execution

The backend supports code execution for:

- C
- C++
- Java
- JavaScript
- TypeScript
- Python

## Prerequisites

Make sure the following are installed on your machine:

- Node.js 18+
- npm
- MySQL 8+
- A Groq API key

## Database Setup

1. Create a MySQL database and user.
2. Import the schema file:

```bash
mysql -u root -p < database/schema.sql
```

This creates the database, tables, and seed data for coding problems and knowledge documents.

## Environment Variables

Create a file named `.env` in the `server/` directory with the following values:

```env
PORT=5000
DB_HOST=localhost
DB_USER=codementor_user
DB_PASSWORD=your_mysql_password
DB_NAME=codementor
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
LANGSMITH_PROJECT=codementor-ai
LANGFUSE_PUBLIC_KEY=your_langfuse_public_key
LANGFUSE_SECRET_KEY=your_langfuse_secret_key
LANGFUSE_BASE_URL=https://cloud.langfuse.com
```

> Make sure your MySQL user matches the credentials used in `server/db.js`.
> Langfuse is used for tracing and monitoring AI requests. The project already contains the OpenTelemetry instrumentation needed to send traces to Langfuse.

## Installation

### 1. Install backend dependencies

```bash
cd server
npm install
```

### 2. Install frontend dependencies

```bash
cd ../client
npm install
```

## Running the Project

### Start the backend

```bash
cd server
npm run dev
```

The server runs on:

```text
http://localhost:5000
```

### Start the frontend

Open a second terminal and run:

```bash
cd client
npm run dev
```

The frontend runs on the Vite development server, typically:

```text
http://localhost:5173
```

## API Highlights

The backend exposes routes under `/api`:

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Problems

- `GET /api/problems`
- `GET /api/problems/:id`

### AI Assistant

- `POST /api/ai/chat`
- `GET /api/ai/history/:problemId`
- `DELETE /api/ai/history/:problemId`

### Code Execution

- `POST /api/code/run`

## Typical Workflow

1. Register or log in to the app.
2. Open the dashboard or problem list.
3. Select a coding challenge.
4. Read the problem statement.
5. Write code in the interface.
6. Run the code against the judge.
7. Ask the AI for hints, explanations, or debugging feedback.
8. Improve your solution iteratively.

## Notes

- - The backend uses Groq for conversational AI responses and intent detection.
- Langfuse is enabled for tracing AI calls and observability through the OpenTelemetry integration in `server/instrumentation.js`.
- The project is designed as a beginner-friendly educational assistant rather than a production-grade judge platform.
- Some environment variables and credentials should remain local and not be committed to source control.

## Link
https://ai-coding-assistant-ag-git-c82faa-ankalugari-niharikas-projects.vercel.app/login

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fe93c811-e8c7-4de9-acbb-70420e0dd225" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9b0256e2-1af2-4019-8e6f-08828be39f36" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d10cd793-52d7-4f9a-9683-0008d78756d0" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/242d1360-3eec-4573-ae71-b36d6849e2b3" />
<img width="340" height="389" alt="image" src="https://github.com/user-attachments/assets/e62296c4-cab1-4a0c-a0af-97055cb28bfa" />


