import React from 'react';
import NotificationCard from './NotificationCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Notification } from '../../../types';

interface NotificationListProps {
  notifications: Notification[];
  selectedNotifications: (string | number)[];
  onSelectNotification: (id: string | number) => void;
  onSelectAll: () => void;
  onMarkAsRead: (id: string | number) => void;
  onArchive: (id: string | number) => void;
  onForward: (id: string | number) => void;
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ 
  notifications, 
  selectedNotifications, 
  onSelectNotification, 
  onSelectAll, 
  onMarkAsRead, 
  onArchive, 
  onForward,
  isLoading,
  hasMore,
  onLoadMore 
}) => {
  const isAllSelected = notifications.length > 0 && selectedNotifications.length === notifications.length;
  const isPartiallySelected = selectedNotifications.length > 0 && selectedNotifications.length < notifications.length;

  if (isLoading && notifications.length === 0) {
    return (
      <div className="bg-white border border-border rounded-lg p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin">
            <Icon name="RefreshCw" size={32} className="text-primary" />
          </div>
          <p className="text-text-muted">Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="bg-white border border-border rounded-lg p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center">
            <Icon name="Bell" size={32} className="text-secondary" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium text-text-primary mb-2">No notifications found</h3>
            <p className="text-text-muted">
              You&apos;re all caught up! No notifications match your current filters.
            </p>
          </div>
          <Button variant="primary" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-lg">
      {/* List Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isAllSelected}
            ref={(input) => {
              if (input) input.indeterminate = isPartiallySelected;
            }}
            onChange={onSelectAll}
            className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
          />
          <span className="text-sm font-medium text-text-primary">
            {selectedNotifications.length > 0 
              ? `${selectedNotifications.length} of ${notifications.length} selected`
              : `${notifications.length} notifications`
            }
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="SortDesc"
            className="text-text-secondary hover:text-text-primary"
          >
            Sort
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Filter"
            className="text-text-secondary hover:text-text-primary"
          >
            Filter
          </Button>
        </div>
      </div>

      {/* Notification List */}
      <div className="divide-y divide-border">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4">
            <NotificationCard
              notification={notification}
              isSelected={selectedNotifications.includes(notification.id)}
              onSelect={() => onSelectNotification(notification.id)}
              onMarkAsRead={onMarkAsRead}
              onArchive={onArchive}
              onForward={onForward}
            />
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={onLoadMore}
            disabled={isLoading}
            className="w-full"
            iconName={isLoading ? "RefreshCw" : "ChevronDown"}
          >
            {isLoading ? 'Loading...' : 'Load More Notifications'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationList;