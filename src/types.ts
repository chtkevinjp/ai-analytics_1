export type SummaryTemplate = "all-in-one" | "bullet" | "action" | "analysis";

export type TranslateLanguage = "none" | "zh-tw" | "en" | "ja" | "ko" | "es" | "fr";

export type OutputTone = "professional" | "concise" | "friendly";

export interface MeetingConfig {
  template: SummaryTemplate;
  translateLanguage: TranslateLanguage;
  tone: OutputTone;
}

export interface ExampleTranscript {
  title: string;
  description: string;
  content: string;
}
