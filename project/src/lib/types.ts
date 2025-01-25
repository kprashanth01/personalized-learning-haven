export interface Topic {
  id: string;
  title: string;
  description: string;
  weekNumber: number;
  completed: boolean;
  quiz: Quiz;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  completed: boolean;
  score?: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface UserProgress {
  currentWeek: number;
  completedTopics: string[];
  quizScores: Record<string, number>;
  totalXP: number;
  streakDays: number;
  lastStudyDate: string;
}

export interface Achievement {
  id: number;
  icon: any;
  title: string;
  description: string;
  progress: number;
  completed: boolean;
  xp: number;
}

export interface RoadmapData {
  title: string;
  description: string;
  topics: Topic[];
  totalWeeks: number;
  prerequisites: string[];
  nodes?: RoadmapNode[];
}

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  status: 'locked' | 'current' | 'completed';
  type: 'milestone' | 'concept' | 'project';
}