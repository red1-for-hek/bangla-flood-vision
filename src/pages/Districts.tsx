
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Districts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const alertData = location.state?.alertData;

  if (!alertData) {
    navigate('/');
    return null;
  }

  const getStatusColor = (level) => {
    switch (level) {
      case 'Normal': return 'text-green-400 border-green-500/30 bg-green-500/20';
      case 'Warning': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/20';
      case 'Flood': return 'text-orange-400 border-orange-500/30 bg-orange-500/20';
      case 'Severe Flood': return 'text-red-400 border-red-500/30 bg-red-500/20';
      case 'No Data': return 'text-gray-400 border-gray-500/30 bg-gray-500/20';
      default: return 'text-gray-400 border-gray-500/30 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-slate-800/30 backdrop-blur-md border-b border-slate-700/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-white hover:bg-slate-700/50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className={getStatusColor(alertData.level)}>
                  {alertData.level}
                </Badge>
                <h1 className="text-2xl font-bold text-white">
                  {alertData.level} Alert Districts
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>Affected Districts ({alertData.count})</span>
                </div>
                <Badge variant="outline" className={getStatusColor(alertData.level)}>
                  {alertData.description}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {alertData.districts.map((district, index) => (
                  <div
                    key={district}
                    className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-colors animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => console.log(`Selected district: ${district}`)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 ${alertData.color} rounded-full`}></div>
                      <div>
                        <h3 className="text-white font-medium">{district}</h3>
                        <p className="text-slate-400 text-sm">{alertData.level}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-8 p-4 bg-slate-700/20 rounded-lg">
                <h3 className="text-white font-medium mb-2">Summary</h3>
                <p className="text-slate-300 text-sm mb-4">
                  {alertData.level === 'Severe Flood' 
                    ? `Critical flood conditions detected in ${alertData.count} districts. Immediate evacuation and emergency response recommended.`
                    : alertData.level === 'Flood'
                    ? `Active flooding reported in ${alertData.count} districts. Monitor conditions closely and prepare for potential evacuation.`
                    : alertData.level === 'Warning'
                    ? `Flood warning issued for ${alertData.count} districts. Residents should stay alert and prepare for potential flooding.`
                    : alertData.level === 'No Data'
                    ? `Prediction data unavailable for ${alertData.count} districts. Manual monitoring recommended.`
                    : `Normal conditions reported in ${alertData.count} districts. Continue routine monitoring.`
                  }
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Last Updated:</span>
                  <span className="text-white">{new Date().toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Districts;
