import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import * as LucideIcons from 'lucide-react';

interface ActivityUser {
  name: string;
  avatar: string;
}

interface ActivityMetadata {
  project?: string;
}

interface Activity {
  type: string;
  timestamp: string | number | Date;
  description: string;
  user?: ActivityUser;
  metadata?: ActivityMetadata;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities = [] }) => {
  const getActivityIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      task_completed: 'CheckCircle',
      task_assigned: 'UserPlus',
      report_generated: 'FileText',
      team_update: 'Users',
      system_alert: 'AlertTriangle',
      integration_success: 'Puzzle',
      security_update: 'Shield'
    };
    return iconMap[type] || 'Activity';
  };

  const getActivityColor = (type: string) => {
    const colorMap: Record<string, string> = {
      task_completed: 'text-success',
      task_assigned: 'text-primary',
      report_generated: 'text-accent',
      team_update: 'text-secondary',
      system_alert: 'text-warning',
      integration_success: 'text-primary',
      security_update: 'text-error'
    };
    return colorMap[type] || 'text-text-muted';
  };

  const formatTime = (timestamp: string | number | Date) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
          <Icon name="Activity" size={20} className="text-text-muted" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full bg-surface flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
                <Icon name={getActivityIcon(activity.type) as keyof typeof LucideIcons} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {activity.user?.avatar && (
                      <Image
                        src={activity.user.avatar}
                        alt={activity.user.name}
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <span className="text-sm font-medium text-text-primary">
                      {activity.user?.name || 'System'}
                    </span>
                  </div>
                  <span className="text-xs text-text-muted">
                    {formatTime(activity.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary mt-1">
                  {activity.description}
                </p>
                
                {activity.metadata && (
                  <div className="mt-2 text-xs text-text-muted">
                    {activity.metadata.project && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-surface text-text-secondary">
                        <Icon name="Folder" size={12} className="mr-1" />
                        {activity.metadata.project}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary-600 font-medium transition-colors duration-200">
            View All Activities
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;