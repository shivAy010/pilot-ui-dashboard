import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Task } from '../../../types';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: Task['id'], newStatus: string) => void;
  onTaskClick: (task: Task) => void;
  viewMode?: 'card' | 'kanban';
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskClick, viewMode = 'card' }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-error bg-error-50 border-error-200';
      case 'medium':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'low':
        return 'text-success bg-success-50 border-success-200';
      default:
        return 'text-text-muted bg-surface border-border';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-success bg-success-50 border-success-200';
      case 'in progress':
        return 'text-primary bg-primary-50 border-primary-200';
      case 'pending':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'blocked':
        return 'text-error bg-error-50 border-error-200';
      default:
        return 'text-text-muted bg-surface border-border';
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (deadline: string | Date) => {
    return new Date(deadline) < new Date() && task.status !== 'Completed';
  };

  if (viewMode === 'kanban') {
    return (
      <div className="bg-white border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
           onClick={() => onTaskClick(task)}>
        <div className="flex items-start justify-between mb-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          <Button
            variant="ghost"
            size="xs"
            iconName="MoreHorizontal"
            className="text-text-muted hover:text-text-primary"
          />
        </div>
        
        <h4 className="font-medium text-text-primary mb-2 line-clamp-2">
          {task.title}
        </h4>
        
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {task.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex -space-x-2">
            {task.assignees.slice(0, 3).map((assignee, index) => (
              <Image
                key={index}
                src={assignee.avatar}
                alt={assignee.name}
                className="w-6 h-6 rounded-full border-2 border-white"
              />
            ))}
            {task.assignees.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-surface border-2 border-white flex items-center justify-center">
                <span className="text-xs text-text-muted">+{task.assignees.length - 3}</span>
              </div>
            )}
          </div>
          <span className={`text-xs ${isOverdue(task.deadline) ? 'text-error' : 'text-text-muted'}`}>
            {formatDate(task.deadline)}
          </span>
        </div>
        
        <div className="w-full bg-surface rounded-full h-2 mb-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${task.progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted">{task.progress}% complete</span>
          {task.attachments > 0 && (
            <div className="flex items-center space-x-1 text-text-muted">
              <Icon name="Paperclip" size={12} />
              <span className="text-xs">{task.attachments}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}>
              {task.status}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-text-muted hover:text-text-primary"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreHorizontal"
              className="text-text-muted hover:text-text-primary"
            />
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-text-primary mb-2 cursor-pointer hover:text-primary"
              onClick={() => onTaskClick(task)}>
            {task.title}
          </h3>
          <p className="text-text-secondary">
            {task.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-text-muted" />
            <div>
              <span className="text-sm text-text-muted">Deadline</span>
              <p className={`text-sm font-medium ${isOverdue(task.deadline) ? 'text-error' : 'text-text-primary'}`}>
                {formatDate(task.deadline)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-text-muted" />
            <div>
              <span className="text-sm text-text-muted">Assignees</span>
              <p className="text-sm font-medium text-text-primary">
                {task.assignees.length} member{task.assignees.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={16} className="text-text-muted" />
            <div>
              <span className="text-sm text-text-muted">Progress</span>
              <p className="text-sm font-medium text-text-primary">
                {task.progress}% complete
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-muted">Progress</span>
            <span className="text-sm font-medium text-text-primary">{task.progress}%</span>
          </div>
          <div className="w-full bg-surface rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              {task.assignees.map((assignee, index) => (
                <Image
                  key={index}
                  src={assignee.avatar}
                  alt={assignee.name}
                  className="w-8 h-8 rounded-full border-2 border-white hover:z-10 transition-transform hover:scale-110"
                  // title={assignee.name}
                />
              ))}
            </div>
            {task.attachments > 0 && (
              <div className="flex items-center space-x-1 text-text-muted">
                <Icon name="Paperclip" size={16} />
                <span className="text-sm">{task.attachments} attachment{task.attachments !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              className="text-text-secondary hover:text-text-primary"
            >
              {task.comments}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onTaskClick(task)}
            >
              View Details
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-border animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-text-primary mb-3">Task Details</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-text-muted">Project</span>
                    <p className="text-sm font-medium text-text-primary">{task.project}</p>
                  </div>
                  <div>
                    <span className="text-sm text-text-muted">Department</span>
                    <p className="text-sm font-medium text-text-primary">{task.department}</p>
                  </div>
                  <div>
                    <span className="text-sm text-text-muted">Created</span>
                    <p className="text-sm font-medium text-text-primary">{formatDate(task?.createdAt || '')}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-text-primary mb-3">AI Insights</h4>
                <div className="space-y-2">
                  {task?.aiInsights?.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon name="Lightbulb" size={14} className="text-accent mt-0.5" />
                      <p className="text-sm text-text-secondary">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;