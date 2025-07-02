import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import * as LucideIcons from 'lucide-react';

interface TaskOverviewTask {
  title: string;
  project: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate: string | Date;
  progress: number;
}

interface TaskOverviewProps {
  tasks: TaskOverviewTask[];
}

const TaskOverview: React.FC<TaskOverviewProps> = ({ tasks = [] }) => {
  const getPriorityColor = (priority: string) => {
    const colorMap: Record<string, string> = {
      high: 'text-error bg-error-50 border-error-200',
      medium: 'text-warning bg-warning-50 border-warning-200',
      low: 'text-success bg-success-50 border-success-200'
    };
    return colorMap[priority] || 'text-text-muted bg-surface border-border';
  };

  const getStatusIcon = (status: string) => {
    const iconMap: Record<string, string> = {
      pending: 'Clock',
      in_progress: 'Play',
      review: 'Eye',
      completed: 'CheckCircle',
      blocked: 'AlertOctagon'
    };
    return iconMap[status] || 'Circle';
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      pending: 'text-text-muted',
      in_progress: 'text-primary',
      review: 'text-warning',
      completed: 'text-success',
      blocked: 'text-error'
    };
    return colorMap[status] || 'text-text-muted';
  };

  const formatDueDate = (dueDate: string | Date) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffInDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 0) return `${Math.abs(diffInDays)} days overdue`;
    if (diffInDays === 0) return 'Due today';
    if (diffInDays === 1) return 'Due tomorrow';
    return `Due in ${diffInDays} days`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Task Overview</h3>
          <Button variant="outline" size="sm" iconName="Plus">
            New Task
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {tasks.map((task, index) => (
            <div key={index} className="border border-border rounded-lg p-4 hover:shadow-brand transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full bg-surface flex items-center justify-center ${getStatusColor(task.status)}`}>
                    <Icon name={getStatusIcon(task.status) as keyof typeof LucideIcons} size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">{task.title}</h4>
                    <p className="text-xs text-text-muted">{task.project}</p>
                  </div>
                </div>
                
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-text-muted">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Icon name="User" size={12} />
                    <span>{task.assignee}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{formatDueDate(task.dueDate)}</span>
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-surface rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium">{task.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary-600 font-medium transition-colors duration-200">
            View All Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;