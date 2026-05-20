import { SummaryTemplate, TranslateLanguage, OutputTone, ExampleTranscript, MeetingConfig } from "../types";
import { TEMPLATE_OPTIONS, LANGUAGE_OPTIONS, TONE_OPTIONS, SAMPLE_TRANSCRIPTS } from "../data";
import { Settings2, FileText, Check } from "lucide-react";

interface ConfigPanelProps {
  config: MeetingConfig;
  onChange: (newConfig: MeetingConfig) => void;
  onSelectSample: (content: string) => void;
}

export default function ConfigPanel({ config, onChange, onSelectSample }: ConfigPanelProps) {
  const updateField = <K extends keyof MeetingConfig>(field: K, value: MeetingConfig[K]) => {
    onChange({
      ...config,
      [field]: value
    });
  };

  return (
    <div className="flex flex-col gap-6 font-sans" id="config-panel">
      {/* 核心設定方塊 */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <h2 className="text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2 mb-6 italic">
          <Settings2 className="w-4 h-4 text-blue-500" />
          <span>處理規格設定 / Configuration</span>
        </h2>

        <div className="space-y-6">
          {/* 選擇總結模板 */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 font-bold mb-3">
              1. 總結模板風格 / Format Template
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {TEMPLATE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateField("template", opt.value)}
                  className={`w-full p-4 rounded-xl border text-left transition-all relative ${
                    config.template === opt.value
                      ? "bg-blue-600/10 border-blue-500 text-blue-300 shadow-md shadow-blue-950/20"
                      : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 text-zinc-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-sm">{opt.label}</p>
                      <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed font-sans">
                        {opt.description}
                      </p>
                    </div>
                    {config.template === opt.value && (
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white flex-shrink-0 ml-2">
                        <Check className="w-3" strokeWidth={3} />
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <hr className="border-zinc-800" />

          {/* 翻譯目標語言 */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 font-bold mb-2">
              2. 翻譯目標語言 / Target Language
            </label>
            <select
              value={config.translateLanguage}
              onChange={(e) => updateField("translateLanguage", e.target.value as TranslateLanguage)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-semibold transition-all cursor-pointer"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-zinc-900 border-none text-zinc-200 checked:bg-blue-600">
                  {opt.label} — {opt.description}
                </option>
              ))}
            </select>
          </div>

          <hr className="border-zinc-800" />

          {/* 語氣調整 */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 font-bold mb-3">
              3. 輸出語氣調校 / Tone Settings
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TONE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateField("tone", opt.value)}
                  className={`py-3 px-1.5 rounded-xl border text-center text-xs transition-all font-bold flex flex-col items-center gap-1.5 cursor-pointer ${
                    config.tone === opt.value
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                      : "bg-zinc-950/40 border-zinc-850 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  <span className="text-base">{opt.label.split(" ")[0]}</span>
                  <span className="tracking-wide">{opt.label.split(" ")[1]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 快速載入範例逐字稿 */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
        <h2 className="text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2 mb-3.5 italic">
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>快速體驗範例 / Templates</span>
        </h2>
        <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
          點選以下真實模擬情境的會議原文，快速填入資料以評估生成質量：
        </p>

        <div className="space-y-2.5">
          {SAMPLE_TRANSCRIPTS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectSample(sample.content)}
              className="w-full text-left p-4 rounded-2xl bg-zinc-950/45 border border-zinc-850 hover:bg-zinc-800/60 hover:border-zinc-700 transition-all text-xs group cursor-pointer"
            >
              <p className="font-bold text-blue-400 group-hover:text-blue-300 line-clamp-1">
                {sample.title}
              </p>
              <p className="text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed font-sans">
                {sample.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
