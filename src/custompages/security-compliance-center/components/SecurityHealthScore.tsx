import React from 'react';
import Icon from '../../../components/AppIcon';
import * as LucideIcons from 'lucide-react';

interface SecurityMetric {
  label: string;
  value: string;
  status: 'success' | 'warning' | 'error' | string;
  icon: string;
  change: string;
}

const SecurityHealthScore: React.FC = () => {
  const healthScore = 94;
  const scoreColor = healthScore >= 90 ? 'text-success' : healthScore >= 70 ? 'text-warning' : 'text-error';
  const scoreRing = healthScore >= 90 ? 'stroke-success' : healthScore >= 70 ? 'stroke-warning' : 'stroke-error';

  const securityMetrics: SecurityMetric[] = [
    {
      label: "Active Threats",
      value: "0",
      status: "success",
      icon: "Shield",
      change: "-2 from yesterday"
    },
    {
      label: "Failed Logins",
      value: "3",
      status: "warning",
      icon: "AlertTriangle",
      change: "+1 from yesterday"
    },
    {
      label: "Vulnerabilities",
      value: "1",
      status: "warning",
      icon: "Bug",
      change: "Critical: 0, High: 1"
    },
    {
      label: "Compliance Score",
      value: "98%",
      status: "success",
      icon: "CheckCircle",
      change: "+2% this month"
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Security Health Overview</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></div>
          <span className="text-sm text-text-secondary">Real-time monitoring</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Score Circle */}
        <div className="flex flex-col items-center justify-center p-6">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-secondary-200"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - healthScore / 100)}`}
                className={scoreRing}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${scoreColor}`}>{healthScore}</span>
              <span className="text-sm text-text-secondary">Health Score</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-text-secondary">
              Excellent security posture
            </p>
            <p className="text-xs text-text-muted mt-1">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Security Metrics */}
        <div className="grid grid-cols-2 gap-4">
          {securityMetrics.map((metric, index) => (
            <div key={index} className="bg-surface rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon 
                  name={metric.icon as keyof typeof LucideIcons} 
                  size={20} 
                  className={`${
                    metric.status === 'success' ? 'text-success' : 
                    metric.status === 'warning' ? 'text-warning' : 'text-error'
                  }`}
                />
                <span className={`text-2xl font-bold ${
                  metric.status === 'success' ? 'text-success' : 
                  metric.status === 'warning' ? 'text-warning' : 'text-error'
                }`}>
                  {metric.value}
                </span>
              </div>
              <h3 className="text-sm font-medium text-text-primary mb-1">
                {metric.label}
              </h3>
              <p className="text-xs text-text-muted">
                {metric.change}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityHealthScore;