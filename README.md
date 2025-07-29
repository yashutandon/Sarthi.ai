# 🎥 Sarthi.ai

**Sarthi.ai** is a next-gen AI-powered SaaS web application that redefines real-time communication. Users can initiate live video calls with intelligent, context-aware AI agents — and access full meeting summaries, transcripts, recordings, and even a post-call AI chat interface that understands everything that happened in the call.

> From live conversations to intelligent follow-ups, **Sarthi.ai** is your smart meeting assistant.

---

## 🌟 Key Features

- 🎥 **Real-time Video Calling with AI Agents**  
  Initiate video calls where AI agents can actively participate in conversations.

- 🧠 **Context-Aware AI Chat**  
  After the call, continue the conversation with an AI that understands the entire meeting context.

- 📝 **Live Transcripts & Summaries**  
  Automatic transcription and meeting summary generation powered by background jobs.

- ⏪ **Call Recording & Playback**  
  Watch previous meetings with searchable transcripts.

- 🧩 **Scalable Modular Design**  
  Built using modern SaaS architecture with reusable UI and logic.

- 🔐 **Secure Authentication**  
  Handled via **Better Auth** to ensure a seamless and safe login experience.

- 💳 **Billing & Subscriptions**  
  Handled via **Polar**, with smooth integration and plan-based access control.

---

## 🧑‍💻 Tech Stack

| Category           | Tech Used                                          |
|--------------------|----------------------------------------------------|
| **Framework**       | Next.js 15, React 19                               |
| **Styling/UI**      | Tailwind CSS v4, ShadCN UI                         |
| **API Layer**       | tRPC, TanStack Query                               |
| **Database**        | Drizzle ORM, Neon DB (PostgreSQL)                 |
| **Authentication**  | Better Auth                                        |
| **Billing**         | Polar                                              |
| **AI Services**     | OpenAI (for summary, chat, and understanding)      |
| **Video & Chat**    | Stream SDK (video + messaging)                     |
| **Jobs & Workers**  | Inngest (for summaries, transcripts, etc.)         |
| **Deployment**      | Vercel                                             |

---

## 🔗 Live Demo

Check out the app here:  
🌐 [https://sarthi-ai-psi.vercel.app/](https://sarthi-ai-psi.vercel.app/)

---

## 🛠️ Installation & Setup


### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sarthi-ai.git
cd sarthi-ai

### 2. Install Dependencies

```bash

npm install
# or
yarn install


### 3. Configure Environment Variables
Create a .env file in the root with the following keys:

# Database
DATABASE_URL=your_neon_db_url

# Auth
AUTH_SECRET_KEY=your_auth_secret

# OpenAI
OPENAI_API_KEY=your_openai_key

# Polar (Billing)
POLAR_API_KEY=your_polar_key

# Stream SDK
STREAM_API_KEY=your_stream_key
STREAM_SECRET=your_stream_secret

# Inngest
INGGEST_API_KEY=your_inngest_key

# Other
NEXT_PUBLIC_APP_URL=https://sarthi-ai.vercel.app


### 4. Set Up the Database

```bash

npx drizzle-kit generate
npx drizzle-kit push

### 5. Run the App Locally

```bash

npm run dev
# or
yarn dev

Visit: http://localhost:3000
