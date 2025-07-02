import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

interface NotificationHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCount: number;
  onBatchMarkAsRead: () => void;
  onBatchArchive: () => void;
  onBatchForward: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({ 
  searchQuery, 
  onSearchChange, 
  selectedCount, 
  onBatchMarkAsRead, 
  onBatchArchive, 
  onBatchForward,
  onRefresh,
  isRefreshing 
}) => {
  return (
    <div className="bg-white border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Title and Stats */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-semibold text-text-primary">Notification Command Center</h1>
            <p className="text-sm text-text-muted mt-1">
              Intelligent communication hub with smart filtering and priority management
            </p>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-2 bg-success-50 rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></div>
              <span className="text-sm font-medium text-success-700">Real-time Updates</span>
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          {/* Search */}
          <div className="relative flex-1 sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={16} className="text-text-muted" />
            </div>
            <Input
              type="search"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>

          {/* Batch Actions */}
          {selectedCount > 0 && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-primary-50 border border-primary-200 rounded-lg">
              <span className="text-sm font-medium text-primary">
                {selectedCount} selected
              </span>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Check"
                  onClick={onBatchMarkAsRead}
                  className="text-primary hover:bg-primary-100"
                  title="Mark as read"
                />
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Archive"
                  onClick={onBatchArchive}
                  className="text-primary hover:bg-primary-100"
                  title="Archive"
                />
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Forward"
                  onClick={onBatchForward}
                  className="text-primary hover:bg-primary-100"
                  title="Forward"
                />
              </div>
            </div>
          )}

          {/* Refresh Button */}
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            onClick={onRefresh}
            className={`text-text-secondary hover:text-text-primary ${isRefreshing ? 'animate-spin' : ''}`}
            title="Refresh notifications"
          />

          {/* Settings Button */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            className="text-text-secondary hover:text-text-primary"
            title="Notification settings"
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={20} className="text-primary" />
            <div>
              <div className="text-lg font-semibold text-primary">24</div>
              <div className="text-xs text-primary-700">Unread</div>
            </div>
          </div>
        </div>
        <div className="bg-warning-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={20} className="text-warning" />
            <div>
              <div className="text-lg font-semibold text-warning">12</div>
              <div className="text-xs text-warning-700">Action Required</div>
            </div>
          </div>
        </div>
        <div className="bg-success-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <div>
              <div className="text-lg font-semibold text-success">156</div>
              <div className="text-xs text-success-700">Completed</div>
            </div>
          </div>
        </div>
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Archive" size={20} className="text-secondary" />
            <div>
              <div className="text-lg font-semibold text-secondary">45</div>
              <div className="text-xs text-secondary-700">Archived</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationHeader;