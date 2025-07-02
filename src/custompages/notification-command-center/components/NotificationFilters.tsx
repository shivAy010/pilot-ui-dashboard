import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import * as LucideIcons from 'lucide-react';

interface NotificationFiltersProps {
  activeFilter: string;
  onFilterChange: (id: string) => void;
  activePriority: string;
  onPriorityChange: (id: string) => void;
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  unreadCount: number;
  totalCount: number;
}

const NotificationFilters: React.FC<NotificationFiltersProps> = ({ 
  activeFilter, 
  onFilterChange, 
  activePriority, 
  onPriorityChange, 
  activeCategory, 
  onCategoryChange,
  unreadCount,
  totalCount 
}) => {
  const filters = [
    { id: 'all', label: 'All', count: totalCount, icon: 'Inbox' },
    { id: 'unread', label: 'Unread', count: unreadCount, icon: 'Mail' },
    { id: 'actionRequired', label: 'Action Required', count: 12, icon: 'AlertCircle' },
    { id: 'archived', label: 'Archived', count: 45, icon: 'Archive' },
  ];

  const priorities = [
    { id: 'all', label: 'All Priorities', color: 'text-text-secondary' },
    { id: 'critical', label: 'Critical', color: 'text-error' },
    { id: 'high', label: 'High', color: 'text-warning' },
    { id: 'medium', label: 'Medium', color: 'text-primary' },
    { id: 'low', label: 'Low', color: 'text-secondary' },
  ];

  const categories = [
    { id: 'all', label: 'All Categories', icon: 'Grid3X3' },
    { id: 'task', label: 'Tasks', icon: 'CheckSquare' },
    { id: 'approval', label: 'Approvals', icon: 'UserCheck' },
    { id: 'system', label: 'System', icon: 'Settings' },
    { id: 'communication', label: 'Communication', icon: 'MessageCircle' },
    { id: 'security', label: 'Security', icon: 'Shield' },
  ];

  return (
    <div className="bg-white border border-border rounded-lg p-6 space-y-6">
      {/* Main Filters */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3">Inbox</h3>
        <div className="space-y-1">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon name={filter.icon as keyof typeof LucideIcons} size={16} />
                <span>{filter.label}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                activeFilter === filter.id
                  ? 'bg-primary text-white' :'bg-secondary-100 text-secondary-700'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3">Priority</h3>
        <div className="space-y-1">
          {priorities.map((priority) => (
            <button
              key={priority.id}
              onClick={() => onPriorityChange(priority.id)}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activePriority === priority.id
                  ? 'bg-primary-50 text-primary border border-primary-200'
                  : `${priority.color} hover:bg-surface`
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${
                priority.id === 'critical' ? 'bg-error' :
                priority.id === 'high' ? 'bg-warning' :
                priority.id === 'medium' ? 'bg-primary' :
                priority.id === 'low'? 'bg-secondary' : 'bg-border'
              }`}></div>
              <span>{priority.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3">Category</h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              <Icon name={category.icon as keyof typeof LucideIcons} size={16} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <Button variant="ghost" size="sm" iconName="CheckCheck" className="w-full justify-start">
            Mark All as Read
          </Button>
          <Button variant="ghost" size="sm" iconName="Archive" className="w-full justify-start">
            Archive All Read
          </Button>
          <Button variant="ghost" size="sm" iconName="Settings" className="w-full justify-start">
            Notification Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationFilters;