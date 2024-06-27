import { Course } from './course';

export interface Language {
  id: number;
  name: string;
  description: string;
  courses: Course[] | null;
}
