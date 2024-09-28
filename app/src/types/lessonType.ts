import { Module } from './module';

interface Option {
  id: string;
  text?: string;
  audio?: { urlKey: string };
  image?: { urlKey: string; description?: string };
}

interface Question {
  text: string;
  answer: string;
  options: Option[];
}

export interface LessonType {
  id: number;
  title: string;
  contentType: number;
  createAt: Date;
  moduleId: number;
  module: Module | null;
  questions: Question[];
  ratings: null;
}