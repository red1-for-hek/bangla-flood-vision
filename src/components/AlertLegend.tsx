
import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AlertLegend = () => {
  const alertLevels = [
    {
      level: 'Normal',
      color: 'bg-green-500',
      icon: CheckCircle,
      description: 'No flood risk',
      count: 45
    },
    {
      level: 'Warning',
      color: 'bg-yellow-500',
      icon: AlertTriangle,
      description: 'Potential flood risk',
      count: 12
    },
    {
      level: 'Flood',
      color: 'bg-orange-500',
      icon: AlertCircle,
      description: 'Active flooding',
      count: 8
    },
    {
      level: 'Severe Flood',
      color: 'bg-red-500',
      icon: XCircle,
      description: 'Critical flooding',
      count: 3
    }
  ];

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-blue-400" />
          <span>Alert Levels</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alertLevels.map((alert, index) => {
          const IconComponent = alert.icon;
          return (
            <div 
              key={alert.level} 
              className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 ${alert.color} rounded-full flex items-center justify-center`}>
                  <IconComponent className="w-2.5 h-2.5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{alert.level}</p>
                  <p className="text-slate-400 text-xs">{alert.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">{alert.count}</p>
                <p className="text-slate-400 text-xs">areas</p>
              </div>
            </div>
          );
        })}
        
        <div className="pt-3 border-t border-slate-600">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Total Monitored Areas:</span>
            <span className="text-white font-medium">68</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-slate-400">Last AI Analysis:</span>
            <span className="text-white font-medium">2 min ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertLegend;
