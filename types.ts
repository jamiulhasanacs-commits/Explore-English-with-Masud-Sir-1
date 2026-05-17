
export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  isFree: boolean;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  duration: string;
  modules: Module[];
  enrolledStudents: number;
  category: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'audio' | 'quiz';
  contentUrl: string;
  duration?: string;
  isLocked: boolean;
  isCompleted?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}
