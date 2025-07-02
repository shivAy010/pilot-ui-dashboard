import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Task } from '../../../types';

interface TaskCalendarProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onDateSelect: (date: Date) => void;
}

const TaskCalendar: React.FC<TaskCalendarProps> = ({ tasks, onTaskClick, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month'); // month, week, day

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  const getTasksForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return tasks.filter(task => {
      const taskDate = new Date(task.deadline).toISOString().split('T')[0];
      return taskDate === dateStr;
    });
  };

  const navigateMonth = (direction: number) => {
    if (!currentDate) return;
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isOverdue = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const renderCalendarDays = () => {
    if (!currentDate) return null;
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-border bg-surface"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayTasks = getTasksForDate(date);
      const isCurrentDay = isToday(date);
      const isOverdueDate = isOverdue(date);

      days.push(
        <div
          key={day}
          className={`h-24 border border-border bg-white hover:bg-surface cursor-pointer transition-colors duration-200 ${
            isCurrentDay ? 'ring-2 ring-primary bg-primary-50' : ''
          }`}
          onClick={() => onDateSelect(date)}
        >
          <div className="p-2 h-full flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-sm font-medium ${
                isCurrentDay ? 'text-primary' : isOverdueDate ? 'text-text-muted' : 'text-text-primary'
              }`}>
                {day}
              </span>
              {dayTasks.length > 0 && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white">
                  {dayTasks.length}
                </span>
              )}
            </div>
            
            <div className="flex-1 overflow-hidden">
              {dayTasks.slice(0, 2).map((task) => (
                <div
                  key={task.id}
                  className={`text-xs p-1 mb-1 rounded truncate cursor-pointer transition-colors duration-200 ${
                    task.priority === 'High' ? 'bg-error-100 text-error-700 hover:bg-error-200' :
                    task.priority === 'Medium'? 'bg-warning-100 text-warning-700 hover:bg-warning-200' : 'bg-success-100 text-success-700 hover:bg-success-200'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTaskClick(task);
                  }}
                  title={task.title}
                >
                  {task.title}
                </div>
              ))}
              {dayTasks.length > 2 && (
                <div className="text-xs text-text-muted">
                  +{dayTasks.length - 2} more
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return days;
  };

  const getUpcomingTasks = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return tasks
      .filter(task => {
        const taskDate = new Date(task.deadline);
        return taskDate >= today && taskDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      .slice(0, 5);
  };

  if (!currentDate) return null;

  return (
    <div className="bg-white border border-border rounded-lg shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={20} className="text-text-muted" />
            <h3 className="text-lg font-semibold text-text-primary">Task Calendar</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant={viewMode === 'month' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('month')}
                className="rounded-r-none border-r border-border"
              >
                Month
              </Button>
              <Button
                variant={viewMode === 'week' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('week')}
                className="rounded-none border-r border-border"
              >
                Week
              </Button>
              <Button
                variant={viewMode === 'day' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('day')}
                className="rounded-l-none"
              >
                Day
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h4 className="text-xl font-semibold text-text-primary">
            {formatDate(currentDate)}
          </h4>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="ChevronLeft"
              onClick={() => navigateMonth(-1)}
              className="text-text-muted hover:text-text-primary"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
              className="text-text-muted hover:text-text-primary"
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="ChevronRight"
              onClick={() => navigateMonth(1)}
              className="text-text-muted hover:text-text-primary"
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-3">
            {/* Day Headers */}
            <div className="grid grid-cols-7 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-text-muted">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-0 border border-border rounded-lg overflow-hidden">
              {renderCalendarDays()}
            </div>
          </div>

          {/* Upcoming Tasks Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-lg p-4">
              <h5 className="font-medium text-text-primary mb-4 flex items-center">
                <Icon name="Clock" size={16} className="mr-2 text-text-muted" />
                Upcoming Tasks
              </h5>
              
              <div className="space-y-3">
                {getUpcomingTasks().map(task => (
                  <div
                    key={task.id}
                    className="p-3 bg-white border border-border rounded-lg cursor-pointer hover:shadow-sm transition-shadow duration-200"
                    onClick={() => onTaskClick(task)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h6 className="text-sm font-medium text-text-primary line-clamp-2">
                        {task.title}
                      </h6>
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                        task.priority === 'High' ? 'bg-error-100 text-error-700' :
                        task.priority === 'Medium'? 'bg-warning-100 text-warning-700' : 'bg-success-100 text-success-700'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span>{new Date(task.deadline).toLocaleDateString()}</span>
                      <span>{task.progress}%</span>
                    </div>
                    
                    <div className="w-full bg-border rounded-full h-1 mt-2">
                      <div
                        className="bg-primary h-1 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
                
                {getUpcomingTasks().length === 0 && (
                  <div className="text-center py-4">
                    <Icon name="CheckCircle" size={24} className="text-success mx-auto mb-2" />
                    <p className="text-sm text-text-muted">No upcoming tasks</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCalendar;