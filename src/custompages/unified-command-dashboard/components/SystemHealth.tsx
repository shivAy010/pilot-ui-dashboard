import React from 'react';
import Icon from '../../../components/AppIcon';
import * as LucideIcons from 'lucide-react';

interface System {
  name: string;
  description: string;
  lastCheck: string;
  uptime: number;
  status: string;
  responseTime: number;
}

interface SystemHealthProps {
  systems: System[];
}

const SystemHealth: React.FC<SystemHealthProps> = ({ systems = [] }) => {
  const getHealthColor = (status: string) => {
    const colorMap: Record<string, string> = {
      healthy: 'text-success bg-success-50 border-success-200',
      warning: 'text-warning bg-warning-50 border-warning-200',
      critical: 'text-error bg-error-50 border-error-200',
      maintenance: 'text-info bg-info-50 border-info-200'
    };
    return colorMap[status] || 'text-text-muted bg-surface border-border';
  };

  const getHealthIcon = (status: string) => {
    const iconMap: Record<string, string> = {
      healthy: 'HeartPulse',
      warning: 'AlertTriangle',
      critical: 'AlertOctagon',
      maintenance: 'Settings'
    };
    return iconMap[status] || 'Circle';
  };

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99.5) return 'text-success';
    if (uptime >= 98) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">System Health</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></div>
            <span className="text-sm text-text-muted">All Systems Operational</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {systems.map((system, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-brand transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getHealthColor(system.status)}`}>
                  <Icon name={getHealthIcon(system.status) as keyof typeof LucideIcons} size={18} />
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">{system.name}</h4>
                  <p className="text-xs text-text-muted">{system.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-text-secondary">Last check: {system.lastCheck}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`text-sm font-semibold ${getUptimeColor(system.uptime)}`}>
                    {system.uptime}%
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getHealthColor(system.status)}`}>
                    {system.status}
                  </span>
                </div>
                <div className="text-xs text-text-muted">
                  Response: {system.responseTime}ms
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-surface rounded-lg">
            <div className="text-2xl font-semibold text-success mb-1">99.8%</div>
            <div className="text-sm text-text-muted">Overall Uptime</div>
            <div className="text-xs text-text-secondary mt-1">Last 30 days</div>
          </div>
          <div className="text-center p-4 bg-surface rounded-lg">
            <div className="text-2xl font-semibold text-primary mb-1">142ms</div>
            <div className="text-sm text-text-muted">Avg Response</div>
            <div className="text-xs text-text-secondary mt-1">All endpoints</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;