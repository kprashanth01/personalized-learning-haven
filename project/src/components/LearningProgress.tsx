import React from 'react';
import { Trophy, Target, Brain, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRoadmapStore } from '../lib/roadmap-store';

export function LearningProgress() {
  const { userProgress, achievements } = useRoadmapStore();

  return (
    <div className="bg-black/[0.96] rounded-lg p-6 border border-gray-800 space-y-6">
      {/* Overall Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Overall Progress</h3>
          <span className="text-blue-400 font-semibold">{userProgress.totalXP} XP</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(userProgress.completedTopics.length / 8) * 100}%` }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              />
            </div>
          </div>
          <span className="text-sm text-gray-400">
            {userProgress.completedTopics.length}/8 completed
          </span>
        </div>
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Trophy}
          label="Total XP"
          value={userProgress.totalXP.toString()}
          color="blue"
        />
        <StatCard
          icon={Target}
          label="Streak"
          value={`${userProgress.streakDays} days`}
          color="green"
        />
        <StatCard
          icon={Brain}
          label="Topics Done"
          value={userProgress.completedTopics.length.toString()}
          color="purple"
        />
        <StatCard
          icon={Zap}
          label="Avg. Score"
          value={`${calculateAverageScore(userProgress.quizScores)}%`}
          color="yellow"
        />
      </div>

      {/* Recent Achievements */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
        <div className="grid gap-4">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg border ${
                achievement.completed
                  ? 'bg-blue-500/10 border-blue-500/50'
                  : 'bg-gray-800/50 border-gray-700'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  achievement.completed ? 'bg-blue-500/20' : 'bg-gray-700'
                }`}>
                  {getAchievementIcon(achievement.icon, achievement.completed)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>{achievement.progress}%</span>
                      <span>{achievement.xp} XP</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${achievement.progress}%` }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: {
  icon: any;
  label: string;
  value: string;
  color: 'blue' | 'green' | 'purple' | 'yellow';
}) {
  const colors = {
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    purple: 'bg-purple-500/20 text-purple-400',
    yellow: 'bg-yellow-500/20 text-yellow-400',
  };

  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
      <div className={`w-10 h-10 ${colors[color]} rounded-lg flex items-center justify-center mb-2`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

function getAchievementIcon(iconName: string, completed: boolean) {
  const iconProps = {
    className: `w-5 h-5 ${completed ? 'text-blue-400' : 'text-gray-400'}`,
  };

  switch (iconName) {
    case 'Star':
      return <Trophy {...iconProps} />;
    case 'Target':
      return <Target {...iconProps} />;
    case 'Brain':
      return <Brain {...iconProps} />;
    default:
      return <Trophy {...iconProps} />;
  }
}

function calculateAverageScore(scores: Record<string, number>): number {
  const scoreValues = Object.values(scores);
  if (scoreValues.length === 0) return 0;
  const sum = scoreValues.reduce((acc, score) => acc + score, 0);
  return Math.round(sum / scoreValues.length);
}