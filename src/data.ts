import { SummaryTemplate, TranslateLanguage, OutputTone, ExampleTranscript } from "./types";

export interface Option<T> {
  value: T;
  label: string;
  description?: string;
}

export const TEMPLATE_OPTIONS: Option<SummaryTemplate>[] = [
  {
    value: "all-in-one",
    label: "📅 預設全方位總結",
    description: "全方位概覽、核心摘要、各主題討論重點、分工行動代辦、下次規劃。"
  },
  {
    value: "bullet",
    label: "🎯 條列式極簡摘要",
    description: "去除討論細節與論證，僅保留最關鍵的 5-10 個結論與焦點數據。"
  },
  {
    value: "action",
    label: "🛠️ 行動待辦與執行指南",
    description: "高度聚焦於負責人、交付標準與項目時程（Action Items）。"
  },
  {
    value: "analysis",
    label: "📝 詳細決策與論證記錄",
    description: "詳列討論背景、提案動機、各方正反論點以及最終共識考量。"
  }
];

export const LANGUAGE_OPTIONS: Option<TranslateLanguage>[] = [
  { value: "none", label: "不翻譯（AI 原音精修繁中）", description: "保持為流暢雅緻的繁體中文習慣" },
  { value: "zh-tw", label: "繁體中文 🇹🇼", description: "翻譯為台灣習慣之語法措辭" },
  { value: "en", label: "英文 (English) 🇺🇸", description: "標準商業美式英文會議記錄" },
  { value: "ja", label: "日文 (Japanese) 🇯🇵", description: "敬語得體、條理分明的日式議事錄" },
  { value: "ko", label: "韓文 (Korean) 🇰🇷", description: "符合商務禮儀的韓文整理" },
  { value: "es", label: "西班牙文 (Spanish) 🇪🇸", description: "專業西班牙語會議記錄" },
  { value: "fr", label: "法文 (French) 🇫🇷", description: "專業法語會議記錄" }
];

export const TONE_OPTIONS: Option<OutputTone>[] = [
  { value: "professional", label: "👔 專業正式", description: "措辭莊重、商務感強，適合向主管、客戶匯報" },
  { value: "concise", label: "⚡ 簡明扼要", description: "字字珠璣、去除冗餘，供快速瀏覽與閱讀" },
  { value: "friendly", label: "👋 溫馨親切", description: "語氣溫和友善，適合年輕新創或小組團隊日常同步" }
];

export const SAMPLE_TRANSCRIPTS: ExampleTranscript[] = [
  {
    title: "⚡ 敏捷產品開發與衝刺會 (Sprint Sync)",
    description: "包含工程師、產品經理對於首頁效能優化與下個功能時程的快速討論。",
    content: `PM 小明：大家早上好，今天我們週會主要同步三件事。第一是上週說的首頁載入速度太慢，用戶反饋很多。第二是新版「智慧問答」功能的 UI 設計和上線時程，第三是確認這週 Sprint 研發分配。
前端阿強：那我先講一下首頁效能。我上週五有用 Chrome DevTools 測過，發現問題出在首頁加載了太多沒壓縮的大圖，還有第三方嵌入的追蹤 code 阻塞了 DOM 渲染。我這週會動手做圖片壓縮、加上懶加載 Lazy loading，並把第三方 script 改成 defer。
PM 小明：聽起來很有可行性。那你預計什麼時候能改好並上 staging 測試？
前端阿強：這週三下班前，我可以包個 PR 給團隊 code review。如果沒問題，週四可以在測試機跑跑看。
PM 小明：好，阿強負責首頁效能，目標是讓 LCP 指標小於 2.5 秒，週四完成測試。那後端大山，關於「智慧問答」的 API 完成了嗎？
後端大山：API 已經寫好了，Swagger 文件也更新了，不過目前沒串接 cache，每次查詢都要打資料庫，如果高併發的話可能會有些撐不住。所以這兩天我打算把 Redis 快取機制加上去，預計週五前可以全部弄好。
PM 小明：太好了，大山負責智慧問答 API 快取，週五前搞定，下週一發布。那 UI/UX 設計師 Sandy 呢？
設計師 Sandy：新功能「智慧問答」的 Figma 藍圖我已經畫好了，包含手機版和電腦版的響應式設計。另外根據阿強的建議，我把一些複雜的 SVG 動畫改成了純 CSS 實現，這對效能也有幫助。我等等把 Figma 連結丟到 Slack 頻道上。
PM 小明：Sandy 太給力了。今天會後大家去確認 Figma。那我們下一次同步會議就定在下週一早上十點。今天就先到這邊，謝謝大家。`
  },
  {
    title: "🚀 行銷腦力激盪與新產品推廣策略",
    description: "市場與社群經理討論如何在 Threads 與 Instagram 進行下期爆款行銷。",
    content: `行銷總監 Vivian：哈囉大家，目前我們的新 AI 助理 App 準備下個月 15 號正式對外公開（公測）。今天的腦力激盪，我們要決定兩件事：第一個是我們的核心宣傳標語（Slogan），第二個是在社群媒體（特別是 Threads 和 IG）上的行銷方案。
社群經理 Cathy：我先提想法。現在 Threads 上的脆友很喜歡那種真實、自嘲、幽默的內容。我覺得我們的 Slogan 可以叫「告別加班！讓 AI 當你的私人第二大腦」，主打工作效率提升。
設計師 Leo：這個 slogan 語感不錯，我很喜歡「第二大腦」這個概念。如果是這樣，IG 的視覺設計我打算做成「加班前後的對比圖」或者「辦公桌乾淨度的對比」，做成九宮格。
行銷總監 Vivian：這點子好！對比圖很直覺。另外，我們有預算請一些 Kof (Key opinion leaders) 或是科技博主來開箱嗎？
社群經理 Cathy：我有整理一份 10 位科技、效率型網紅名單，他們的粉絲多在 2 萬到 10 萬之間，互動率都很高。這週五之前我會去發信詢問合作意願和報價，報價整理好之後會同步給 Vivian 審批。
行銷總監 Vivian：好，Cathy 負責聯絡網紅，週五前整理報價。Leo 負責設計 IG/Threads 首波文宣視覺草圖，預計下週二給第一版。
文案企劃 Roy：那那種長文部落格和 SEO 會後我來寫，我這週內會出兩篇關於「如何利用 AI 達成無痛工作流」的主題文章，埋我們的 App 關鍵字。
行銷總監 Vivian：太棒了，大家分工明確：Cathy 週五出名單與報價；Leo 下週二出生社群素材；Roy 這週五前完成兩篇 SEO 文章。下週三我們看報價和 Leo 的初版設計，謝謝大家！`
  },
  {
    title: "🌐 跨國線上新創團隊戰略週會",
    description: "多國團隊成員在 Google Meet 的對話，討論平台國際化、伺服器遷移到東京區域等問題。",
    content: `VP Joe: Hello team, thanks for joining. Today we are focusing on our global expansion. We decided to target Japan and Korea markets by Q3. 
Tech Lead Ken: 對於日韓市場，我們的系統伺服器目前在中美洲，延遲比較大。我建議在 AWS 東京區域（ap-northeast-1）開一個新的 Replica 節點，這可以把日韓用戶的 ping 值降到 50ms 以下。預估這項硬體投入每個月會增加 $300 美金的費用。
VP Joe: That sounds like a worthy investment. Ken, please conduct a cost-benefit simulation by Friday, and if it looks solid, we can execute the migration next week.
Tech Lead Ken: 沒問題，我週五前把報告準備好，到時候發給您和財務。
Localizer Hana: 還有語言在地化問題。日文和韓文的翻譯我們上週拿到初稿了，但發現有些專有名詞不符合當地習慣。比如「儲存檔案」日文不能直翻，要用「保存」更自然。我預計花 3 天時間與當地的翻譯顧問重新對齊。
VP Joe: Great catch, Hana. Language detail is crucial. Please work with the native consultants and finalize the localization string files by next Wednesday.
Product Supporter Max: 我這邊主要是客戶支持（CS）。如果日韓客戶上線了，我們需要準備日文和韓文的常見問題解答（FAQ）網頁。我想能不能請當地的代理商協助，不然我們客服目前只有英文和中文能力。
VP Joe: Agree. Max, please draft a simple 20-question FAQ document by early next week, and Hana can coordinate with local consultants to translate it.
VP Joe: To recap: Ken prepares the server migration report by Friday; Hana updates the localization strings by next Wednesday; Max drafts the FAQ sheet by Monday. Talk to you all next week!`
  }
];
