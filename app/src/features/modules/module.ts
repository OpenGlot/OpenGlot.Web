import { Course } from '../courses/course';
import { Lesson } from '../lessons/lesson';

export interface Module {
  id: number;
  title: string;
  courseId: number;
  course: Course | null;
  lessons: Lesson[] | null;
  progresses: null;
  ratings: null;
}
