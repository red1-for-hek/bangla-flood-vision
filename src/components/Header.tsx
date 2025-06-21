
import React from 'react';
import { Shield, Activity, Satellite, Bell, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-slate-800/30 backdrop-blur-md border-b border-slate-700/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">FloodGuard AI</h1>
              <p className="text-sm text-slate-400">Advanced Flood Prediction System</p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-sm text-slate-300">AI Model Active</span>
              <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                Online
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Satellite className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">Satellite Feed</span>
              <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                Live
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-orange-400" />
              <Badge variant="outline" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                3 Alerts
              </Badge>
            </div>

            {/* Live View Button */}
            <Button 
              onClick={() => navigate('/live-view')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <Eye className="w-4 h-4 mr-2" />
              Live View
            </Button>
          </div>

          {/* Last Updated */}
          <div className="text-right">
            <p className="text-xs text-slate-400">Last Updated</p>
            <p className="text-sm text-slate-300">{new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
