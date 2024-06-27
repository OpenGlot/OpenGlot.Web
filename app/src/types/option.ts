import { Audio } from './audio';
import { Image } from './image';
import { Question } from './question';

export interface Option {
  id: number;
  text: string;
  audioId: number;
  audio: Audio | null;
  imageId: number;
  image: Image | null;
  questionId: number;
  question: Question | null;
}
