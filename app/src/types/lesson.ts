import { Module } from './module';
import { Question } from './question';

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

export enum ContentType {
  Video = 'Video',
  Text = 'Text',
  Audio = 'Audio',
}
