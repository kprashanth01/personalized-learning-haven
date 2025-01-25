import React from 'react';
import { User, Medal, Trophy, Target, Clock, BookOpen } from 'lucide-react';

export function UserProfile() {
  // This would normally come from your auth/user state management
  const user = {
    name: "John Doe",
    email: "john@example.com",
    joinedDate: "January 2024",
    level: 12,
    xp: 1250,
    nextLevelXp: 2000,
  };

  return (
    <div className="bg-black/[0.96] rounded-lg p-8 border border-gray-800">
      <div className="flex items-start gap-6">
        {/* Profile Image */}
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <User className="w-12 h-12 text-white" />
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
          <div className="flex items-center gap-2 mt-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Joined {user.joinedDate}</span>
          </div>

          {/* Level Progress */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Level {user.level}</span>
              <span className="text-sm text-gray-400">{user.xp}/{user.nextLevelXp} XP</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <StatCard icon={BookOpen} label="Courses Completed" value="8" />
        <StatCard icon={Target} label="Learning Streak" value="12 days" />
        <StatCard icon={Trophy} label="Achievements" value="15" />
        <StatCard icon={Medal} label="Total XP" value="1,250" />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
      <Icon className="w-6 h-6 text-blue-400 mb-2" />
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}