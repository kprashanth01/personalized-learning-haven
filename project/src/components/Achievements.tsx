import React from 'react';
import { Trophy, Star, Target, Zap, BookOpen, Code, Brain, Rocket } from 'lucide-react';

export function Achievements() {
  const achievements = [
    {
      id: 1,
      icon: Star,
      title: "First Steps",
      description: "Complete your first lesson",
      progress: 100,
      completed: true,
      xp: 50,
    },
    {
      id: 2,
      icon: Target,
      title: "Streak Master",
      description: "Maintain a 7-day learning streak",
      progress: 71,
      completed: false,
      xp: 100,
    },
    {
      id: 3,
      icon: Zap,
      title: "Quick Learner",
      description: "Complete 5 lessons in one day",
      progress: 60,
      completed: false,
      xp: 150,
    },
    {
      id: 4,
      icon: BookOpen,
      title: "Course Champion",
      description: "Complete an entire course",
      progress: 100,
      completed: true,
      xp: 200,
    },
    {
      id: 5,
      icon: Code,
      title: "Code Warrior",
      description: "Submit 10 coding challenges",
      progress: 40,
      completed: false,
      xp: 300,
    },
    {
      id: 6,
      icon: Brain,
      title: "Knowledge Seeker",
      description: "Complete quizzes with 90%+ accuracy",
      progress: 85,
      completed: false,
      xp: 250,
    },
    {
      id: 7,
      icon: Rocket,
      title: "Advanced Explorer",
      description: "Complete an advanced topic",
      progress: 20,
      completed: false,
      xp: 400,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="bg-black/[0.96] p-6 rounded-lg border border-gray-800">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Trophy className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Achievements</h2>
            <p className="text-gray-400">
              {achievements.filter(a => a.completed).length} of {achievements.length} unlocked
            </p>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`bg-black/[0.96] p-6 rounded-lg border ${
              achievement.completed ? 'border-blue-500/50' : 'border-gray-800'
            } transition-all hover:border-blue-500/50`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${
                achievement.completed ? 'bg-blue-500/20' : 'bg-gray-800'
              }`}>
                <achievement.icon className={`w-6 h-6 ${
                  achievement.completed ? 'text-blue-400' : 'text-gray-400'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{achievement.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-gray-400">{achievement.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        achievement.completed
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                          : 'bg-gray-600'
                      }`}
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">XP Reward</span>
                    <span className="text-sm font-semibold text-blue-400">+{achievement.xp} XP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}