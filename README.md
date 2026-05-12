<div align="center">

# 🎞️ SlideSync

### *Your professor's slides. The world's best lectures. Perfectly matched.*

**SlideSync automatically maps your university lecture slides to exact timestamps in MIT, Harvard, and NPTEL video lectures — so you never have to hunt for the right video again.**

<br/>

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

![Vercel](https://img.shields.io/badge/Hosted_on-Vercel-000000?style=flat-square&logo=vercel)
![Render](https://img.shields.io/badge/Backend_on-Render-46E3B7?style=flat-square&logo=render&logoColor=black)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)

</div>

---

## 📌 The Problem

University students across **Pakistan and South Asia** face a uniquely frustrating situation at exam time.

Their professors — often at public and private universities — teach directly from lecture slides borrowed from world-class institutions: **IIT India (NPTEL), MIT OpenCourseWare, Harvard**, and others. Those institutions publish high-quality video lectures freely on YouTube that correspond to those exact slides.

The problem? **Students don't know which video to watch, or when to start watching it.**

Manually hunting through 40-minute lectures to find the 3 minutes that match slide 17 is a miserable experience. Students either waste hours scrubbing through videos, give up entirely, or cram from slides alone — missing the intuition that video explanations provide.

**SlideSync fixes this.** Upload your slides. Get back a precise map of every slide to the exact video lecture segment that teaches it.

---

## ✨ How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  1. Student uploads lecture slides (PDF or PPTX)               │
│                          │                                      │
│                          ▼                                      │
│  2. Backend extracts slide titles using font-size detection     │
│     (PDF) and placeholder detection (PPTX)                     │
│                          │                                      │
│                          ▼                                      │
│  3. Topics are semantically matched to YouTube transcripts      │
│     from NPTEL, MIT OCW, Harvard, and YouTube                  │
│                          │                                      │
│                          ▼                                      │
│  4. Slide X → "Binary Trees" → youtu.be/abc123?t=847           │
│                          │                                      │
│                          ▼                                      │
│  5. Student clicks and watches the exact segment they need      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**No manual searching. No scrubbing. No guessing.**

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | React framework with SSR and file-based routing |
| **TypeScript** | Type safety across all components |
| **Tailwind CSS** | Utility-first styling with dark navy + electric blue theme |
| **Vercel** | Hosting on free tier |

### Backend
| Technology | Purpose |
|---|---|
| **Python + FastAPI** | High-performance async API server |
| **Uvicorn** | ASGI server runtime |
| **PyMuPDF** | PDF text extraction with font-size metadata |
| **python-pptx** | PPTX slide parsing and placeholder detection |
| **sentence-transformers** | Local semantic similarity matching (no API cost) |
| **youtube-transcript-api** | Free YouTube transcript pulling |
| **YouTube Data API v3** | Channel-scoped video search (10k units/day free) |
| **OpenAI Whisper** | Local speech-to-text fallback for videos without captions |
| **Render** | Backend hosting on free tier |

### Database & Auth
| Technology | Purpose |
|---|---|
| **Supabase (PostgreSQL)** | Caching processed slide results to avoid reprocessing |
| **Supabase Auth** | Google OAuth login (planned) |

---

## 📁 Project Structure

```
SLIDESYNC/
├── frontend/                     # Next.js 14 app
│   ├── app/
│   │   ├── page.tsx              # Homepage with drag & drop upload UI
│   │   ├── layout.tsx            # Root layout and metadata
│   │   ├── globals.css           # Global styles and Tailwind directives
│   │   └── lib/
│   │       └── upload.ts         # API client — sends file to backend
│   ├── public/                   # Static assets (logo, icons)
│   └── package.json
│
├── backend/                      # Python FastAPI app
│   ├── main.py                   # All endpoints, extraction, matching logic
│   ├── requirements.txt          # Python dependencies
│   └── venv/                     # Virtual environment (not committed)
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **Python** 3.10 or higher
- A **YouTube Data API v3** key ([get one free here](https://console.cloud.google.com/))
- A **Supabase** project ([free tier](https://supabase.com))

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/slidesync.git
cd slidesync
```

---

### 2. Set Up the Backend

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:

```env
YOUTUBE_API_KEY=your_youtube_data_api_v3_key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key
FRONTEND_ORIGIN=http://localhost:3000
```

Start the backend server:

```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.
Swagger docs at `http://localhost:8000/docs` *(development only — disabled in production)*.

---

### 3. Set Up the Frontend

```bash
cd ../frontend

# Install dependencies
npm install
```

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 📡 API Reference

### `GET /`
Health check endpoint.

**Response:**
```json
{ "status": "ok", "message": "SlideSync backend is running" }
```

---

### `POST /api/extract`
Accepts a PDF or PPTX file and returns structured slide data.

**Request:**
- `Content-Type: multipart/form-data`
- Body: `file` — a `.pdf` or `.pptx` file

**Response:**
```json
{
  "slides": [
    {
      "slide_number": 1,
      "title": "Introduction to Binary Trees",
      "content": "A binary tree is a tree data structure in which each node has at most two children..."
    },
    {
      "slide_number": 2,
      "title": "Tree Traversal Methods",
      "content": "In-order, Pre-order, Post-order traversal..."
    }
  ]
}
```

**Errors:**
| Status | Meaning |
|---|---|
| `400` | Unsupported file type |
| `422` | Malformed or unreadable file |
| `500` | Internal extraction failure |

---

### `GET /docs`
Auto-generated Swagger UI. **Disabled in production.**

---

## ✅ Current Features

- [x] Drag-and-drop file upload (PDF and PPTX)
- [x] Automatic slide topic extraction from uploaded files
- [x] Font-size based title detection for PDFs (via PyMuPDF)
- [x] Placeholder-based title detection for PPTX (via python-pptx)
- [x] Clean dark navy UI with electric blue accents
- [x] Loading states and error handling
- [x] Results displayed as individual slide cards with title and content preview
- [x] CORS restricted to frontend origin only

---

## 🗺️ Roadmap

- [ ] **Semantic video matching** — sentence-transformers model maps slide topics to YouTube transcripts
- [ ] **Timestamp-precise links** — output `youtu.be/videoID?t=seconds` for each slide
- [ ] **NPTEL + MIT OCW channel priority** — search these channels first before general YouTube
- [ ] **Supabase result caching** — identical slide sets are never processed twice
- [ ] **Google login via Supabase Auth** — save and revisit previous uploads
- [ ] **Rate limiting + API key protection** — secure the backend before full public launch
- [ ] **Mobile-responsive design** — full support for phones and tablets
- [ ] **Production deployment** — Vercel (frontend) + Render (backend) live deployment
- [ ] **Whisper fallback** — local speech-to-text for videos without captions

---

## 🤝 Contributing

Contributions are genuinely welcome. This project is being built in the open because the problem it solves is real and affects thousands of students.

If you're a student, developer, or educator who wants to help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please open an issue first for significant changes so we can discuss the approach. Bug fixes and documentation improvements are always welcome without prior discussion.

---

## 🔒 Security

- CORS is restricted to the configured frontend origin
- The `/docs` endpoint is disabled in production builds
- API key authentication is planned before public deployment
- Rate limiting is planned before public deployment
- No user files are stored permanently — uploads are processed in memory and discarded

If you discover a vulnerability, please open a private issue rather than a public one.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to use, copy, modify, merge, publish, and distribute this software. Attribution is appreciated.

---

## 👨‍💻 About

SlideSync was built by a **university student from Pakistan** as a real tool for a real problem.

Every semester, students across Pakistan, India, Bangladesh, and neighbouring countries sit in lectures taught from slides borrowed from MIT, IIT, and Harvard — institutions that also publish their full video lectures for free. The gap between those slides and those videos costs students hours of frustration every exam season.

This project is an attempt to close that gap, for free, for anyone who needs it.

If this tool helps you pass an exam, that's the whole point.

---

<div align="center">

Built with ☕ and frustration somewhere in Pakistan.

**[⭐ Star this repo if it helped you](https://github.com/yourusername/slidesync)**

</div>