import React from "react";
import { MessageSquarePlus, Trash2, ArrowUpRight } from "lucide-react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function TextInput({ value, onChange, onSubmit, isLoading }: TextInputProps) {
  const wordCount = value.trim().length;

  const handleClear = () => {
    if (window.confirm("確定要清除目前輸入的所有文本嗎？")) {
      onChange("");
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col h-full shadow-2xl" id="text-input-panel">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2 italic">
          <MessageSquarePlus className="w-4 h-4 text-blue-500" />
          <span>原始逐字稿內容 / Input Source</span>
        </h2>

        {value && (
          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-zinc-800 hover:text-rose-450 border border-transparent hover:border-zinc-700/60 transition-all cursor-pointer disabled:opacity-55"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>清空內容</span>
          </button>
        )}
      </div>

      <p className="text-xs text-zinc-500 mb-4 leading-relaxed font-sans">
        您可以手動貼上多國語言會議語音轉文字（Speech-to-Text）記錄，或直接寫下會議重要亂序隨筆，底部的 AI 智能重編核心將協助您生成精美分析。
      </p>

      {/* 大型文字輸入框 */}
      <div className="relative flex-grow min-h-[380px] flex flex-col">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="在此貼上您的會議記錄或逐字稿原始文本...

【範例】
張經理：今天討論Q3產品宣傳排程...
李專員：對，下週五前要把文宣準備完成並交給設計審核..."
          className="w-full flex-grow p-5 bg-zinc-950 border border-zinc-850 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm leading-relaxed text-zinc-200 placeholder-zinc-600 resize-none font-sans"
          disabled={isLoading}
        />

        {/* 右下角字數顯示 */}
        <div className="absolute bottom-4 right-4 bg-zinc-900/90 px-3 py-1 rounded-lg text-[10px] font-mono text-zinc-500 border border-zinc-800 shadow">
          CHAR: {wordCount.toLocaleString()}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading || value.trim().length === 0}
          className={`w-full group py-5 px-6 rounded-2xl text-lg font-display font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer ${
            isLoading
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              : value.trim().length === 0
              ? "bg-zinc-900 border border-zinc-850 text-zinc-600 cursor-not-allowed"
              : "bg-white text-zinc-950 hover:bg-blue-500 hover:text-white hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>正在極速分析重構與翻譯中...</span>
            </div>
          ) : (
            <>
              <span>生成總結與翻譯</span>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
