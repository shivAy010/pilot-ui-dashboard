import React from 'react';
import Icon from '../../../components/AppIcon';
import * as LucideIcons from 'lucide-react';

export interface Metric {
  id: number;
  title: string;
  category: string;
  value: string;
  unit: string;
  trend: number;
  progress: number;
  icon: string;
  iconBg: string;
  iconColor: string;
  progressColor: string;
}

interface MetricCardProps {
  metric: Metric;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const getTrendIcon = (trend: number) => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-success';
    if (trend < 0) return 'text-error';
    return 'text-text-muted';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-brand-lg transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${metric.iconBg}`}>
            <Icon name={metric.icon as keyof typeof LucideIcons} size={20} className={metric.iconColor} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-secondary">{metric.title}</h3>
            <p className="text-xs text-text-muted">{metric.category}</p>
          </div>
        </div>
        <button className="text-text-muted hover:text-text-primary transition-colors">
          <Icon name="MoreHorizontal" size={16} />
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-semibold text-text-primary">{metric.value}</span>
          <span className="text-sm text-text-muted">{metric.unit}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon 
            name={getTrendIcon(metric.trend)} 
            size={14} 
            className={getTrendColor(metric.trend)} 
          />
          <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
            {Math.abs(metric.trend)}%
          </span>
          <span className="text-xs text-text-muted">vs last period</span>
        </div>
        
        <div className="w-full bg-secondary-100 rounded-full h-1.5 mt-3">
          <div 
            className={`h-1.5 rounded-full ${metric.progressColor}`}
            style={{ width: `${metric.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;