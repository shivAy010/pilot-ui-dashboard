import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { QuickActionStats, QuickActionAction } from '../../../types';
import * as LucideIcons from 'lucide-react';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: string;
  color?: string;
  actions?: QuickActionAction[];
  stats?: QuickActionStats | null;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ title, description, icon, color = 'primary', actions = [], stats = null }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-brand-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-${color}-50 flex items-center justify-center`}>
          <Icon name={icon as keyof typeof LucideIcons} size={24} className={`text-${color}`} />
        </div>
        {stats && (
          <div className="text-right">
            <div className="text-lg font-semibold text-text-primary">{stats.value}</div>
            <div className="text-xs text-text-muted">{stats.label}</div>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-text-primary mb-1">{title}</h3>
          <p className="text-sm text-text-secondary">{description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={index === 0 ? 'primary' : 'outline'}
              size="sm"
              iconName={action.icon}
              onClick={action.onClick}
              className="text-xs"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;