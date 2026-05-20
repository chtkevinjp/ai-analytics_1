import React, { useState } from "react";
import Markdown from "react-markdown";
import { Clipboard, Check, Download, FileJson, Sparkles, HelpCircle } from "lucide-react";

interface ResultDisplayProps {
  result: string;
  isLoading: boolean;
  timeTakenMs?: number;
}

export default function ResultDisplay({ result, isLoading, timeTakenMs }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("複製失敗，請手動全選複製。");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    // 使用當前日期做預設檔名
    const d = new Date();
    const dateStr = `${d.getFullYear()}${(d.getMonth() + 1).toString().padStart(2, "0")}${d.getDate().toString().padStart(2, "0")}`;
    link.setAttribute("download", `AI_會議記錄_${dateStr}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // react-markdown 渲染自訂元件 (採用 Bold Typography 排版與邊框)
  const renderers = {
    h1: ({ children, ...props }: any) => (
      <h1 className="text-2xl md:text-3.5xl font-display font-black text-white border-b border-zinc-800 pb-3 mt-8 mb-5 uppercase tracking-tighter flex items-center gap-2" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2 className="text-xl md:text-2.5xl font-display font-black text-white mt-10 mb-4 flex items-center gap-2 border-l-4 border-blue-500 pl-4 uppercase tracking-tight" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3 className="text-md md:text-lg font-bold text-zinc-100 mt-6 mb-2" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }: any) => (
      <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-4 font-sans" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }: any) => (
      <ul className="list-disc pl-5 space-y-2 text-zinc-400 text-sm md:text-base mb-5" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="list-decimal pl-5 space-y-2 text-zinc-400 text-sm md:text-base mb-5" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="text-zinc-300 leading-relaxed font-sans" {...props}>
        {children}
      </li>
    ),
    code: ({ children, ...props }: any) => (
      <code className="bg-zinc-950 text-rose-400 rounded-lg px-2 py-0.5 text-xs font-mono border border-zinc-850" {...props}>
        {children}
      </code>
    ),
    blockquote: ({ children, ...props }: any) => (
      <blockquote className="border-l-4 border-blue-500 bg-zinc-900/50 pl-4 py-3 pr-2 my-5 rounded-r text-zinc-450 text-sm font-sans italic" {...props}>
        {children}
      </blockquote>
    ),
    table: ({ children, ...props }: any) => (
      <div className="overflow-x-auto my-5">
        <table className="min-w-full divide-y divide-zinc-800 border border-zinc-800 rounded-xl text-sm overflow-hidden" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: any) => <thead className="bg-zinc-950" {...props}>{children}</thead>,
    tbody: ({ children, ...props }: any) => <tbody className="bg-zinc-900/40 divide-y divide-zinc-850" {...props}>{children}</tbody>,
    tr: ({ children, ...props }: any) => <tr className="hover:bg-zinc-800/40" {...props}>{children}</tr>,
    th: ({ children, ...props }: any) => (
      <th className="px-4 py-3 text-left font-bold text-zinc-400 text-xs tracking-wider uppercase bg-zinc-900/80" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="px-4 py-3 text-zinc-300 text-sm" {...props}>
        {children}
      </td>
    ),
    hr: ({ ...props }: any) => <hr className="border-zinc-800 my-8" {...props} />
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col h-full" id="result-display-panel">
      {/* 頂部標題與工具 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-800 pb-5 mb-6">
        <h2 className="text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2 italic">
          <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
          <span>AI 處理結果 / Output Result</span>
        </h2>

        {result && !isLoading && (
          <div className="flex items-center gap-2">
            {timeTakenMs && (
              <span className="text-xs text-zinc-500 font-mono mr-2 hidden md:inline">
                TIME: {(timeTakenMs / 1000).toFixed(2)}s
              </span>
            )}
            {/* 一鍵複製 */}
            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all border ${
                copied
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-zinc-800 text-zinc-200 border border-zinc-700 hover:bg-zinc-750 hover:border-zinc-650"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>已複製！</span>
                </>
              ) : (
                <>
                  <Clipboard className="w-3.5 h-3.5" />
                  <span>複製結果</span>
                </>
              )}
            </button>

            {/* 一鍵下載 */}
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-zinc-800 text-zinc-200 border border-zinc-700 hover:bg-zinc-750 hover:border-zinc-650 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>匯出 .md</span>
            </button>
          </div>
        )}
      </div>

      {/* 主要內容渲染區 */}
      <div className="flex-grow flex flex-col">
        {isLoading ? (
          /* 生成中動畫 */
          <div className="flex-grow flex flex-col items-center justify-center py-20 bg-zinc-950/45 rounded-2xl border border-dashed border-zinc-850">
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-16 w-16 rounded-full bg-blue-500 opacity-20 animate-ping"></span>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg relative z-10">
                <Sparkles className="w-6 h-6 text-white animate-spin" style={{ animationDuration: "3s" }} />
              </div>
            </div>
            <p className="mt-6 text-sm font-semibold text-zinc-300">
              Gemini 3.5 正在為您極速產出...
            </p>
            <p className="mt-2 text-xs text-zinc-550 max-w-sm text-center px-6 leading-relaxed font-sans">
              此階段正深入梳理對白脈絡、剔除語法口誤贅字、並歸類各項執行目標指標，請稍候約 8 至 15 秒。
            </p>
          </div>
        ) : result ? (
          /* 結果呈現 */
          <div className="bg-zinc-950/70 border border-zinc-850 rounded-2xl p-5 md:p-8 overflow-y-auto max-h-[600px] text-zinc-100">
            <div className="markdown-body">
              <Markdown components={renderers}>{result}</Markdown>
            </div>
          </div>
        ) : (
          /* 初始狀態 Placeholder */
          <div className="flex-grow flex flex-col items-center justify-center py-24 bg-zinc-950/20 rounded-2xl border border-dashed border-zinc-850">
            <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-500 mb-4 border border-zinc-800">
              <HelpCircle className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-zinc-400">
              尚未產生會議記錄結果 / No Data
            </p>
            <p className="mt-2 text-xs text-zinc-550 max-w-xs text-center px-6 leading-relaxed font-sans">
              請填寫左方會議內容原始稿，然後按下「生成總結與翻譯」按鈕，AI 處理完畢後將在此以標準 Markdown 完美排版呈現。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
