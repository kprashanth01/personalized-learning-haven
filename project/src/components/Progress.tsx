import React from 'react';
import { BarChart2, BookOpen, Clock, Target, Award, ArrowUp } from 'lucide-react';

export function Progress() {
  const courses = [
    {
      id: 1,
      title: "React Fundamentals",
      progress: 80,
      totalLessons: 12,
      completedLessons: 10,
      lastAccessed: "2 hours ago",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      progress: 45,
      totalLessons: 15,
      completedLessons: 7,
      lastAccessed: "1 day ago",
    },
    {
      id: 3,
      title: "TypeScript Essentials",
      progress: 30,
      totalLessons: 10,
      completedLessons: 3,
      lastAccessed: "3 days ago",
    },
  ];

  const stats = [
    { label: "Weekly Goal", value: "80%", icon: Target, trend: "+5%" },
    { label: "Study Time", value: "12h", icon: Clock, trend: "+2h" },
    { label: "Completed", value: "15", icon: Award, trend: "+3" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-black/[0.96] p-6 rounded-lg border border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <stat.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <ArrowUp className="w-4 h-4" />
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Progress */}
      <div className="bg-black/[0.96] rounded-lg border border-gray-800">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <BarChart2 className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold">Course Progress</h2>
          </div>
        </div>
        <div className="divide-y divide-gray-800">
          {courses.map((course) => (
            <div key={course.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{course.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                    <span>•</span>
                    <span>Last accessed {course.lastAccessed}</span>
                  </div>
                </div>
                <span className="text-lg font-semibold">{course.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}