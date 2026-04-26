export type Language = 'en' | 'am';

export interface Lesson {
  id: string;
  titleEn: string;
  titleAm: string;
  contentEn: string;
  contentAm: string;
  diagrams?: string[];
  quiz?: QuizItem[];
}

export interface QuizItem {
  questionEn: string;
  questionAm: string;
  optionsEn: string[];
  optionsAm: string[];
  correctIndex: number;
  explanationEn: string;
  explanationAm: string;
}

export interface Module {
  id: string;
  week: string;
  titleEn: string;
  titleAm: string;
  descriptionEn: string;
  descriptionAm: string;
  lessons: Lesson[];
}

export interface Roadmap {
  modules: Module[];
}
