import { Language } from './language';

export interface Audio {
  id: number;
  urlKey: string;
  transcript: string;
  englishTranslation: string;
  languageId: number;
  language: Language | null;
  uploadedAt: string;
}
