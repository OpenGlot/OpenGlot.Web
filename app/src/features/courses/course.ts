import { Language } from '../languages/language';
import { Module } from '../modules/module';

export interface Course {
  id: number;
  title: string;
  languageId: number;
  language: Language | null;
  modules: Module[] | null;
}
