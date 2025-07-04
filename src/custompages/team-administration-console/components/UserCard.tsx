import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { User } from '../../../types';

interface UserCardProps {
  user: User;
  onEdit: (userId: User['id']) => void;
  onViewProfile: (userId: User['id']) => void;
  onToggleStatus: (userId: User['id']) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onViewProfile }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-700 border-success-200';
      case 'inactive':
        return 'bg-secondary-100 text-secondary-700 border-secondary-200';
      case 'pending':
        return 'bg-warning-100 text-warning-700 border-warning-200';
      case 'suspended':
        return 'bg-error-100 text-error-700 border-error-200';
      default:
        return 'bg-secondary-100 text-secondary-700 border-secondary-200';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-primary-100 text-primary-700 border-primary-200';
      case 'Manager':
        return 'bg-accent-100 text-accent-700 border-accent-200';
      case 'Specialist':
        return 'bg-secondary-100 text-secondary-700 border-secondary-200';
      default:
        return 'bg-secondary-100 text-secondary-700 border-secondary-200';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-brand hover:shadow-brand-lg transition-all duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                user.status === 'active' ? 'bg-success' : 
                user.status === 'inactive' ? 'bg-secondary-400' :
                user.status === 'pending' ? 'bg-warning' : 'bg-error'
              }`}></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-text-primary truncate">
                {user.name}
              </h3>
              <p className="text-sm text-text-secondary truncate">
                {user.email}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                  {user.role}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-text-secondary hover:text-text-primary"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreVertical"
              className="text-text-secondary hover:text-text-primary"
            />
          </div>
        </div>

        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-border animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-2">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={14} className="text-text-muted" />
                    <span className="text-sm text-text-secondary">{user.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} className="text-text-muted" />
                    <span className="text-sm text-text-secondary">{user.location}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-2">Activity</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={14} className="text-text-muted" />
                    <span className="text-sm text-text-secondary">Joined {user.joinDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={14} className="text-text-muted" />
                    <span className="text-sm text-text-secondary">Last active {user.lastActive}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-text-primary">{user.tasksCompleted}</div>
                  <div className="text-xs text-text-muted">Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-text-primary">{user.projectsActive}</div>
                  <div className="text-xs text-text-muted">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-text-primary">{user.performanceScore}%</div>
                  <div className="text-xs text-text-muted">Performance</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  onClick={() => onViewProfile(user.id)}
                >
                  View Profile
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  iconName="Edit"
                  onClick={() => onEdit(user.id)}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;