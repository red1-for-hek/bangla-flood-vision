
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Satellite, RefreshCw, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LiveView = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Bangladesh districts with their flood status and coordinates
  const bangladeshDistricts = [
    // Dhaka Division
    { name: 'Dhaka', status: 'normal', coordinates: { x: 52, y: 35 }, division: 'Dhaka' },
    { name: 'Faridpur', status: 'normal', coordinates: { x: 48, y: 42 }, division: 'Dhaka' },
    { name: 'Gazipur', status: 'normal', coordinates: { x: 54, y: 32 }, division: 'Dhaka' },
    { name: 'Gopalganj', status: 'warning', coordinates: { x: 46, y: 45 }, division: 'Dhaka' },
    { name: 'Kishoreganj', status: 'flood', coordinates: { x: 58, y: 30 }, division: 'Dhaka' },
    { name: 'Madaripur', status: 'normal', coordinates: { x: 48, y: 40 }, division: 'Dhaka' },
    { name: 'Manikganj', status: 'normal', coordinates: { x: 50, y: 38 }, division: 'Dhaka' },
    { name: 'Munshiganj', status: 'normal', coordinates: { x: 52, y: 38 }, division: 'Dhaka' },
    { name: 'Narayanganj', status: 'normal', coordinates: { x: 54, y: 36 }, division: 'Dhaka' },
    { name: 'Narsingdi', status: 'normal', coordinates: { x: 56, y: 34 }, division: 'Dhaka' },
    { name: 'Rajbari', status: 'warning', coordinates: { x: 46, y: 40 }, division: 'Dhaka' },
    { name: 'Shariatpur', status: 'normal', coordinates: { x: 50, y: 42 }, division: 'Dhaka' },
    { name: 'Tangail', status: 'normal', coordinates: { x: 50, y: 32 }, division: 'Dhaka' },

    // Chittagong Division
    { name: 'Chittagong', status: 'warning', coordinates: { x: 68, y: 58 }, division: 'Chittagong' },
    { name: 'Bandarban', status: 'no-data', coordinates: { x: 65, y: 68 }, division: 'Chittagong' },
    { name: 'Brahmanbaria', status: 'flood', coordinates: { x: 62, y: 40 }, division: 'Chittagong' },
    { name: 'Chandpur', status: 'warning', coordinates: { x: 58, y: 42 }, division: 'Chittagong' },
    { name: 'Comilla', status: 'normal', coordinates: { x: 60, y: 44 }, division: 'Chittagong' },
    { name: 'Coxs Bazar', status: 'warning', coordinates: { x: 68, y: 72 }, division: 'Chittagong' },
    { name: 'Feni', status: 'warning', coordinates: { x: 64, y: 50 }, division: 'Chittagong' },
    { name: 'Khagrachhari', status: 'no-data', coordinates: { x: 66, y: 62 }, division: 'Chittagong' },
    { name: 'Lakshmipur', status: 'flood', coordinates: { x: 62, y: 48 }, division: 'Chittagong' },
    { name: 'Noakhali', status: 'warning', coordinates: { x: 64, y: 46 }, division: 'Chittagong' },
    { name: 'Rangamati', status: 'no-data', coordinates: { x: 64, y: 60 }, division: 'Chittagong' },

    // Sylhet Division
    { name: 'Sylhet', status: 'flood', coordinates: { x: 68, y: 25 }, division: 'Sylhet' },
    { name: 'Habiganj', status: 'flood', coordinates: { x: 64, y: 30 }, division: 'Sylhet' },
    { name: 'Moulvibazar', status: 'flood', coordinates: { x: 66, y: 32 }, division: 'Sylhet' },
    { name: 'Sunamganj', status: 'flood', coordinates: { x: 66, y: 28 }, division: 'Sylhet' },

    // Rangpur Division
    { name: 'Rangpur', status: 'severe', coordinates: { x: 45, y: 20 }, division: 'Rangpur' },
    { name: 'Dinajpur', status: 'warning', coordinates: { x: 42, y: 18 }, division: 'Rangpur' },
    { name: 'Gaibandha', status: 'warning', coordinates: { x: 47, y: 22 }, division: 'Rangpur' },
    { name: 'Kurigram', status: 'severe', coordinates: { x: 48, y: 18 }, division: 'Rangpur' },
    { name: 'Lalmonirhat', status: 'severe', coordinates: { x: 46, y: 16 }, division: 'Rangpur' },
    { name: 'Nilphamari', status: 'warning', coordinates: { x: 44, y: 16 }, division: 'Rangpur' },
    { name: 'Panchagarh', status: 'normal', coordinates: { x: 42, y: 14 }, division: 'Rangpur' },
    { name: 'Thakurgaon', status: 'normal', coordinates: { x: 40, y: 16 }, division: 'Rangpur' },

    // Rajshahi Division
    { name: 'Rajshahi', status: 'normal', coordinates: { x: 35, y: 30 }, division: 'Rajshahi' },
    { name: 'Bogra', status: 'normal', coordinates: { x: 42, y: 28 }, division: 'Rajshahi' },
    { name: 'Joypurhat', status: 'normal', coordinates: { x: 40, y: 26 }, division: 'Rajshahi' },
    { name: 'Naogaon', status: 'normal', coordinates: { x: 38, y: 28 }, division: 'Rajshahi' },
    { name: 'Natore', status: 'normal', coordinates: { x: 40, y: 32 }, division: 'Rajshahi' },
    { name: 'Chapainawabganj', status: 'normal', coordinates: { x: 32, y: 28 }, division: 'Rajshahi' },
    { name: 'Pabna', status: 'normal', coordinates: { x: 42, y: 34 }, division: 'Rajshahi' },
    { name: 'Sirajganj', status: 'warning', coordinates: { x: 44, y: 32 }, division: 'Rajshahi' },

    // Khulna Division
    { name: 'Khulna', status: 'warning', coordinates: { x: 40, y: 58 }, division: 'Khulna' },
    { name: 'Bagerhat', status: 'warning', coordinates: { x: 42, y: 60 }, division: 'Khulna' },
    { name: 'Chuadanga', status: 'normal', coordinates: { x: 32, y: 46 }, division: 'Khulna' },
    { name: 'Jessore', status: 'normal', coordinates: { x: 36, y: 48 }, division: 'Khulna' },
    { name: 'Jhenaidah', status: 'normal', coordinates: { x: 36, y: 44 }, division: 'Khulna' },
    { name: 'Kushtia', status: 'normal', coordinates: { x: 38, y: 40 }, division: 'Khulna' },
    { name: 'Magura', status: 'normal', coordinates: { x: 40, y: 46 }, division: 'Khulna' },
    { name: 'Meherpur', status: 'normal', coordinates: { x: 34, y: 44 }, division: 'Khulna' },
    { name: 'Narail', status: 'warning', coordinates: { x: 42, y: 50 }, division: 'Khulna' },
    { name: 'Satkhira', status: 'warning', coordinates: { x: 38, y: 58 }, division: 'Khulna' },

    // Barisal Division
    { name: 'Barisal', status: 'warning', coordinates: { x: 48, y: 65 }, division: 'Barisal' },
    { name: 'Barguna', status: 'warning', coordinates: { x: 48, y: 68 }, division: 'Barisal' },
    { name: 'Bhola', status: 'warning', coordinates: { x: 52, y: 62 }, division: 'Barisal' },
    { name: 'Jhalokati', status: 'warning', coordinates: { x: 48, y: 60 }, division: 'Barisal' },
    { name: 'Patuakhali', status: 'warning', coordinates: { x: 50, y: 68 }, division: 'Barisal' },
    { name: 'Pirojpur', status: 'warning', coordinates: { x: 46, y: 62 }, division: 'Barisal' },

    // Mymensingh Division
    { name: 'Mymensingh', status: 'normal', coordinates: { x: 52, y: 28 }, division: 'Mymensingh' },
    { name: 'Jamalpur', status: 'warning', coordinates: { x: 48, y: 26 }, division: 'Mymensingh' },
    { name: 'Netrokona', status: 'flood', coordinates: { x: 56, y: 26 }, division: 'Mymensingh' },
    { name: 'Sherpur', status: 'normal', coordinates: { x: 50, y: 24 }, division: 'Mymensingh' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'flood': return '#f97316';
      case 'severe': return '#ef4444';
      case 'no-data': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const statusCounts = bangladeshDistricts.reduce((acc, district) => {
    acc[district.status] = (acc[district.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-slate-800/30 backdrop-blur-md border-b border-slate-700/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/')}
                  className="text-white hover:bg-slate-700/50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <h1 className="text-2xl font-bold text-white">Live View - Bangladesh</h1>
                </div>
              </div>
              <Button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Map Section */}
            <div className="xl:col-span-3">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 h-[calc(100vh-200px)]">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Satellite className="w-5 h-5 text-blue-400" />
                      <span>Bangladesh Flood Risk Map - All 64 Districts</span>
                    </div>
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                      Live Data
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-full">
                  <div className="relative w-full h-full bg-gradient-to-br from-blue-950 to-slate-900 rounded-b-2xl overflow-hidden">
                    {/* Bangladesh Map Container */}
                    <svg
                      className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      {/* Bangladesh Outline */}
                      <path
                        d="M20,15 L25,12 L35,15 L45,12 L55,15 L65,18 L75,25 L78,35 L75,45 L70,55 L65,65 L60,75 L50,78 L40,75 L30,70 L25,60 L20,50 L18,40 L20,30 L20,15 Z"
                        fill="rgba(30, 41, 59, 0.8)"
                        stroke="rgba(59, 130, 246, 0.5)"
                        strokeWidth="0.5"
                      />
                      
                      {/* Division Boundaries */}
                      <g stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.2" fill="none">
                        <path d="M30,25 L50,30 L65,25" />
                        <path d="M25,35 L45,40 L65,35" />
                        <path d="M20,45 L40,50 L60,45" />
                        <path d="M25,55 L45,60 L65,55" />
                      </g>

                      {/* District Markers */}
                      {bangladeshDistricts.map((district) => (
                        <g key={district.name}>
                          {/* District Area (colored based on status) */}
                          <circle
                            cx={district.coordinates.x}
                            cy={district.coordinates.y}
                            r="2.5"
                            fill={getStatusColor(district.status)}
                            fillOpacity="0.6"
                            stroke={getStatusColor(district.status)}
                            strokeWidth="0.3"
                            className="hover:opacity-100 transition-opacity cursor-pointer"
                          />
                          
                          {/* District Label */}
                          <text
                            x={district.coordinates.x}
                            y={district.coordinates.y + 4}
                            fontSize="1.5"
                            fill="white"
                            textAnchor="middle"
                            className="pointer-events-none"
                          >
                            {district.name}
                          </text>
                        </g>
                      ))}
                    </svg>

                    {/* Map Legend */}
                    <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3">
                      <h4 className="text-white font-medium mb-2 text-sm">Status Legend</h4>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-slate-300 text-xs">Normal ({statusCounts.normal || 0})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-slate-300 text-xs">Warning ({statusCounts.warning || 0})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-slate-300 text-xs">Flood ({statusCounts.flood || 0})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-slate-300 text-xs">Severe ({statusCounts.severe || 0})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                          <span className="text-slate-300 text-xs">No Data ({statusCounts['no-data'] || 0})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Panel */}
            <div className="xl:col-span-1 space-y-6">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Live Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                      <p className="text-2xl font-bold text-green-400">{statusCounts.normal || 0}</p>
                      <p className="text-xs text-slate-400">Normal</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                      <p className="text-2xl font-bold text-yellow-400">{statusCounts.warning || 0}</p>
                      <p className="text-xs text-slate-400">Warning</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                      <p className="text-2xl font-bold text-orange-400">{statusCounts.flood || 0}</p>
                      <p className="text-xs text-slate-400">Flood</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                      <p className="text-2xl font-bold text-red-400">{statusCounts.severe || 0}</p>
                      <p className="text-xs text-slate-400">Severe</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-600">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Total Districts:</span>
                      <span className="text-white font-medium">64</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">No Data:</span>
                      <span className="text-gray-400 font-medium">{statusCounts['no-data'] || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Last Update:</span>
                      <span className="text-white font-medium">Live</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LiveView;
