import { Language } from './language';
import { Module } from './module';

export interface Course {
  id: number;
  title: string;
  description: string;
  languageId: number;
  language: Language | null;
  modules: Module[] | null;
}
