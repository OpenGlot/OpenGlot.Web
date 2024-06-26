import { Module } from '../modules/module';
import { Question } from '../questions/question';

export interface Lesson {
  id: number;
  title: string;
  contentType: number;
  createAt: Date;
  moduleId: number;
  module: Module | null;
  questions: Question[] | null;
  ratings: null;
}
