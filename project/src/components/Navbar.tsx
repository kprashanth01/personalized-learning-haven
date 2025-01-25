import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, BarChart2, Trophy, BookOpen, User } from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-black/[0.96] text-white p-4 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="w-8 h-8" />
          <span className="text-xl font-bold">PLC</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavItem to="/learn" icon={<BookOpen className="w-5 h-5" />} text="Learn" active={location.pathname === '/learn'} />
          <NavItem to="/achievements" icon={<Trophy className="w-5 h-5" />} text="Achievements" active={location.pathname === '/achievements'} />
          <NavItem to="/progress" icon={<BarChart2 className="w-5 h-5" />} text="Progress" active={location.pathname === '/progress'} />
          <NavItem to="/profile" icon={<User className="w-5 h-5" />} text="Profile" active={location.pathname === '/profile'} />
        </div>

        <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity">
          Get Started
        </button>
      </div>
    </nav>
  );
}

function NavItem({ icon, text, to, active }: { icon: React.ReactNode; text: string; to: string; active: boolean }) {
  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-2 transition-colors ${
        active ? 'text-blue-400' : 'hover:text-blue-400'
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}