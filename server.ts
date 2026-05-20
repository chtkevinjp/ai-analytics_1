import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import cors from "cors";

// 載入環境變數
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" })); // 支援較大的逐字稿上傳

// CORS 設定：可透過 ALLOWED_ORIGINS 指定允許來源（以逗號分隔）
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || "";
const allowedOrigins = allowedOriginsEnv.split(",").map(s => s.trim()).filter(Boolean);
if (allowedOrigins.length > 0) {
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow server-to-server or same-origin (no origin)
      if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
      return callback(new Error("CORS policy: origin not allowed"), false);
    }
  }));
} else {
  // 若未設定 ALLOWED_ORIGINS，預設允許所有來源（方便本機開發）
  app.use(cors());
}

// 延遲初始化 Gemini 用戶端以避免啟動時因金鑰缺失直接當機
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("找不到 GEMINI_API_KEY 環境變數，請至 AI Studio 的 Settings > Secrets 面板點擊新增此 Secret。");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `你是一位專業的會議記錄助理。請根據使用者提供的會議逐字稿，整理出結構化的會議紀錄。
請務必遵守以下輸出格式要求：

1. **會議主題與時間**：擷取會議的主題與時間。
2. **與會者**：列出參與會議的人員。
3. **會議重點總結**：用 3 到 5 個重點總結會議內容。
4. **Action Items (待辦事項)**：明確列出接下來的待辦事項與負責人。
5. **英文翻譯版**：將上述 1~4 點的內容完整翻譯成專業的英文。

請以 Markdown 格式輸出，所有繁體中文部分必須使用**繁體中文**回覆，不要包含任何額外的問候語或結語。`;

// 處理總結與翻譯 API
app.post("/api/generate", async (req, res) => {
  try {
    const { text, template = "all-in-one", translateLanguage = "none", tone = "professional" } = req.body;

    if (!text || typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({ error: "請提供會議內容或逐字稿文字！" });
    }

    // 取得選項文字
    const templateMap: Record<string, string> = {
      "all-in-one": "預設全方位總結 (包含摘要、主題重點、行動待辦、下次規劃)",
      "bullet": "條列式極簡摘要 (僅要點與重大決策，不贅述)",
      "action": "行動待辦與執行指南 (高度專注於負責人、交付標準與項目時程)",
      "analysis": "詳細決策與論證記錄 (詳列討論背景、各方論點以及考慮原因)"
    };

    const langMap: Record<string, string> = {
      "none": "不翻譯（由 AI 依原意精修繁體中文）",
      "zh-tw": "繁體中文 (Traditional Chinese - Taiwan)",
      "en": "英文 (English)",
      "ja": "日文 (Japanese)",
      "ko": "韓文 (Korean)",
      "es": "西班牙文 (Spanish)",
      "fr": "法文 (French)"
    };

    const toneMap: Record<string, string> = {
      "professional": "專業正式 (商務會議、正式工作回報專用，措辭嚴謹)",
      "concise": "簡明扼要 (精準俐落，直奔主題，節省閱讀時間)",
      "friendly": "親切通俗 (輕鬆友善的組織內部通訊或團隊討論氣氛)"
    };

    const templateText = templateMap[template] || templateMap["all-in-one"];
    const targetLangText = langMap[translateLanguage] || langMap["none"];
    const toneText = toneMap[tone] || toneMap["professional"];

    // 取得/初始化 Gemini 客戶端
    const ai = getGeminiClient();

    // 呼叫 Gemini
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `以下是需要你處理的會議原始輸入內容：
----------------------------------------
${text}
----------------------------------------

請依據下列客製化設定進行處理與優化：
1. 指定總結模板：${templateText}
2. 指定翻譯目標語言：${targetLangText}
3. 指定輸出語氣設定：${toneText}

請開始精心重構與翻譯，直接輸出最終的 Markdown 格式會議記錄，不需要多餘的引言或客套話。`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3, // 低隨機度，維持穩定
      }
    });

    const resultText = response.text || "（AI 未返回任何內容）";

    return res.json({ result: resultText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // 傳回具體錯誤訊息以利除錯
    return res.status(500).json({
      error: error.message || "伺服器處理時發生未知錯誤，請稍後再試。"
    });
  }
});

// Vite 整合配置
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // 開發模式：載入 Vite 中間件
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // 生產模式：提供打包後的靜態檔案
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FULL-STACK] Server runs successfully on http://0.0.0.0:${PORT}`);
  });
}

startServer();
