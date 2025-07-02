import React from 'react';
import Icon from '../../../components/AppIcon';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export interface HealthData {
  id: number;
  name: string;
  uptime: number;
  lastCheck: string;
  responseTime: number;
}

export interface UptimeData {
  time: string;
  uptime: number;
}

interface ConnectionHealthProps {
  healthData: HealthData[];
  uptimeData: UptimeData[];
}

const ConnectionHealth: React.FC<ConnectionHealthProps> = ({ healthData, uptimeData }) => {
  const getHealthStatus = (uptime: number) => {
    if (uptime >= 99) return { color: 'text-success', bg: 'bg-success-50', status: 'Excellent' };
    if (uptime >= 95) return { color: 'text-warning', bg: 'bg-warning-50', status: 'Good' };
    return { color: 'text-error', bg: 'bg-error-50', status: 'Needs Attention' };
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Connection Health</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></div>
          <span className="text-sm text-text-muted">Live Monitoring</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {healthData.map((integration) => {
          const health = getHealthStatus(integration.uptime);
          return (
            <div key={integration.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-primary">{integration.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${health.bg} ${health.color}`}>
                  {health.status}
                </span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Activity" size={16} className="text-text-muted" />
                <span className="text-lg font-semibold text-text-primary">{integration.uptime}%</span>
                <span className="text-sm text-text-muted">uptime</span>
              </div>
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span>Last check: {integration.lastCheck}</span>
                <span>{integration.responseTime}ms</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-6">
        <h4 className="text-md font-semibold text-text-primary mb-4">24-Hour Uptime Trend</h4>
        <div className="w-full h-64" aria-label="24-Hour Uptime Trend Chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={uptimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748B"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
                domain={[90, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="uptime" 
                stroke="#0EA5E9" 
                strokeWidth={2}
                dot={{ fill: '#0EA5E9', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#0EA5E9' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-surface rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-text-primary">Active Connections</span>
          </div>
          <span className="text-2xl font-bold text-success">24</span>
          <p className="text-xs text-text-muted mt-1">All systems operational</p>
        </div>
        <div className="p-4 bg-surface rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-text-primary">Issues Detected</span>
          </div>
          <span className="text-2xl font-bold text-warning">2</span>
          <p className="text-xs text-text-muted mt-1">Minor performance issues</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectionHealth;