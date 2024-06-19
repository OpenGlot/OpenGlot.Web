import { Course } from './course';
import { Lesson } from './lesson';

export interface Module {
  id: number;
  title: string;
  courseId: number;
  course: Course | null;
  lessons: Lesson[] | null;
  progresses: null;
  ratings: null;
}
