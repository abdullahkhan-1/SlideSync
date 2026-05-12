"use client";

import Link from "next/link";
import { useCallback, useId, useRef, useState } from "react";

const ACCEPT = ".pdf,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation";

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function CloudUploadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.32-4.364 2.25 2.25 0 0 1 4.202 2.104A4.5 4.5 0 0 1 18 19.5H6.75Z" />
    </svg>
  );
}

const howCards = [
  {
    title: "Upload Slides",
    body: "Drop PDF or PPTX decks from any course—your files stay in the browser for this preview.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" x2="12" y1="3" y2="15" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "AI Matches Topics",
    body: "SlideSync maps headings and concepts to the most relevant lecture moments on YouTube.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden>
        <path d="m12 3-1.912 5.813-6.088-.004L9.503 12.8 7.625 18.606 12 15.863l4.375 2.743-1.878-5.806L21 8.809l-6.088.004L12 3Z" />
      </svg>
    ),
  },
  {
    title: "Watch & Learn",
    body: "Open matched videos in sync with your slides—revision without endless searching.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="m10.622 10.343 3.182-1.822a.55.55 0 0 1 .825.454v3.65a.55.55 0 0 1-.825.454l-3.182-1.822a.55.55 0 0 1 0-.914z" />
      </svg>
    ),
  },
];

export default function Home() {
  const inputId = useId();
  const dragDepth = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const filterAccepted = useCallback((list: FileList | File[]) => {
    const out: File[] = [];
    const arr = Array.from(list);
    for (const f of arr) {
      const lower = f.name.toLowerCase();
      if (lower.endsWith(".pdf") || lower.endsWith(".pptx")) out.push(f);
    }
    return out;
  }, []);

  const addFiles = useCallback(
    (list: FileList | null) => {
      if (!list?.length) return;
      const next = filterAccepted(list);
      if (next.length) setFiles((prev) => [...prev, ...next]);
    },
    [filterAccepted]
  );

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragDepth.current += 1;
    setIsDragging(true);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragDepth.current -= 1;
    if (dragDepth.current <= 0) {
      dragDepth.current = 0;
      setIsDragging(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragDepth.current = 0;
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const removeAt = (i: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0f1e] text-slate-100">
      <div className="pointer-events-none absolute inset-0 dot-grid-overlay opacity-90" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-30%,rgba(56,189,248,0.14),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[420px] w-[420px] translate-x-1/4 rounded-full bg-sky-500/10 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[320px] w-[320px] -translate-x-1/4 translate-y-1/4 rounded-full bg-blue-600/10 blur-[90px]"
        aria-hidden
      />

      <header className="relative z-20 border-b border-white/[0.07] bg-[#0a0f1e]/55 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] backdrop-blur-2xl backdrop-saturate-150">
        <nav className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group flex items-baseline gap-0 transition-opacity duration-300 hover:opacity-90"
          >
            <span className="text-[1.15rem] font-bold tracking-[-0.02em] text-white sm:text-xl">
              SlideSync
            </span>
            <span
              className="ml-0.5 inline-block h-2 w-2 translate-y-[-2px] rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)] ring-2 ring-sky-400/30 transition-transform duration-300 group-hover:scale-110"
              aria-hidden
            />
          </Link>
          <div className="hidden items-center gap-10 text-[13px] font-medium text-slate-400 sm:flex">
            <a
              href="#how"
              className="transition-colors duration-300 hover:text-white"
            >
              How it works
            </a>
            <a
              href="#upload"
              className="transition-colors duration-300 hover:text-white"
            >
              Upload
            </a>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="hidden rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-sm font-medium text-slate-200 shadow-sm transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.07] hover:text-white active:scale-[0.98] sm:inline-flex"
            >
              Sign in
            </button>
            <button
              type="button"
              className="rounded-lg bg-gradient-to-b from-sky-400 to-sky-600 px-4 py-2 text-sm font-semibold text-[#0a0f1e] shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_1px_2px_rgba(0,0,0,0.35),0_8px_24px_-4px_rgba(56,189,248,0.45)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset,0_12px_32px_-4px_rgba(56,189,248,0.55)] active:scale-[0.98]"
            >
              Get started
            </button>
          </div>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-28 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300/90">
            Slides × video
          </p>

          <div className="relative mx-auto px-2">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[min(140%,420px)] w-[min(120%,720px)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.35)_0%,rgba(59,130,246,0.12)_42%,transparent_68%)] blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[min(80%,280px)] w-[90%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(147,197,253,0.25)_0%,transparent_55%)] blur-2xl"
              aria-hidden
            />
            <h1 className="relative text-balance text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl sm:leading-[1.02] md:text-6xl lg:text-7xl">
              Find The Lecture Behind Every Slide
            </h1>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">
            Upload PDF or PowerPoint decks and SlideSync surfaces matching YouTube
            lectures for each topic—so you can revise faster, without the search
            rabbit hole.
          </p>
        </div>

        <div id="upload" className="relative mx-auto mt-16 max-w-xl scroll-mt-28">
          <div className="relative rounded-2xl">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              aria-hidden
            >
              <defs>
                <linearGradient id="slideSyncUploadRing" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop stopColor="#22d3ee" />
                  <stop offset="0.5" stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <rect
                x="1"
                y="1"
                width="calc(100% - 2px)"
                height="calc(100% - 2px)"
                rx="15"
                ry="15"
                fill="none"
                stroke="url(#slideSyncUploadRing)"
                strokeWidth="2"
                strokeDasharray="10 8"
                strokeLinecap="round"
                className="opacity-90 [animation:upload-dash-shift_2.5s_linear_infinite] drop-shadow-[0_0_10px_rgba(56,189,248,0.45)]"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <label
              htmlFor={inputId}
              onDragEnter={onDragEnter}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`upload-zone-animated group relative m-[2px] flex cursor-pointer flex-col items-center rounded-[14px] border border-white/[0.06] bg-[#0d1528]/90 px-6 py-14 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-sm transition-all duration-300 sm:px-10 ${
                isDragging
                  ? "scale-[1.01] border-sky-400/35 bg-sky-500/15 shadow-[0_0_48px_-8px_rgba(56,189,248,0.55)]"
                  : "hover:border-sky-400/25 hover:bg-[#101a2e]/95 hover:shadow-[0_0_40px_-10px_rgba(56,189,248,0.35)]"
              }`}
            >
              <input
                id={inputId}
                type="file"
                accept={ACCEPT}
                multiple
                className="sr-only"
                onChange={onInputChange}
              />
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/25 via-sky-500/10 to-transparent text-sky-300 shadow-[0_0_32px_-4px_rgba(56,189,248,0.55),inset_0_1px_0_0_rgba(255,255,255,0.12)] ring-1 ring-sky-400/35 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(56,189,248,0.5)]">
                <CloudUploadIcon className="h-8 w-8" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">
                Drop your PDF or PPTX here
              </span>
              <span className="mt-2 text-center text-sm text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                or click to browse
              </span>
              <span className="mt-8 rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-slate-500">
                Preview — no upload yet
              </span>
            </label>
          </div>

          {files.length > 0 && (
            <ul className="mt-6 space-y-2 rounded-xl border border-white/[0.08] bg-[#0d1528]/60 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur-md">
              {files.map((f, i) => (
                <li
                  key={`${f.name}-${i}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-transparent px-3 py-2.5 text-sm transition-all duration-300 hover:border-white/[0.06] hover:bg-white/[0.04]"
                >
                  <div className="min-w-0 flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sky-300 shadow-[0_0_20px_-6px_rgba(56,189,248,0.5)] ring-1 ring-sky-400/20">
                      {f.name.toLowerCase().endsWith(".pdf") ? (
                        <span className="text-[10px] font-bold">PDF</span>
                      ) : (
                        <span className="text-[10px] font-bold">PPT</span>
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-200">{f.name}</p>
                      <p className="text-xs text-slate-500">{formatBytes(f.size)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeAt(i);
                    }}
                    className="shrink-0 rounded-md p-1.5 text-slate-500 transition-all duration-300 hover:bg-white/10 hover:text-white active:scale-90"
                    aria-label={`Remove ${f.name}`}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <section id="how" className="mx-auto mt-28 max-w-5xl scroll-mt-28">
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-lg font-medium tracking-tight text-white">
            From deck to playlist in three steps
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {howCards.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c1322]/90 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/25 hover:bg-[#0e1628]/95 hover:shadow-[0_20px_48px_-24px_rgba(56,189,248,0.35),0_0_0_1px_rgba(56,189,248,0.08)_inset]"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-500/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0"
                  aria-hidden
                />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/20 to-blue-600/10 text-sky-300 shadow-[0_0_28px_-6px_rgba(56,189,248,0.55)] ring-1 ring-sky-400/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_36px_-4px_rgba(56,189,248,0.65)]">
                  {item.icon}
                </div>
                <h3 className="relative mt-5 text-lg font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] bg-[#0a0f1e]/80 py-10 text-center text-sm text-slate-500 backdrop-blur-sm">
        © {new Date().getFullYear()} SlideSync. UI preview — processing coming soon.
      </footer>
    </div>
  );
}
