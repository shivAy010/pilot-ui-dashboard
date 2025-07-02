import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import * as LucideIcons from 'lucide-react';

export interface AutomationTemplateType {
  id: number;
  name: string;
  category: string;
  description: string;
  icon: string;
  difficulty: string;
  setupTime: string;
  usageCount: number;
  rating: number;
  steps: string[];
}

interface AutomationTemplateProps {
  template: AutomationTemplateType;
  onUseTemplate: (template: AutomationTemplateType) => void;
  onViewTemplate: (template: AutomationTemplateType) => void;
}

const AutomationTemplate: React.FC<AutomationTemplateProps> = ({ template, onUseTemplate, onViewTemplate }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-success bg-success-50';
      case 'Intermediate':
        return 'text-warning bg-warning-50';
      case 'Advanced':
        return 'text-error bg-error-50';
      default:
        return 'text-text-muted bg-surface';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-brand-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Icon name={template.icon as keyof typeof LucideIcons} size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{template.name}</h3>
            <p className="text-sm text-text-muted">{template.category}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
          {template.difficulty}
        </span>
      </div>

      <p className="text-sm text-text-secondary mb-4 line-clamp-2">
        {template.description}
      </p>

      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Workflow" size={16} className="text-text-muted" />
          <span className="text-sm font-medium text-text-primary">Workflow Steps:</span>
        </div>
        <div className="space-y-2">
          {template.steps.slice(0, 3).map((step, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
              <div className="w-5 h-5 bg-primary-100 text-primary rounded-full flex items-center justify-center text-xs font-medium">
                {index + 1}
              </div>
              <span>{step}</span>
            </div>
          ))}
          {template.steps.length > 3 && (
            <div className="text-xs text-text-muted ml-7">
              +{template.steps.length - 3} more steps
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} className="text-text-muted" />
            <span className="text-sm text-text-muted">{template.setupTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={16} className="text-text-muted" />
            <span className="text-sm text-text-muted">{template.usageCount} uses</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Star" size={16} className="text-warning fill-current" />
          <span className="text-sm font-medium text-text-primary">{template.rating}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="primary"
          size="sm"
          iconName="Play"
          onClick={() => onUseTemplate(template)}
          className="flex-1"
        >
          Use Template
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Eye"
          onClick={() => onViewTemplate(template)}
        >
          Preview
        </Button>
      </div>
    </div>
  );
};

export default AutomationTemplate;