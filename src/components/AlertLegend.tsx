
import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, XCircle, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const AlertLegend = () => {
  const navigate = useNavigate();

  const alertLevels = [
    {
      level: 'Normal',
      color: 'bg-green-500',
      icon: CheckCircle,
      description: 'No flood risk',
      count: 32,
      districts: ['Dhaka', 'Comilla', 'Narayanganj', 'Munshiganj', 'Manikganj', 'Gazipur', 'Narsingdi', 'Faridpur']
    },
    {
      level: 'Warning',
      color: 'bg-yellow-500',
      icon: AlertTriangle,
      description: 'Potential flood risk',
      count: 18,
      districts: ['Chittagong', 'Barisal', 'Patuakhali', 'Bhola', 'Jhalokati', 'Pirojpur', 'Barguna', 'Noakhali']
    },
    {
      level: 'Flood',
      color: 'bg-orange-500',
      icon: AlertCircle,
      description: 'Active flooding',
      count: 8,
      districts: ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj', 'Kishoreganj', 'Netrokona', 'Brahmanbaria', 'Lakshmipur']
    },
    {
      level: 'Severe Flood',
      color: 'bg-red-500',
      icon: XCircle,
      description: 'Critical flooding',
      count: 3,
      districts: ['Rangpur', 'Kurigram', 'Lalmonirhat']
    },
    {
      level: 'No Data',
      color: 'bg-gray-500',
      icon: HelpCircle,
      description: 'No prediction available',
      count: 3,
      districts: ['Bandarban', 'Khagrachhari', 'Rangamati']
    }
  ];

  const handleAlertClick = (alert) => {
    navigate('/districts', { state: { alertData: alert } });
  };

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
              className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleAlertClick(alert)}
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
            <span className="text-white font-medium">64</span>
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
