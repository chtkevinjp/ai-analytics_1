import React, { useState } from "react";
import Header from "./components/Header";
import ConfigPanel from "./components/ConfigPanel";
import TextInput from "./components/TextInput";
import ResultDisplay from "./components/ResultDisplay";
import { MeetingConfig } from "./types";
import { AlertCircle, HelpCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeTakenMs, setTimeTakenMs] = useState<number | undefined>(undefined);
  const [error, setError] = useState("");

  const [config, setConfig] = useState<MeetingConfig>({
    template: "all-in-one",
    translateLanguage: "none",
    tone: "professional"
  });

  // 處理載入情境範例
  const handleSelectSample = (content: string) => {
    setInputText(content);
    // 每次重新載入範例時清空之前的結果與錯誤
    setResult("");
    setError("");
    setTimeTakenMs(undefined);
  };

  // 生成總結與翻譯
  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError("");
    setResult("");
    setTimeTakenMs(undefined);
    const startTime = Date.now();

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: inputText,
          template: config.template,
          translateLanguage: config.translateLanguage,
          tone: config.tone
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "生成失敗，請確認後端服務運作狀態。");
      }

      setResult(data.result);
      setTimeTakenMs(Date.now() - startTime);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "與伺服器連線失敗，請稍候重試。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col font-sans antialiased text-zinc-100 select-none">
      {/* 標題欄 */}
      <Header />

      {/* 系統主要操作區 */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 md:py-12 flex flex-col gap-8 select-text">
        {/* 錯誤橫幅 Alert */}
        {error && (
          <div className="flex items-start gap-4 p-5 bg-rose-500/10 border border-rose-550/20 rounded-3xl text-rose-250 text-sm animate-fade-in shadow-xl">
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold tracking-wide text-rose-300">處理時發生意外錯誤 / System Error</p>
              <p className="mt-1 text-rose-400/90 leading-relaxed font-mono text-xs">{error}</p>
              <p className="mt-3 text-xs text-zinc-400 bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-850">
                💡 解決建議：請至專案右上方選單 <b>Settings &gt; Secrets</b> 確認是否已正確填入專屬的 <b>GEMINI_API_KEY</b> 金鑰！
              </p>
            </div>
          </div>
        )}

        {/* 核心排版：左欄設定、右欄輸入與輸出 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 左側：設定規格與快速範例 */}
          <section className="lg:col-span-4 flex flex-col gap-6">
            <ConfigPanel
              config={config}
              onChange={setConfig}
              onSelectSample={handleSelectSample}
            />

            {/* 安全提示 */}
            <div className="bg-zinc-900 border border-zinc-850 rounded-3xl p-5 flex gap-3 text-xs text-zinc-400 shadow-lg">
              <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <div>
                <span className="font-bold text-zinc-200 block mb-1">伺服器端金鑰防禦保護 / Encryption</span>
                本平台基於高安全性 Full-Stack 雲端技術設計。所有 AI 模型呼叫（Gemini API）皆採用獨立的 server-side 線上呼叫，您的 Secrets 與敏感對白絕不暴露，確保商業隱私。
              </div>
            </div>
          </section>

          {/* 右側：輸入區（上）與結果呈顯區（下） */}
          <section className="lg:col-span-8 flex flex-col gap-8">
            {/* 上：大型文字方塊 */}
            <TextInput
              value={inputText}
              onChange={setInputText}
              onSubmit={handleGenerate}
              isLoading={isLoading}
            />

            {/* 下：Markdown 格式總結與輸出 */}
            <ResultDisplay
              result={result}
              isLoading={isLoading}
              timeTakenMs={timeTakenMs}
            />
          </section>
        </div>
      </main>

      {/* 底部政策與聲明 */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-10 px-6 text-center text-zinc-650 text-xs mt-auto font-mono tracking-wider">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p>© 2026 AI MEETING SYSTEM. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4 justify-center text-zinc-550 text-[11px]">
            <span className="hover:text-zinc-400 transition-colors cursor-default">TAIWAN STANDARD VER. 3.2</span>
            <span>·</span>
            <span className="hover:text-zinc-400 transition-colors cursor-default">GEMINI CLOUD ARCHITECTURE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
