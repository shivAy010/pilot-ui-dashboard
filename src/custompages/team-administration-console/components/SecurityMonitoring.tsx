import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface LoginPattern {
  id: string | number;
  user: string;
  email: string;
  loginCount: number;
  locations: number;
  devices: number;
  lastLogin: string;
  riskLevel: 'low' | 'medium' | 'high' | string;
}

interface SecurityActivity {
  id: string | number;
  title: string;
  severity: 'critical' | 'warning' | 'info' | 'success' | string;
  status: 'resolved' | 'investigating' | 'open' | string;
  description: string;
  timestamp: string;
  user?: string;
  location?: string;
}

interface SecurityData {
  activeSessions: number;
  failedLogins: number;
  securityAlerts: number;
  complianceScore: number;
  activityLog: SecurityActivity[];
  loginPatterns: LoginPattern[];
}

interface SecurityMonitoringProps {
  securityData: SecurityData;
  onViewDetails: (activityId: string | number) => void;
  onTakeAction: (activityId: string | number) => void;
}

const SecurityMonitoring: React.FC<SecurityMonitoringProps> = ({ securityData, onViewDetails, onTakeAction }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('24h');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const timeframes = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const categories = [
    { value: 'all', label: 'All Activities' },
    { value: 'login', label: 'Login Attempts' },
    { value: 'permission', label: 'Permission Changes' },
    { value: 'suspicious', label: 'Suspicious Activity' },
    { value: 'failed', label: 'Failed Actions' }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      case 'success':
        return 'CheckCircle';
      default:
        return 'Bell';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'text-error bg-error-50 border-error-200';
      case 'warning':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'info':
        return 'text-primary bg-primary-50 border-primary-200';
      case 'success':
        return 'text-success bg-success-50 border-success-200';
      default:
        return 'text-text-secondary bg-surface border-border';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-success-100 text-success-700 border-success-200';
      case 'investigating':
        return 'bg-warning-100 text-warning-700 border-warning-200';
      case 'open':
        return 'bg-error-100 text-error-700 border-error-200';
      default:
        return 'bg-secondary-100 text-secondary-700 border-secondary-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Active Sessions</p>
              <p className="text-2xl font-semibold text-text-primary">{securityData.activeSessions}</p>
            </div>
            <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-success" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <Icon name="TrendingUp" size={14} className="text-success mr-1" />
            <span className="text-success">+5.2%</span>
            <span className="text-text-muted ml-1">from yesterday</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Failed Logins</p>
              <p className="text-2xl font-semibold text-text-primary">{securityData.failedLogins}</p>
            </div>
            <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
              <Icon name="ShieldAlert" size={20} className="text-warning" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <Icon name="TrendingDown" size={14} className="text-success mr-1" />
            <span className="text-success">-12.3%</span>
            <span className="text-text-muted ml-1">from yesterday</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Security Alerts</p>
              <p className="text-2xl font-semibold text-text-primary">{securityData.securityAlerts}</p>
            </div>
            <div className="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-error" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <Icon name="TrendingUp" size={14} className="text-error mr-1" />
            <span className="text-error">+8.1%</span>
            <span className="text-text-muted ml-1">from yesterday</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Compliance Score</p>
              <p className="text-2xl font-semibold text-text-primary">{securityData.complianceScore}%</p>
            </div>
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-primary" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <Icon name="TrendingUp" size={14} className="text-success mr-1" />
            <span className="text-success">+2.1%</span>
            <span className="text-text-muted ml-1">from last week</span>
          </div>
        </div>
      </div>

      {/* Security Activity Log */}
      <div className="bg-card border border-border rounded-lg shadow-brand">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Activity" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-text-primary">Security Activity Log</h3>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-1 border border-border rounded-md bg-card text-text-primary text-sm"
              >
                {timeframes.map(timeframe => (
                  <option key={timeframe.value} value={timeframe.value}>
                    {timeframe.label}
                  </option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1 border border-border rounded-md bg-card text-text-primary text-sm"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
              >
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {securityData.activityLog.map((activity) => (
              <div
                key={activity.id}
                className={`p-4 rounded-lg border ${getAlertColor(activity.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Icon 
                      name={getAlertIcon(activity.severity)} 
                      size={20} 
                      className={activity.severity === 'critical' ? 'text-error' :
                                activity.severity === 'warning' ? 'text-warning' :
                                activity.severity === 'success' ? 'text-success' : 'text-primary'}
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-text-primary">{activity.title}</h4>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mt-1">{activity.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-text-muted">
                        <span className="flex items-center space-x-1">
                          <Icon name="User" size={12} />
                          <span>{activity.user}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} />
                          <span>{activity.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{activity.timestamp}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onViewDetails(activity.id)}
                      className="text-text-secondary hover:text-text-primary"
                    />
                    {activity.status === 'open' && (
                      <Button
                        variant="primary"
                        size="sm"
                        iconName="Shield"
                        onClick={() => onTakeAction(activity.id)}
                      >
                        Take Action
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Login Patterns */}
      <div className="bg-card border border-border rounded-lg shadow-brand">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="LogIn" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-text-primary">Recent Login Patterns</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="MoreHorizontal"
            />
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {securityData.loginPatterns.map((pattern) => (
              <div key={pattern.id} className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">{pattern.user}</div>
                    <div className="text-sm text-text-secondary">{pattern.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm text-text-muted">
                  <div className="text-center">
                    <div className="font-medium text-text-primary">{pattern.loginCount}</div>
                    <div>Logins</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-text-primary">{pattern.locations}</div>
                    <div>Locations</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-text-primary">{pattern.devices}</div>
                    <div>Devices</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-text-primary">{pattern.lastLogin}</div>
                    <div>Last Login</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    pattern.riskLevel === 'low' ? 'bg-success-100 text-success-700' :
                    pattern.riskLevel === 'medium'? 'bg-warning-100 text-warning-700' : 'bg-error-100 text-error-700'
                  }`}>
                    {pattern.riskLevel} risk
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MoreVertical"
                    className="text-text-secondary hover:text-text-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityMonitoring;