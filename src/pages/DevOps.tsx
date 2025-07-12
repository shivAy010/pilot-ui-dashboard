import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

interface DevOpsTask {
  id: string;
  title: string;
  description: string;
  type: 'deployment' | 'infrastructure' | 'monitoring' | 'security' | 'automation';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'review' | 'completed' | 'blocked';
  assignee: string;
  reporter: string;
  estimatedHours: number;
  actualHours?: number;
  createdAt: string;
  dueDate: string;
  tags: string[];
  environment: 'production' | 'staging' | 'development';
  services?: string[];
  impact: 'high' | 'medium' | 'low';
}

const DevOps: React.FC = () => {
  const [tasks, setTasks] = useState<DevOpsTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<DevOpsTask | null>(null);
  const [filter, setFilter] = useState<'all' | 'assigned' | 'critical' | 'production'>('assigned');
  const [isLoading, setIsLoading] = useState(true);
  const [deploymentNotes, setDeploymentNotes] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setTasks([
        {
          id: 'DEVOPS-001',
          title: 'Deploy chat feature to production',
          description: 'Deploy the real-time chat feature to production environment with proper monitoring and rollback plan.',
          type: 'deployment',
          priority: 'high',
          status: 'in_progress',
          assignee: 'Current DevOps',
          reporter: 'Development Team',
          estimatedHours: 8,
          actualHours: 4,
          createdAt: '2024-07-05T09:00:00Z',
          dueDate: '2024-07-08T18:00:00Z',
          tags: ['deployment', 'chat', 'websocket', 'production'],
          environment: 'production',
          services: ['api-gateway', 'chat-service', 'websocket-service', 'database'],
          impact: 'high'
        },
        {
          id: 'DEVOPS-002',
          title: 'Setup monitoring for database performance',
          description: 'Implement comprehensive monitoring for database queries, connection pools, and performance metrics.',
          type: 'monitoring',
          priority: 'critical',
          status: 'todo',
          assignee: 'Current DevOps',
          reporter: 'Database Team',
          estimatedHours: 16,
          createdAt: '2024-07-04T11:30:00Z',
          dueDate: '2024-07-10T17:00:00Z',
          tags: ['monitoring', 'database', 'performance', 'alerts'],
          environment: 'production',
          services: ['postgresql', 'redis', 'monitoring-stack'],
          impact: 'high'
        },
        {
          id: 'DEVOPS-003',
          title: 'Implement automated backup verification',
          description: 'Create automated tests to verify database backup integrity and restoration procedures.',
          type: 'automation',
          priority: 'medium',
          status: 'blocked',
          assignee: 'Current DevOps',
          reporter: 'Security Team',
          estimatedHours: 12,
          createdAt: '2024-06-28T14:15:00Z',
          dueDate: '2024-07-15T17:00:00Z',
          tags: ['automation', 'backup', 'testing', 'disaster-recovery'],
          environment: 'production',
          services: ['backup-service', 'database', 'storage'],
          impact: 'medium'
        },
        {
          id: 'DEVOPS-004',
          title: 'Security audit and vulnerability scan',
          description: 'Conduct comprehensive security audit and vulnerability scanning for all production services.',
          type: 'security',
          priority: 'critical',
          status: 'review',
          assignee: 'Current DevOps',
          reporter: 'Security Officer',
          estimatedHours: 24,
          actualHours: 18,
          createdAt: '2024-06-25T10:00:00Z',
          dueDate: '2024-07-12T17:00:00Z',
          tags: ['security', 'audit', 'vulnerability', 'compliance'],
          environment: 'production',
          services: ['all-services'],
          impact: 'high'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleStatusUpdate = (taskId: string, newStatus: DevOpsTask['status'], notes?: string) => {
    setTasks(prev => prev.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
    setSelectedTask(null);
    setDeploymentNotes('');
    console.log(`Task ${taskId} updated to ${newStatus}${notes ? ` with notes: ${notes}` : ''}`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-700 bg-red-50 border-red-200';
      case 'high': return 'text-error bg-error-50 border-error-200';
      case 'medium': return 'text-warning bg-warning-50 border-warning-200';
      case 'low': return 'text-success bg-success-50 border-success-200';
      default: return 'text-text-muted bg-surface border-border';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'text-text-muted bg-surface border-border';
      case 'in_progress': return 'text-primary bg-primary-50 border-primary-200';
      case 'review': return 'text-info bg-info-50 border-info-200';
      case 'completed': return 'text-success bg-success-50 border-success-200';
      case 'blocked': return 'text-error bg-error-50 border-error-200';
      default: return 'text-text-muted bg-surface border-border';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deployment': return 'Upload';
      case 'infrastructure': return 'Server';
      case 'monitoring': return 'Activity';
      case 'security': return 'Shield';
      case 'automation': return 'Bot';
      default: return 'Settings';
    }
  };

  const getEnvironmentColor = (environment: string) => {
    switch (environment) {
      case 'production': return 'text-error bg-error-50 border-error-200';
      case 'staging': return 'text-warning bg-warning-50 border-warning-200';
      case 'development': return 'text-success bg-success-50 border-success-200';
      default: return 'text-text-muted bg-surface border-border';
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'assigned': return task.assignee === 'Current DevOps' && task.status !== 'completed';
      case 'critical': return task.priority === 'critical' && task.status !== 'completed';
      case 'production': return task.environment === 'production';
      default: return true;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading DevOps tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <Icon name="Server" size={20} className="text-primary sm:w-6 sm:h-6" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary">DevOps Operations Center</h1>
                <p className="text-sm sm:text-base text-text-secondary">Infrastructure and deployment management</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="bg-error-50 border border-error-200 rounded-lg px-3 sm:px-4 py-2 w-full sm:w-auto">
                <span className="text-error font-medium text-sm">{tasks.filter(t => t.priority === 'critical' && t.status !== 'completed').length} Critical</span>
              </div>
              <div className="bg-primary-50 border border-primary-200 rounded-lg px-3 sm:px-4 py-2 w-full sm:w-auto">
                <span className="text-primary font-medium text-sm">{tasks.filter(t => t.status === 'in_progress').length} In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 sm:space-x-8 overflow-x-auto">
            {[
              { key: 'assigned', label: 'My Tasks', count: tasks.filter(t => t.assignee === 'Current DevOps' && t.status !== 'completed').length },
              { key: 'critical', label: 'Critical', count: tasks.filter(t => t.priority === 'critical' && t.status !== 'completed').length },
              { key: 'production', label: 'Production', count: tasks.filter(t => t.environment === 'production').length },
              { key: 'all', label: 'All Tasks', count: tasks.length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="bg-white rounded-lg shadow-sm border border-border">
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="border border-border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer active:bg-gray-50"
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name={getTypeIcon(task.type)} size={16} className="text-primary sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col space-y-2 mb-2">
                          <div className="flex items-center space-x-2 flex-wrap gap-1">
                            <span className="text-xs sm:text-sm font-mono text-text-muted">{task.id}</span>
                            <h3 className="font-semibold text-text-primary text-sm sm:text-base break-words">{task.title}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                              {task.priority.toUpperCase()}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                              {task.status.replace('_', ' ').toUpperCase()}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getEnvironmentColor(task.environment)}`}>
                              {task.environment.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <p className="text-text-secondary mb-3 text-sm line-clamp-2">{task.description}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-text-muted">
                          <div className="flex items-center space-x-1">
                            <Icon name="Clock" size={12} className="sm:w-3.5 sm:h-3.5" />
                            <span>{task.estimatedHours}h est.</span>
                            {task.actualHours && <span>• {task.actualHours}h logged</span>}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Calendar" size={12} className="sm:w-3.5 sm:h-3.5" />
                            <span className="truncate">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="AlertTriangle" size={12} className="sm:w-3.5 sm:h-3.5" />
                            <span className="truncate">Impact: {task.impact}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-text-muted flex-shrink-0 sm:w-5 sm:h-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 min-w-0 flex-1 pr-4">
                  <Icon name={getTypeIcon(selectedTask.type)} size={20} className="text-primary flex-shrink-0 sm:w-6 sm:h-6" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2 mb-1 flex-wrap gap-1">
                      <span className="text-xs sm:text-sm font-mono text-text-muted">{selectedTask.id}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedTask.status)}`}>
                        {selectedTask.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getEnvironmentColor(selectedTask.environment)}`}>
                        {selectedTask.environment.toUpperCase()}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-text-primary break-words">{selectedTask.title}</h2>
                    <p className="text-xs sm:text-sm text-text-muted capitalize">
                      {selectedTask.type} • Priority: {selectedTask.priority} • Impact: {selectedTask.impact}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setSelectedTask(null)}
                  className="text-text-muted hover:text-text-primary flex-shrink-0"
                />
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
                {/* Task Details */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-text-primary">Operation Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Description</label>
                      <p className="text-text-primary text-sm">{selectedTask.description}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Assignee</label>
                        <p className="text-text-primary text-sm">{selectedTask.assignee}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Reporter</label>
                        <p className="text-text-primary text-sm">{selectedTask.reporter}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Estimated</label>
                        <p className="text-text-primary text-sm">{selectedTask.estimatedHours} hours</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Logged</label>
                        <p className="text-text-primary text-sm">{selectedTask.actualHours || 0} hours</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-text-secondary">Affected Services</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedTask.services?.map((service, index) => (
                          <span key={index} className="px-2 py-1 bg-info-50 text-info text-xs rounded-full border border-info-200">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-text-secondary">Tags</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedTask.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full border border-primary-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions & Notes */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-text-primary">Operations & Notes</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Deployment/Operation Notes
                    </label>
                    <textarea
                      value={deploymentNotes}
                      onChange={(e) => setDeploymentNotes(e.target.value)}
                      placeholder="Document deployment steps, configuration changes, rollback procedures..."
                      className="w-full h-32 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => handleStatusUpdate(selectedTask.id, 'in_progress', deploymentNotes)}
                      iconName="Play"
                      className="w-full"
                    >
                      Start Operation
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleStatusUpdate(selectedTask.id, 'review', deploymentNotes)}
                      iconName="Eye"
                      className="w-full text-info border-info-200 hover:bg-info-50"
                    >
                      Ready for Review
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleStatusUpdate(selectedTask.id, 'completed', deploymentNotes)}
                      iconName="CheckCircle"
                      className="w-full text-success border-success-200 hover:bg-success-50"
                    >
                      Mark as Completed
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleStatusUpdate(selectedTask.id, 'blocked', deploymentNotes)}
                      iconName="AlertTriangle"
                      className="w-full text-error border-error-200 hover:bg-error-50"
                    >
                      Mark as Blocked
                    </Button>
                  </div>

                  {/* Quick Actions */}
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-text-primary mb-3">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" iconName="Activity" className="text-xs">
                        Check Logs
                      </Button>
                      <Button variant="outline" size="sm" iconName="BarChart" className="text-xs">
                        View Metrics
                      </Button>
                      <Button variant="outline" size="sm" iconName="Shield" className="text-xs">
                        Security Scan
                      </Button>
                      <Button variant="outline" size="sm" iconName="AlertCircle" className="text-xs">
                        Create Alert
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevOps;