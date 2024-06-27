export interface User {
  userId: string;
  username: string;
  email: string;
  nativeLanguage?: string;
  targetLanguage?: string;
  targetLanguageLevel?: string;
  targetLanguage2?: string | null;
  targetLanguageLevel2?: string | null;
  targetLanguage3?: string | null;
  targetLanguageLevel3?: string | null;
  dateOfBirth?: string;
  timeZone?: string;
  userRole?: number;
  ratings?: null;
  progresses?: null;
  badges?: null;
  notifications?: null;
  flashcards?: null;
  userGeneratedContents?: null;
  subscription?: null;
}
