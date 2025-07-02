import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Notification } from '../../../types';

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: Notification['id']) => void;
  onArchive: (id: Notification['id']) => void;
  onForward: (id: Notification['id']) => void;
  isSelected: boolean;
  onSelect: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onMarkAsRead, onArchive, onForward, isSelected, onSelect }) => {
  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'critical':
        return 'border-l-error bg-error-50';
      case 'high':
        return 'border-l-warning bg-warning-50';
      case 'medium':
        return 'border-l-primary bg-primary-50';
      case 'low':
        return 'border-l-secondary bg-secondary-50';
      default:
        return 'border-l-border bg-white';
    }
  };

  const getCategoryIcon = (category: Notification['category']) => {
    switch (category) {
      case 'task':
        return 'CheckSquare';
      case 'approval':
        return 'UserCheck';
      case 'system':
        return 'Settings';
      case 'communication':
        return 'MessageCircle';
      case 'security':
        return 'Shield';
      default:
        return 'Bell';
    }
  };

  const formatTimestamp = (timestamp: Notification['timestamp'] | undefined) => {
    if (!timestamp) return '';
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className={`border-l-4 ${getPriorityColor(notification.priority)} border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-brand ${isSelected ? 'ring-2 ring-primary' : ''} ${!notification.isRead ? 'bg-opacity-80' : 'bg-opacity-40'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="mt-1 h-4 w-4 text-primary focus:ring-primary border-border rounded"
          />
          
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.priority === 'critical' ? 'bg-error text-white' : notification.priority === 'high' ? 'bg-warning text-white' : 'bg-primary text-white'}`}>
              <Icon name={getCategoryIcon(notification.category)} size={18} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className={`text-sm font-medium ${!notification.isRead ? 'text-text-primary' : 'text-text-secondary'} truncate`}>
                {notification.title}
              </h3>
              {!notification.isRead && (
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
              )}
            </div>
            
            <p className="text-sm text-text-muted mb-2 line-clamp-2">
              {notification.message}
            </p>
            
            <div className="flex items-center space-x-4 text-xs text-text-muted">
              <span className="flex items-center space-x-1">
                <Icon name="User" size={12} />
                <span>{notification.sender}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>{formatTimestamp(notification.timestamp)}</span>
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                notification.category === 'task' ? 'bg-success-100 text-success-700' :
                notification.category === 'approval' ? 'bg-warning-100 text-warning-700' :
                notification.category === 'system' ? 'bg-secondary-100 text-secondary-700' :
                notification.category === 'communication'? 'bg-primary-100 text-primary-700' : 'bg-error-100 text-error-700'
              }`}>
                {notification.category}
              </span>
            </div>

            {notification.actionRequired && (
              <div className="mt-3 flex items-center space-x-2">
                <Button variant="primary" size="xs">
                  {notification.actionText || 'Take Action'}
                </Button>
                <Button variant="ghost" size="xs">
                  View Details
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-1 ml-2">
          {!notification.isRead && (
            <Button
              variant="ghost"
              size="xs"
              iconName="Check"
              onClick={() => onMarkAsRead(notification.id)}
              className="text-text-muted hover:text-success"
              title="Mark as read"
            />
          )}
          <Button
            variant="ghost"
            size="xs"
            iconName="Archive"
            onClick={() => onArchive(notification.id)}
            className="text-text-muted hover:text-text-primary"
            title="Archive"
          />
          <Button
            variant="ghost"
            size="xs"
            iconName="Forward"
            onClick={() => onForward(notification.id)}
            className="text-text-muted hover:text-text-primary"
            title="Forward"
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;