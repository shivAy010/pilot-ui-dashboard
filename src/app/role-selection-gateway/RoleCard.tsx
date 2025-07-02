import React from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { Role } from '../../types';
import * as LucideIcons from 'lucide-react';

interface RoleCardProps {
  role: Role;
  onSelect: (role: Role) => void;
  isSelected: boolean;
  isLoading: boolean;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, onSelect, isSelected, isLoading }) => {
  const getColorClasses = (color: string = 'primary') => {
    const colorMap = {
      primary: {
        bg: 'bg-primary/10',
        icon: 'text-primary',
        border: 'border-primary/20',
        hover: 'hover:border-primary/40',
        selected: 'border-primary ring-2 ring-primary/20'
      },
      secondary: {
        bg: 'bg-secondary/10',
        icon: 'text-secondary',
        border: 'border-secondary/20',
        hover: 'hover:border-secondary/40',
        selected: 'border-secondary ring-2 ring-secondary/20'
      },
      accent: {
        bg: 'bg-accent/10',
        icon: 'text-accent',
        border: 'border-accent/20',
        hover: 'hover:border-accent/40',
        selected: 'border-accent ring-2 ring-accent/20'
      },
      success: {
        bg: 'bg-green-50',
        icon: 'text-green-600',
        border: 'border-green-200',
        hover: 'hover:border-green-300',
        selected: 'border-green-500 ring-2 ring-green-200'
      },
      warning: {
        bg: 'bg-yellow-50',
        icon: 'text-yellow-600',
        border: 'border-yellow-200',
        hover: 'hover:border-yellow-300',
        selected: 'border-yellow-500 ring-2 ring-yellow-200'
      },
      destructive: {
        bg: 'bg-red-50',
        icon: 'text-red-600',
        border: 'border-red-200',
        hover: 'hover:border-red-300',
        selected: 'border-red-500 ring-2 ring-red-200'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  const colors = getColorClasses(role.color || 'primary');

  return (
    <div
      className={`
        relative bg-card border-2 rounded-xl p-6 transition-all duration-300 cursor-pointer
        ${isSelected ? colors.selected : `${colors.border} ${colors.hover}`}
        ${isLoading ? 'scale-105 shadow-lg' : 'hover:shadow-md hover:transform hover:scale-[1.02]'}
      `}
      onClick={() => !isLoading && onSelect(role)}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-foreground">Configuring dashboard...</span>
          </div>
        </div>
      )}

      {/* Role Icon */}
      <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
        <Icon name={role.icon as keyof typeof LucideIcons || 'User'} size={28} className={colors.icon} />
      </div>

      {/* Role Title */}
      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
        {role.title}
      </h3>

      {/* Role Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
        {role.description}
      </p>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 bg-muted/50 rounded-lg">
          <div className="text-lg font-bold text-foreground">{role.pendingTasks}</div>
          <div className="text-xs text-muted-foreground">Pending Tasks</div>
        </div>
        <div className="text-center p-2 bg-muted/50 rounded-lg">
          <div className="text-lg font-bold text-foreground">{role.activeProjects}</div>
          <div className="text-xs text-muted-foreground">Active Projects</div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-muted-foreground">System Ready</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Activity" size={12} className="text-green-500" />
          <span className="text-xs text-green-600 font-medium">Online</span>
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant={isSelected ? 'primary' : 'outline'}
        size="sm"
        fullWidth
        iconName={isSelected ? 'Check' : 'ArrowRight'}
        disabled={isLoading}
      >
        {isSelected ? 'Selected' : 'Select Role'}
      </Button>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2">
          <div className={`w-6 h-6 ${colors.bg} rounded-full flex items-center justify-center border-2 border-background`}>
            <Icon name="Check" size={14} className={colors.icon} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleCard;