
import React, { useState, useEffect } from 'react';
import FloodMap from '../components/FloodMap';
import Header from '../components/Header';
import AlertLegend from '../components/AlertLegend';
import LocationDetails from '../components/LocationDetails';
import LoadingScreen from '../components/LoadingScreen';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Simulate loading time for the AI model initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 animate-fade-in">
        <Header />
        
        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
            {/* Map Section */}
            <div className="xl:col-span-3 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
              <FloodMap onLocationSelect={setSelectedLocation} />
            </div>

            {/* Side Panel */}
            <div className="xl:col-span-1 space-y-6">
              <AlertLegend />
              {selectedLocation && (
                <LocationDetails location={selectedLocation} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
