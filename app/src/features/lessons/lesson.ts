import { Module } from '../modules/module';

export interface Lesson {
  id: number;
  title: string;
  contentType: number;
  createAt: Date;
  moduleId: number;
  module: Module | null;
  questions: null;
  ratings: null;
}
