import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { SplineSceneBasic } from './components/ui/code.demo';
import { Learn } from './pages/Learn';
import { Achievements } from './components/Achievements';
import { Progress } from './components/Progress';
import { UserProfile } from './components/UserProfile';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <main className="pt-20 px-4">
            <div className="max-w-7xl mx-auto space-y-8">
              <SplineSceneBasic />
              
              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                <FeatureCard
                  title="AI-Powered Learning"
                  description="Personalized learning paths that adapt to your progress and learning style in real-time."
                />
                <FeatureCard
                  title="Gamified Experience"
                  description="Earn badges, compete on leaderboards, and enjoy story-based learning journeys."
                />
                <FeatureCard
                  title="Progress Analytics"
                  description="Comprehensive dashboard showing your learning progress and areas for improvement."
                />
              </div>
            </div>
          </main>
        } />
        <Route path="/learn" element={<Learn />} />
        <Route path="/achievements" element={
          <div className="pt-20 px-4 pb-8">
            <div className="max-w-7xl mx-auto">
              <Achievements />
            </div>
          </div>
        } />
        <Route path="/progress" element={
          <div className="pt-20 px-4 pb-8">
            <div className="max-w-7xl mx-auto">
              <Progress />
            </div>
          </div>
        } />
        <Route path="/profile" element={
          <div className="pt-20 px-4 pb-8">
            <div className="max-w-7xl mx-auto">
              <UserProfile />
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-black/[0.96] p-6 rounded-lg border border-gray-800 hover:border-blue-500 transition-colors">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export default App;