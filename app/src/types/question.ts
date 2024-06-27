import { Lesson } from './lesson';
import { Audio } from './audio';
import { Image } from './image';
import { Option } from './option';

export interface Question {
  id: number;
  text: string;
  questionType: number;
  answer: string;
  lessonId: number;
  lesson: Lesson | null;
  audioId: number;
  audio: Audio | null;
  imageId: number;
  image: Image | null;
  options: Option[];
}
