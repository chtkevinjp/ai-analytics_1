import React from "react";
import { Sparkles, Calendar, Languages, ClipboardList } from "lucide-react";

export default function Header() {
  return (
    <header className="relative w-full bg-zinc-950 border-b border-zinc-800 py-10 px-6 text-zinc-100 md:px-12 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
        <div>
          {/* 系統小字與上標 */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-[10px] uppercase font-mono tracking-widest bg-zinc-900 border border-zinc-850 px-2.5 py-1 text-zinc-400 rounded">
              Engine Version: 3.5.0-Flash-Tuned
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-750"></span>
            <span className="text-xs text-zinc-500 font-mono tracking-wider">SECURE ENDPOINT</span>
          </div>

          {/* 巨型粗體排版 */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter leading-none uppercase">
            MEETING <span className="text-blue-500">AI</span>
          </h1>
          <p className="text-zinc-400 font-sans text-sm md:text-base font-medium tracking-tight mt-3 max-w-2xl leading-relaxed">
            智慧會議記錄生成與多元翻譯工具。一鍵將凌亂逐字稿、隨手草稿與多國對白，重構為分工明確、重點突出的 Markdown 專業簡報紀要。
          </p>
        </div>

        {/* 右側：狀態、支援語系極簡面板 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center lg:items-end lg:flex-col gap-4 text-xs font-mono text-zinc-400 self-start lg:self-end text-left lg:text-right border-l lg:border-l-0 lg:border-r border-zinc-800 pl-4 lg:pl-0 lg:pr-4">
          <div>
            <div className="text-[10px] text-zinc-650 uppercase tracking-widest font-semibold">Service Status</div>
            <div className="flex items-center gap-2 text-emerald-500 font-mono font-bold mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              GEMINI-3.5-FLASH ACTIVE
            </div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-650 uppercase tracking-widest font-semibold">Capabilities</div>
            <div className="text-zinc-300 font-bold mt-0.5">
              SUMMARY • LOCALIZATION • TONE SHIFT
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
