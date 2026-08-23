export type Domain =
  | 'skeletal'
  | 'muscular'
  | 'nervous'
  | 'cardiovascular'
  | 'respiratory'
  | 'digestive'
  | 'endocrine'
  | 'immune'
  | 'urinary'
  | 'reproductive'
  | 'integumentary'
  | 'cell'
  | 'energy'
  | 'nutrition'
  | 'supplement'
  | 'injury'
  | 'exercise';

export type Level = 'Beginner' | 'Intermediate' | 'Advanced';
export type EvidenceGrade = 'Strong' | 'Moderate' | 'Limited' | 'Inconclusive';

export interface Section {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface Topic {
  id: string;
  title: string;
  subtitle?: string;
  domain: Domain;
  system: string;
  level: Level;
  tags: string[];
  summary: string;
  sections: Section[];
  facts: string[];
  related: string[];
  refs?: string[];
  evidence?: EvidenceGrade;
}

export interface MuscleTopic extends Topic {
  origin: string;
  insertion: string;
  nerve: string;
  actions: string[];
  'agonist synergists'?: string;
  exercises: { name: string; biomechanics: string }[];
}

export interface SupplementTopic extends Topic {
  whatItIs: string;
  mechanism: string;
  benefits: string[];
  researchUses: string[];
  timing: string;
  sideEffects: string[];
  interactions: string[];
  caution: string;
  marketingVsScience: string;
}

export interface SystemInfo {
  id: Domain;
  name: string;
  short: string;
  tagline: string;
  overview: string;
  stats: { label: string; value: string }[];
  color: string;
  icon: string;
  structures: string[];
}

export interface Region {
  id: string;
  name: string;
  blurb: string;
  topics: string[];
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  domain?: Domain;
  kind?: 'identification' | 'concept' | 'applied';
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  minutes: number;
  domains: Domain[];
  questions: QuizQuestion[];
}

export interface Lesson {
  id: string;
  title: string;
  minutes: number;
  topicId?: string;
  blocks: { heading: string; body: string; bullets?: string[] }[];
  checkpoint: { prompt: string; options: string[]; answer: number; explanation: string };
  xp: number;
}

export interface Course {
  id: string;
  title: string;
  level: Level;
  description: string;
  icon: string;
  lessons: Lesson[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  domain: Domain;
}

export interface TutorAnswer {
  question: string;
  simple: string;
  detailed: string;
  scientific: string;
  anatomy: string[];
  relatedTopics: string[];
  visual: string[];
  quiz: { prompt: string; options: string[]; answer: number; explanation: string };
  sources: string[];
}
