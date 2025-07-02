import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface InsightMetric {
  label: string;
  value: string;
}

export interface Insight {
  id: number;
  type: string;
  priority: string;
  category: string;
  title: string;
  description: string;
  timestamp: string;
  actionable: boolean;
  metrics: InsightMetric[];
  recommendations: string[];
}

interface InsightCardProps {
  insight: Insight;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-error bg-error-50 text-error';
      case 'medium':
        return 'border-warning bg-warning-50 text-warning';
      case 'low':
        return 'border-success bg-success-50 text-success';
      default:
        return 'border-border bg-surface text-text-secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trend':
        return 'TrendingUp';
      case 'anomaly':
        return 'AlertTriangle';
      case 'opportunity':
        return 'Target';
      case 'recommendation':
        return 'Lightbulb';
      default:
        return 'Info';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-brand-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getPriorityColor(insight.priority)}`}>
            <Icon name={getTypeIcon(insight.type)} size={20} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">{insight.title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(insight.priority)}`}>
                {insight.priority} Priority
              </span>
              <span className="text-xs text-text-muted">{insight.category}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" iconName="Bookmark">
            <span className="sr-only">Bookmark</span>
          </Button>
          <Button variant="ghost" size="sm" iconName="MoreHorizontal">
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        <p className="text-sm text-text-secondary leading-relaxed">
          {insight.description}
        </p>
        
        {insight.metrics && (
          <div className="grid grid-cols-2 gap-4 p-3 bg-surface rounded-lg">
            {insight.metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-semibold text-text-primary">{metric.value}</div>
                <div className="text-xs text-text-muted">{metric.label}</div>
              </div>
            ))}
          </div>
        )}
        
        {insight.recommendations && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-text-primary">Recommended Actions:</h4>
            <ul className="space-y-1">
              {insight.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                  <Icon name="ChevronRight" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-text-muted">
            <Icon name="Clock" size={12} />
            <span>Generated {insight.timestamp}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-xs">
              View Details
            </Button>
            {insight.actionable && (
              <Button variant="primary" size="sm" className="text-xs" iconName="ArrowRight">
                Take Action
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;