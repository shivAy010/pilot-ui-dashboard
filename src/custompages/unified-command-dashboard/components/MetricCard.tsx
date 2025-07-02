import React from 'react';
import Icon from '../../../components/AppIcon';
import * as LucideIcons from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | string;
  icon: string;
  color?: string;
  trend?: number[];
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeType, icon, color = 'primary', trend = [] }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-text-muted';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-brand-lg transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-${color}-50 flex items-center justify-center`}>
          <Icon name={icon as keyof typeof LucideIcons} size={24} className={`text-${color}`} />
        </div>
        {trend.length > 0 && (
          <div className="w-16 h-8">
            <svg width="64" height="32" viewBox="0 0 64 32" className="text-text-muted">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                points={trend.map((point, index) => `${(index / (trend.length - 1)) * 60 + 2},${30 - (point / Math.max(...trend)) * 26}`).join(' ')}
              />
            </svg>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-semibold text-text-primary">{value}</span>
          {change && (
            <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
              <Icon name={getChangeIcon()} size={16} />
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;