// lesson.model.ts
export interface Exercise {
    exerciseId: number;
    question: string;
    options: string[];
    correctAnswer: string;
    content: string | null;
  }
  
  export interface Lesson {
    lessonId: number;
    title: string;
    language: string;
    difficultyLevel: string;
    exercises: Exercise[];
  }