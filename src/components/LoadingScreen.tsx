
import React from 'react';
import { Waves, Cpu, Satellite } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo/Title */}
        <div className="mb-8 animate-scale-in">
          <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            FloodGuard AI
          </h1>
          <p className="text-xl text-slate-300">Advanced Flood Prediction System for Bangladesh</p>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center items-center space-x-8 mb-8">
          <div className="animate-bounce" style={{animationDelay: '0s'}}>
            <Satellite className="w-8 h-8 text-blue-400" />
          </div>
          <div className="animate-bounce" style={{animationDelay: '0.2s'}}>
            <Cpu className="w-8 h-8 text-cyan-400" />
          </div>
          <div className="animate-bounce" style={{animationDelay: '0.4s'}}>
            <Waves className="w-8 h-8 text-indigo-400" />
          </div>
        </div>

        {/* Loading Progress */}
        <div className="w-80 mx-auto">
          <div className="bg-slate-700/50 rounded-full h-2 mb-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-slate-400 text-sm">Initializing AI Models & Satellite Data...</p>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="text-center animate-fade-in" style={{animationDelay: '0.5s'}}>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Satellite className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-sm text-slate-300">NASA Earth Data</p>
          </div>
          <div className="text-center animate-fade-in" style={{animationDelay: '0.7s'}}>
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Cpu className="w-6 h-6 text-cyan-400" />
            </div>
            <p className="text-sm text-slate-300">ML/DL Processing</p>
          </div>
          <div className="text-center animate-fade-in" style={{animationDelay: '0.9s'}}>
            <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Waves className="w-6 h-6 text-indigo-400" />
            </div>
            <p className="text-sm text-slate-300">Real-time Analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
