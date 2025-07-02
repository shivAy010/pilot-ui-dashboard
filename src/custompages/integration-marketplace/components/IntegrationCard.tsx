import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

export interface Integration {
  id: number;
  name: string;
  category: string;
  description: string;
  logo: string;
  status: string;
  rating: number;
  reviews: number;
  installs: string;
  complexity: string;
  isPopular: boolean;
  lastSync?: string;
  syncFrequency?: string;
}

interface IntegrationCardProps {
  integration: Integration;
  onConnect: (integration: Integration) => void;
  onViewDetails: (integration: Integration) => void;
  onConfigure: (integration: Integration) => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration, onConnect, onViewDetails, onConfigure }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-success bg-success-50 border-success-200';
      case 'disconnected':
        return 'text-error bg-error-50 border-error-200';
      case 'pending':
        return 'text-warning bg-warning-50 border-warning-200';
      default:
        return 'text-text-muted bg-surface border-border';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Easy':
        return 'text-success bg-success-50';
      case 'Medium':
        return 'text-warning bg-warning-50';
      case 'Advanced':
        return 'text-error bg-error-50';
      default:
        return 'text-text-muted bg-surface';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-brand-lg transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface flex items-center justify-center">
            <Image 
              src={integration.logo} 
              alt={`${integration.name} logo`}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
              {integration.name}
            </h3>
            <p className="text-sm text-text-muted">{integration.category}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(integration.status)}`}>
            {integration.status}
          </span>
          {integration.isPopular && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-accent-50 text-accent border border-accent-200">
              Popular
            </span>
          )}
        </div>
      </div>

      <p className="text-sm text-text-secondary mb-4 line-clamp-2">
        {integration.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={16} className="text-warning fill-current" />
            <span className="text-sm font-medium text-text-primary">{integration.rating}</span>
            <span className="text-xs text-text-muted">({integration.reviews})</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Download" size={16} className="text-text-muted" />
            <span className="text-sm text-text-muted">{integration.installs}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getComplexityColor(integration.complexity)}`}>
          {integration.complexity}
        </span>
      </div>

      {integration.status === 'connected' && (
        <div className="mb-4 p-3 bg-success-50 border border-success-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Connected</span>
            </div>
            <div className="text-xs text-text-muted">
              Last sync: {integration.lastSync}
            </div>
          </div>
          {integration.syncFrequency && (
            <div className="mt-2 text-xs text-text-secondary">
              Sync frequency: {integration.syncFrequency}
            </div>
          )}
        </div>
      )}

      <div className="flex items-center space-x-2">
        {integration.status === 'connected' ? (
          <>
            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
              onClick={() => onConfigure(integration)}
              className="flex-1"
            >
              Configure
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Eye"
              onClick={() => onViewDetails(integration)}
            >
              Details
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="primary"
              size="sm"
              iconName="Plus"
              onClick={() => onConnect(integration)}
              className="flex-1"
            >
              Connect
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Eye"
              onClick={() => onViewDetails(integration)}
            >
              Details
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default IntegrationCard;