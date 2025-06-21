
import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Droplet, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const FloodMap = ({ onLocationSelect }) => {
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef(null);

  // Mock flood data for different locations in Bangladesh
  const floodData = [
    {
      id: 1,
      name: 'Dhaka',
      coordinates: { x: 52, y: 35 },
      status: 'warning',
      waterLevel: 5.2,
      risk: 'Medium',
      population: '9.5M',
      trend: 'rising'
    },
    {
      id: 2,
      name: 'Chittagong',
      coordinates: { x: 68, y: 58 },
      status: 'normal',
      waterLevel: 2.1,
      risk: 'Low',
      population: '2.8M',
      trend: 'stable'
    },
    {
      id: 3,
      name: 'Sylhet',
      coordinates: { x: 68, y: 25 },
      status: 'flood',
      waterLevel: 8.7,
      risk: 'High',
      population: '0.5M',
      trend: 'rising'
    },
    {
      id: 4,
      name: 'Rangpur',
      coordinates: { x: 45, y: 20 },
      status: 'severe',
      waterLevel: 12.3,
      risk: 'Critical',
      population: '0.3M',
      trend: 'critical'
    },
    {
      id: 5,
      name: 'Barisal',
      coordinates: { x: 48, y: 65 },
      status: 'warning',
      waterLevel: 4.8,
      risk: 'Medium',
      population: '0.4M',
      trend: 'rising'
    },
    {
      id: 6,
      name: 'Rajshahi',
      coordinates: { x: 35, y: 30 },
      status: 'normal',
      waterLevel: 1.9,
      risk: 'Low',
      population: '0.8M',
      trend: 'stable'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'flood': return 'bg-orange-500';
      case 'severe': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'normal': return 'Normal';
      case 'warning': return 'Warning';
      case 'flood': return 'Flood';
      case 'severe': return 'Severe Flood';
      default: return 'Unknown';
    }
  };

  const handleMouseMove = (e) => {
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data updates
      console.log('Updating flood data...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-slate-900 rounded-2xl overflow-hidden">
      {/* Map Title */}
      <div className="absolute top-4 left-4 z-20">
        <h2 className="text-xl font-bold text-white mb-1">Bangladesh Flood Monitor</h2>
        <p className="text-sm text-slate-400">Real-time AI-powered flood prediction</p>
      </div>

      {/* Map Container */}
      <div 
        ref={mapRef}
        className="relative w-full h-full bg-gradient-to-br from-blue-950 to-slate-900 overflow-hidden cursor-crosshair"
        onMouseMove={handleMouseMove}
      >
        {/* Bangladesh Map Outline (Simplified) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M20,15 L25,12 L35,15 L45,12 L55,15 L65,18 L75,25 L78,35 L75,45 L70,55 L65,65 L60,75 L50,78 L40,75 L30,70 L25,60 L20,50 L18,40 L20,30 L20,15 Z"
            fill="rgba(59, 130, 246, 0.2)"
            stroke="rgba(59, 130, 246, 0.5)"
            strokeWidth="0.5"
          />
        </svg>

        {/* Rivers */}
        <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100">
          <path d="M30,10 Q35,20 40,30 Q45,40 50,50 Q55,60 60,70" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="1" fill="none" />
          <path d="M50,15 Q55,25 60,35 Q65,45 70,55" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="0.8" fill="none" />
          <path d="M25,40 Q35,45 45,50 Q55,55 65,60" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="0.8" fill="none" />
        </svg>

        {/* Location Markers */}
        {floodData.map((location) => (
          <div
            key={location.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-125 z-10 ${
              hoveredLocation?.id === location.id ? 'scale-125 z-20' : ''
            }`}
            style={{
              left: `${location.coordinates.x}%`,
              top: `${location.coordinates.y}%`,
            }}
            onMouseEnter={() => setHoveredLocation(location)}
            onMouseLeave={() => setHoveredLocation(null)}
            onClick={() => onLocationSelect(location)}
          >
            {/* Pulsing Ring */}
            <div className={`absolute inset-0 w-8 h-8 ${getStatusColor(location.status)} opacity-30 rounded-full animate-ping`}></div>
            
            {/* Main Marker */}
            <div className={`relative w-6 h-6 ${getStatusColor(location.status)} rounded-full shadow-lg flex items-center justify-center border-2 border-white`}>
              <Droplet className="w-3 h-3 text-white" />
            </div>

            {/* Location Label */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-white whitespace-nowrap">
              {location.name}
            </div>
          </div>
        ))}

        {/* Hover Tooltip */}
        {hoveredLocation && (
          <div
            className="absolute z-30 bg-slate-800/95 backdrop-blur-sm rounded-lg p-4 border border-slate-700 shadow-2xl pointer-events-none animate-fade-in"
            style={{
              left: mousePosition.x + 20,
              top: mousePosition.y - 50,
            }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <h3 className="font-semibold text-white">{hoveredLocation.name}</h3>
              <Badge 
                variant="outline" 
                className={`${getStatusColor(hoveredLocation.status)}/20 text-white border-${hoveredLocation.status === 'normal' ? 'green' : hoveredLocation.status === 'warning' ? 'yellow' : hoveredLocation.status === 'flood' ? 'orange' : 'red'}-500/30`}
              >
                {getStatusText(hoveredLocation.status)}
              </Badge>
            </div>
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Water Level:</span>
                <span className="text-white font-medium">{hoveredLocation.waterLevel}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Risk Level:</span>
                <span className={`font-medium ${
                  hoveredLocation.risk === 'Low' ? 'text-green-400' :
                  hoveredLocation.risk === 'Medium' ? 'text-yellow-400' :
                  hoveredLocation.risk === 'High' ? 'text-orange-400' : 'text-red-400'
                }`}>
                  {hoveredLocation.risk}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Population:</span>
                <span className="text-white font-medium">{hoveredLocation.population}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Trend:</span>
                <span className={`font-medium flex items-center space-x-1 ${
                  hoveredLocation.trend === 'stable' ? 'text-green-400' :
                  hoveredLocation.trend === 'rising' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {hoveredLocation.trend === 'rising' && <AlertTriangle className="w-3 h-3" />}
                  <span className="capitalize">{hoveredLocation.trend}</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-2 space-y-2">
        <button className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded text-white text-lg font-bold transition-colors">+</button>
        <button className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded text-white text-lg font-bold transition-colors">-</button>
      </div>
    </div>
  );
};

export default FloodMap;
