import { create } from 'zustand';
import { generateRoadmap } from './gemini';
import type { RoadmapData, UserProgress, Achievement } from './types';

interface RoadmapStore {
  roadmap: RoadmapData | null;
  userProgress: UserProgress;
  achievements: Achievement[];
  isLoading: boolean;
  error: string | null;
  setRoadmap: (topic: string) => Promise<void>;
  updateProgress: (topicId: string, completed: boolean) => void;
  updateQuizScore: (topicId: string, score: number) => void;
  calculateAchievements: () => void;
}

export const useRoadmapStore = create<RoadmapStore>((set, get) => ({
  roadmap: null,
  userProgress: {
    currentWeek: 1,
    completedTopics: [],
    quizScores: {},
    totalXP: 0,
    streakDays: 0,
    lastStudyDate: new Date().toISOString(),
  },
  achievements: [],
  isLoading: false,
  error: null,

  setRoadmap: async (topic: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await generateRoadmap(topic);
      
      // Create roadmap data with both content and nodes
      const roadmapData: RoadmapData = {
        title: topic,
        description: response.content,
        topics: [],
        totalWeeks: 0,
        prerequisites: [],
        nodes: response.nodes
      };
      
      set({ roadmap: roadmapData, isLoading: false });
      
      // Initialize achievements
      get().calculateAchievements();
    } catch (error) {
      set({ error: 'Failed to generate roadmap', isLoading: false });
    }
  },

  updateProgress: (topicId: string, completed: boolean) => {
    set((state) => {
      const newProgress = { ...state.userProgress };
      
      if (completed && !newProgress.completedTopics.includes(topicId)) {
        newProgress.completedTopics.push(topicId);
        newProgress.totalXP += 50; // Base XP for completing a topic
      }

      // Update streak
      const today = new Date().toISOString().split('T')[0];
      if (today !== newProgress.lastStudyDate.split('T')[0]) {
        newProgress.streakDays += 1;
        newProgress.lastStudyDate = new Date().toISOString();
      }

      return {
        userProgress: newProgress
      };
    });
    
    get().calculateAchievements();
  },

  updateQuizScore: (topicId: string, score: number) => {
    set((state) => {
      const newProgress = { ...state.userProgress };
      newProgress.quizScores[topicId] = score;
      
      // Award XP based on quiz score
      const xpGained = Math.floor(score * 10); // 100% = 100 XP
      newProgress.totalXP += xpGained;

      return {
        userProgress: newProgress
      };
    });
    
    get().calculateAchievements();
  },

  calculateAchievements: () => {
    set((state) => {
      const { userProgress } = state;

      const achievements = [
        {
          id: 1,
          icon: 'Star',
          title: 'First Steps',
          description: 'Complete your first topic',
          progress: userProgress.completedTopics.length > 0 ? 100 : 0,
          completed: userProgress.completedTopics.length > 0,
          xp: 50
        },
        {
          id: 2,
          icon: 'Target',
          title: 'Streak Master',
          description: 'Maintain a 7-day learning streak',
          progress: (userProgress.streakDays / 7) * 100,
          completed: userProgress.streakDays >= 7,
          xp: 100
        },
        {
          id: 3,
          icon: 'Brain',
          title: 'Quiz Champion',
          description: 'Score 90% or higher on 5 quizzes',
          progress: calculateQuizProgress(userProgress.quizScores),
          completed: Object.values(userProgress.quizScores).filter(score => score >= 90).length >= 5,
          xp: 250
        },
      ];

      return { achievements };
    });
  }
}));

function calculateQuizProgress(quizScores: Record<string, number>): number {
  const highScores = Object.values(quizScores).filter(score => score >= 90).length;
  return Math.min((highScores / 5) * 100, 100);
}