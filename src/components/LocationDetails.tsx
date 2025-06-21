
import React from 'react';
import { MapPin, Droplet, Users, TrendingUp, Calendar, Thermometer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const LocationDetails = ({ location }) => {
  if (!location) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-400 border-green-500/30 bg-green-500/20';
      case 'warning': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/20';
      case 'flood': return 'text-orange-400 border-orange-500/30 bg-orange-500/20';
      case 'severe': return 'text-red-400 border-red-500/30 bg-red-500/20';
      default: return 'text-gray-400 border-gray-500/30 bg-gray-500/20';
    }
  };

  const getRiskPercentage = (risk) => {
    switch (risk) {
      case 'Low': return 25;
      case 'Medium': return 55;
      case 'High': return 80;
      case 'Critical': return 95;
      default: return 0;
    }
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 animate-scale-in">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-blue-400" />
            <span>{location.name}</span>
          </div>
          <Badge variant="outline" className={getStatusColor(location.status)}>
            {location.status.charAt(0).toUpperCase() + location.status.slice(1)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Water Level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Droplet className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300 text-sm">Water Level</span>
            </div>
            <span className="text-white font-bold">{location.waterLevel}m</span>
          </div>
          <Progress 
            value={Math.min((location.waterLevel / 15) * 100, 100)} 
            className="h-2"
          />
          <p className="text-xs text-slate-400">Normal: 0-3m | Warning: 3-6m | Flood: 6m+</p>
        </div>

        {/* Risk Assessment */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              <span className="text-slate-300 text-sm">Risk Level</span>
            </div>
            <span className={`font-bold ${
              location.risk === 'Low' ? 'text-green-400' :
              location.risk === 'Medium' ? 'text-yellow-400' :
              location.risk === 'High' ? 'text-orange-400' : 'text-red-400'
            }`}>
              {location.risk}
            </span>
          </div>
          <Progress 
            value={getRiskPercentage(location.risk)} 
            className="h-2"
          />
        </div>

        {/* Population */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-slate-300 text-sm">Population at Risk</span>
          </div>
          <span className="text-white font-medium">{location.population}</span>
        </div>

        {/* Additional Data */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-600">
          <div className="text-center">
            <Thermometer className="w-4 h-4 text-red-400 mx-auto mb-1" />
            <p className="text-xs text-slate-400">Temperature</p>
            <p className="text-white font-medium">28°C</p>
          </div>
          <div className="text-center">
            <Calendar className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-slate-400">Rainfall</p>
            <p className="text-white font-medium">45mm</p>
          </div>
        </div>

        {/* Prediction */}
        <div className="bg-slate-700/30 rounded-lg p-3">
          <h4 className="text-white font-medium mb-2">AI Prediction</h4>
          <p className="text-slate-300 text-sm">
            {location.status === 'severe' 
              ? 'Critical flood conditions expected to persist for 48-72 hours. Immediate evacuation recommended.'
              : location.status === 'flood'
              ? 'Flood conditions may worsen in the next 24 hours. Monitor updates closely.'
              : location.status === 'warning'
              ? 'Water levels trending upward. Prepare for potential flooding.'
              : 'Conditions stable. Continue normal monitoring.'
            }
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-slate-400">Confidence:</span>
            <span className="text-green-400 text-xs font-medium">94%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationDetails;
