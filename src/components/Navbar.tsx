'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, TrendingUp, RefreshCw } from 'lucide-react';

interface NavbarProps {
  onRefresh: () => void;
  isLoading: boolean;
}

export default function Navbar({ onRefresh, isLoading }: NavbarProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Portfolio Tracker</h1>
              <p className="text-gray-400 text-sm">Real-time crypto & stocks</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Refresh Button */}
            <motion.button
              onClick={onRefresh}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw 
                className={`text-white ${isLoading ? 'animate-spin' : ''}`} 
                size={20} 
              />
            </motion.button>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={() => setIsDark(!isDark)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isDark ? (
                <Sun className="text-yellow-400" size={20} />
              ) : (
                <Moon className="text-blue-400" size={20} />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
