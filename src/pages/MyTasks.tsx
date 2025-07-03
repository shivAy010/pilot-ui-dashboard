import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  department: 'ads' | 'hr' | 'operations' | 'finance';
  assignedBy: string;
  assignedAt: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  type: 'review' | 'approval' | 'analysis' | 'action';
}

const MyTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setTasks([
        {
          id: '1',
          title: 'Review Q4 Marketing Campaign Performance',
          description: 'Analyze the effectiveness of the Q4 digital marketing campaigns and provide recommendations for optimization.',
          priority: 'high',
          department: 'ads',
          assignedBy: 'Marketing Analytics Agent',
          assignedAt: '2024-07-02T09:00:00Z',
          dueDate: '2024-07-05T17:00:00Z',
          status: 'pending',
          type: 'analysis'
        },
        {
          id: '2',
          title: 'Approve New Hire Onboarding Process',
          description: 'Review and approve the updated onboarding checklist for new healthcare providers joining the platform.',
          priority: 'medium',
          department: 'hr',
          assignedBy: 'HR Automation Agent',
          assignedAt: '2024-07-01T14:30:00Z',
          dueDate: '2024-07-04T12:00:00Z',
          status: 'in_progress',
          type: 'approval'
        },
        {
          id: '3',
          title: 'Budget Allocation Review',
          description: 'Review the proposed budget allocation for the upcoming quarter based on performance metrics and market analysis.',
          priority: 'high',
          department: 'finance',
          assignedBy: 'Financial Planning Agent',
          assignedAt: '2024-07-02T11:15:00Z',
          dueDate: '2024-07-06T16:00:00Z',
          status: 'pending',
          type: 'review'
        },
        {
          id: '4',
          title: 'Provider Performance Report Analysis',
          description: 'Complete analysis of monthly provider performance metrics and identify trends requiring executive attention.',
          priority: 'medium',
          department: 'operations',
          assignedBy: 'Operations Analytics Agent',
          assignedAt: '2024-06-30T10:00:00Z',
          dueDate: '2024-07-03T15:00:00Z',
          status: 'completed',
          type: 'analysis'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const handleMarkComplete = (taskId: string) => {
    setTasks(prev => 
      prev.map(t => t.id === taskId ? { ...t, status: 'completed' as const } : t)
    );
    setSelectedTask(null);
  };

  const handleStartTask = (taskId: string) => {
    setTasks(prev => 
      prev.map(t => t.id === taskId ? { ...t, status: 'in_progress' as const } : t)
    );
    setSelectedTask(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-error bg-error-50 border-error-200';
      case 'medium': return 'text-warning bg-warning-50 border-warning-200';
      case 'low': return 'text-success bg-success-50 border-success-200';
      default: return 'text-text-muted bg-surface border-border';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success bg-success-50 border-success-200';
      case 'in_progress': return 'text-primary bg-primary-50 border-primary-200';
      case 'pending': return 'text-warning bg-warning-50 border-warning-200';
      default: return 'text-text-muted bg-surface border-border';
    }
  };

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'ads': return 'Megaphone';
      case 'hr': return 'Users';
      case 'operations': return 'Settings';
      case 'finance': return 'DollarSign';
      default: return 'Briefcase';
    }
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter);

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="CheckSquare" size={24} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-text-primary">My Tasks</h1>
                <p className="text-text-secondary">Manage your assigned tasks and responsibilities</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-warning-50 border border-warning-200 rounded-lg px-4 py-2">
                <span className="text-warning font-medium">{tasks.filter(t => t.status === 'pending').length} Pending</span>
              </div>
              <div className="bg-primary-50 border border-primary-200 rounded-lg px-4 py-2">
                <span className="text-primary font-medium">{tasks.filter(t => t.status === 'in_progress').length} In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { key: 'all', label: 'All Tasks', count: tasks.length },
              { key: 'pending', label: 'Pending', count: tasks.filter(t => t.status === 'pending').length },
              { key: 'in_progress', label: 'In Progress', count: tasks.filter(t => t.status === 'in_progress').length },
              { key: 'completed', label: 'Completed', count: tasks.filter(t => t.status === 'completed').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  filter === tab.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-muted hover:text-text-secondary hover:border-border'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-border">
          <div className="p-6">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  {filter === 'all' ? 'No tasks assigned' : `No ${filter.replace('_', ' ')} tasks`}
                </h3>
                <p className="text-text-secondary">
                  {filter === 'all' 
                    ? 'You have no tasks assigned at the moment.' 
                    : `You have no ${filter.replace('_', ' ')} tasks.`
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleTaskClick(task)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          <Icon name={getDepartmentIcon(task.department)} size={20} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-text-primary">{task.title}</h3>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                              {task.status.replace('_', ' ').charAt(0).toUpperCase() + task.status.replace('_', ' ').slice(1)}
                            </span>
                          </div>
                          <p className="text-text-secondary mb-3">{task.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-text-muted">
                            <div className="flex items-center space-x-1">
                              <Icon name="Bot" size={14} />
                              <span>{task.assignedBy}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="Calendar" size={14} />
                              <span className={isOverdue(task.dueDate) && task.status !== 'completed' ? 'text-error' : ''}>
                                Due {new Date(task.dueDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="Tag" size={14} />
                              <span className="capitalize">{task.type}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-text-muted" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-text-primary">Task Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={handleCloseModal}
                  className="text-text-muted hover:text-text-primary"
                />
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-semibold text-text-primary">{selectedTask.title}</h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(selectedTask.priority)}`}>
                      {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)} Priority
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedTask.status)}`}>
                      {selectedTask.status.replace('_', ' ').charAt(0).toUpperCase() + selectedTask.status.replace('_', ' ').slice(1)}
                    </span>
                  </div>
                  <p className="text-text-secondary">{selectedTask.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Assignment Details</h4>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="text-text-muted">Assigned by:</span> {selectedTask.assignedBy}</p>
                      <p className="text-sm"><span className="text-text-muted">Department:</span> {selectedTask.department.charAt(0).toUpperCase() + selectedTask.department.slice(1)}</p>
                      <p className="text-sm"><span className="text-text-muted">Task type:</span> {selectedTask.type.charAt(0).toUpperCase() + selectedTask.type.slice(1)}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Timeline</h4>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="text-text-muted">Assigned:</span> {new Date(selectedTask.assignedAt).toLocaleString()}</p>
                      <p className="text-sm">
                        <span className="text-text-muted">Due date:</span> 
                        <span className={isOverdue(selectedTask.dueDate) && selectedTask.status !== 'completed' ? 'text-error font-medium ml-1' : 'ml-1'}>
                          {new Date(selectedTask.dueDate).toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handleCloseModal}
                    className="text-text-secondary hover:text-text-primary"
                  >
                    Close
                  </Button>
                  {selectedTask.status === 'pending' && (
                    <Button
                      variant="outline"
                      iconName="Play"
                      onClick={() => handleStartTask(selectedTask.id)}
                      className="text-primary hover:text-primary border-primary-200 hover:bg-primary-50"
                    >
                      Start Task
                    </Button>
                  )}
                  {selectedTask.status === 'in_progress' && (
                    <Button
                      variant="primary"
                      iconName="CheckCircle"
                      onClick={() => handleMarkComplete(selectedTask.id)}
                    >
                      Mark Complete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasks;