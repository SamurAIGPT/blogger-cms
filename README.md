# ✍️ Blogger CMS — AI-Powered Blog Writer & SEO Optimization SaaS

> **A fully production-ready AI SaaS for writing, generating, and optimizing blog posts.** Built with Next.js (App Router), this application is a self-contained SaaS boilerplate complete with user authentication, database-backed folder categorization, an interactive Rich Text WYSIWYG editor, and an advanced AI writer engine powered by MuAPI.

---

Blogger CMS is a highly optimized SaaS application designed to help bloggers, copywriters, and content agencies create and manage SEO-friendly articles. It features a modern, clean interface, real-time AI content generation, an advanced custom rich text editor, and integrated billing structures out of the box.

**Why use Blogger CMS?**

- **Production-Ready SaaS** — Complete with Google OAuth, PostgreSQL connection pooling, and Stripe Checkout workflows.
- **AI-Powered Generation** — Create comprehensive, formatted blog posts with headings, paragraphs, and lists instantly using the OpenAI gpt-5-chat engine.
- **Robust Local Testing** — Automatically falls back to a realistic local mock generator if the AI API is offline or the credentials aren't configured, making testing 100% reliable.
- **Custom Rich Text Editor** — Fast, native `contentEditable` editor with custom paragraph, heading, list, and font weight actions with automatic cursor focus preservation.
- **Granular Category Folders** — Group blog posts into categories (folders) for organized publishing workflows.
- **Full SEO Optimization Suite** — Track character counts, configure custom meta titles, descriptions, focus keywords, and canonical URLs.

![Blogger CMS](https://cdn.muapi.ai/data/2/319300472208/Screenshot_2026-05-25_113551.png)

---

## ✨ Core Features

### 🧠 AI Blog Generator
- Instantly write entire blog posts based on a **Primary Keyword** and **Blog Topic**.
- Formulates professional copy formatting subheadings (`h2`, `h3`), lists, bold text, and intro/conclusions.
- Polled asynchronously with status indicator overlays while the generation runs in the background.

### 📝 WYSIWYG Rich Text Editor
- Custom HTML text editor with controls for standard blocks (Paragraph, H2, H3), inline styling (Bold, Italic, Underline), and lists (Bullet, Numbered).
- Prevent-default mouse tracking prevents the text selection from being cleared when formatting buttons are clicked.
- Automated clean-up logic to show formatting placeholder prompts when the editor is cleared.

### 🗂️ Category & Folder Management (`/manage/blog-list`)
- Organize articles into custom blog folders.
- Sidebar navigator to switch between categories, view article counts per group, and delete groups.
- Perform quick actions like drafting, publishing, editing, or deleting posts.

### 💳 Stripe Credit Billing (`/pricing`)
- Pre-integrated tiers: **Starter** ($10/100 credits), **Pro** ($25/300 credits), and **Business** ($50/750 credits).
- Credit balances are automatically updated upon successful checkout completion using Stripe webhooks.

---

## 🔑 Required Environment Variables

Configure these keys inside your local `.env` or production Vercel dashboard:

| Category              | Variable                             | Purpose & Source                                                                             |
| :-------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------- |
| **Database**          | `DATABASE_URL`                       | PostgreSQL connection string ([Supabase](https://supabase.com) or [Neon](https://neon.tech)) |
|                       | `DIRECT_URL`                         | Direct DB connection for running Prisma migrations                                           |
| **NextAuth / Google** | `NEXTAUTH_SECRET`                    | Random secret string for signing auth tokens (`openssl rand -base64 32`)                     |
|                       | `NEXTAUTH_URL`                       | Local/production domain (e.g. `http://localhost:3000`)                                       |
|                       | `GOOGLE_CLIENT_ID`                   | Obtained from [Google Cloud Console Credentials](https://console.cloud.google.com/)          |
|                       | `GOOGLE_CLIENT_SECRET`               | Obtained from [Google Cloud Console Credentials](https://console.cloud.google.com/)          |
| **Stripe Billing**    | `STRIPE_SECRET_KEY`                  | Obtained from [Stripe API Keys](https://dashboard.stripe.com/apikeys)                        |
|                       | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Obtained from [Stripe API Keys](https://dashboard.stripe.com/apikeys)                        |
|                       | `STRIPE_WEBHOOK_SECRET`              | Configured webhook secret to resolve transaction credits                                     |
| **AI Generator**      | `MUAPIAPP_API_KEY`                   | AI API key from [muapi.ai](https://muapi.ai/)                                                |

---

## 🛠️ Local Development & Launch

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- A local or remote PostgreSQL database instance.

### Step-by-Step Setup

1. **Clone & Navigate**
   ```bash
   git clone https://github.com/SamurAIGPT/blogger-cms
   cd blogger-cms
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Variables**
   ```bash
   cp .env.example .env
   # Open .env and populate your active database and OAuth API keys
   ```

4. **Initialize DB Schema**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start Dev Server**
   ```bash
   npm run dev
   ```
   Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the app!

---

## 🏗️ Technical Architecture

```
blogger-cms/
├── prisma/
│   └── schema.prisma           # Schema tables: Users, Accounts, Sessions, BlogGroup, BlogPost
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/
│   │   │   ├── auth/           # NextAuth session configuration
│   │   │   ├── blogs/          # GET, POST, DELETE handlers for articles
│   │   │   ├── generate/       # AI generation task submitters & status checkers
│   │   │   ├── groups/         # GET, POST, DELETE handlers for category folders
│   │   │   └── stripe/         # Stripe checkout sessions & webhook fulfillment
│   │   ├── manage/
│   │   │   └── blog-list/      # Categorized dashboard list & folders workspace
│   │   ├── pricing/            # Credit packs & checkout landing page
│   │   ├── globals.css         # Typography, glassmorphism, and scrollbars
│   │   ├── layout.js           # Shared HTML wrapper, fonts, and Navbar import
│   │   └── page.js             # Main WYSIWYG Blog Editor and AI generator portal
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navbar.jsx      # Navigation header with credits counter & user state
│   │   ├── Providers.jsx       # NextAuth session wrapper
│   │   └── RichTextEditor.jsx  # Native contentEditable editor with select-preservation
│   └── lib/
│       ├── prisma.js            # Prisma client singleton (with pg adapter)
│       ├── auth.js              # Google OAuth credentials configuration
│       ├── config.js            # Plans details and cost definitions
│       ├── stripe.js            # Stripe client initialization helper
│       └── services/
│           ├── user.js          # User details queries & credit deduction helpers
│           ├── billing.js       # Webhook handling and checkout generation
│           └── ai.js            # MuAPI LLM requests and mock generators
```

---

## 📄 License

MIT Licensed. Fork it, customize it, and deploy your own AI-powered Blogging SaaS!
