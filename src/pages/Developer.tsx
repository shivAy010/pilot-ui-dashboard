import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

export interface DeveloperTask {
  id: string;
  title: string;
  description: string;
  type: 'feature' | 'bug' | 'enhancement' | 'refactor' | 'hotfix';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'review' | 'testing' | 'done' | 'blocked';
  assignee: string;
  reporter: string;
  estimatedHours: number;
  actualHours?: number;
  createdAt: string;
  dueDate: string;
  tags: string[];
  branch?: string;
  pullRequest?: string;
  testCases?: string[];
  relatedIssues?: string[];
}

const Developer: React.FC = () => {
  const [tasks, setTasks] = useState<DeveloperTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<DeveloperTask | null>(null);
  const [filter, setFilter] = useState<'all' | 'assigned' | 'in_progress' | 'review'>('assigned');
  const [isLoading, setIsLoading] = useState(true);
  const [timeLogged, setTimeLogged] = useState('');
  const [statusUpdate, setStatusUpdate] = useState('');

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setTasks([
        {
          id: 'DEV-001',
          title: 'Implement real-time chat for patient-doctor communication',
          description: 'Build WebSocket-based chat system allowing real-time messaging between patients and doctors. Include message history, typing indicators, and file sharing capabilities.',
          type: 'feature',
          priority: 'high',
          status: 'in_progress',
          assignee: 'Current Developer',
          reporter: 'Product Manager',
          estimatedHours: 40,
          actualHours: 24,
          createdAt: '2024-07-01T10:00:00Z',
          dueDate: '2024-07-10T17:00:00Z',
          tags: ['frontend', 'backend', 'websocket', 'chat'],
          branch: 'feature/real-time-chat',
          pullRequest: 'https://github.com/sahej/platform/pull/245',
          testCases: [
            'User can send and receive messages in real-time',
            'Message history loads correctly on chat open',
            'Typing indicators work for both participants',
            'File upload and download functionality works',
            'Chat persists across page refreshes'
          ],
          relatedIssues: ['DEV-045', 'DEV-078']
        },
        {
          id: 'DEV-002',
          title: 'Fix appointment booking time zone issues',
          description: 'Resolve issues with appointment scheduling across different time zones. Ensure all times are displayed correctly based on user location and stored properly in UTC.',
          type: 'bug',
          priority: 'critical',
          status: 'todo',
          assignee: 'Current Developer',
          reporter: 'QA Team',
          estimatedHours: 16,
          createdAt: '2024-07-03T14:30:00Z',
          dueDate: '2024-07-08T17:00:00Z',
          tags: ['bug', 'timezone', 'booking', 'critical'],
          testCases: [
            'Appointments show correct local time for patients',
            'Appointments show correct local time for doctors',
            'Database stores all appointments in UTC',
            'Time zone conversion works for all supported regions'
          ],
          relatedIssues: ['DEV-089', 'DEV-091']
        },
        {
          id: 'DEV-003',
          title: 'Optimize database queries for doctor search',
          description: 'Improve performance of doctor search functionality by optimizing database queries, adding proper indexes, and implementing caching strategies.',
          type: 'enhancement',
          priority: 'medium',
          status: 'review',
          assignee: 'Current Developer',
          reporter: 'DevOps Team',
          estimatedHours: 24,
          actualHours: 28,
          createdAt: '2024-06-28T09:15:00Z',
          dueDate: '2024-07-12T17:00:00Z',
          tags: ['performance', 'database', 'optimization', 'search'],
          branch: 'optimize/doctor-search-queries',
          pullRequest: 'https://github.com/sahej/platform/pull/238',
          testCases: [
            'Search response time under 500ms for 10k+ doctors',
            'Search results remain accurate after optimization',
            'Filters work correctly with optimized queries',
            'Pagination performance is improved'
          ]
        },
        {
          id: 'DEV-004',
          title: 'Implement automated backup system',
          description: 'Set up automated daily backups for production database with proper retention policies and disaster recovery procedures.',
          type: 'feature',
          priority: 'high',
          status: 'blocked',
          assignee: 'Current Developer',
          reporter: 'DevOps Lead',
          estimatedHours: 32,
          createdAt: '2024-06-25T16:20:00Z',
          dueDate: '2024-07-15T17:00:00Z',
          tags: ['devops', 'backup', 'infrastructure', 'automation'],
          testCases: [
            'Daily backups run automatically at 2 AM UTC',
            'Backup files are stored in multiple locations',
            'Backup restoration process works correctly',
            'Monitoring alerts trigger on backup failures'
          ],
          relatedIssues: ['DEV-032', 'DEV-055']
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleStatusUpdate = (taskId: string, newStatus: DeveloperTask['status'], hours?: number, updateNote?: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: newStatus, 
              actualHours: hours ? (task.actualHours || 0) + hours : task.actualHours 
            }
          : task
      )
    );
    setSelectedTask(null);
    setTimeLogged('');
    setStatusUpdate('');
    console.log(`Task ${taskId} updated to ${newStatus}${updateNote ? ` with note: ${updateNote}` : ''}`);
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
      case 'testing': return 'text-warning bg-warning-50 border-warning-200';
      case 'done': return 'text-success bg-success-50 border-success-200';
      case 'blocked': return 'text-error bg-error-50 border-error-200';
      default: return 'text-text-muted bg-surface border-border';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feature': return 'Plus';
      case 'bug': return 'Bug';
      case 'enhancement': return 'TrendingUp';
      case 'refactor': return 'RefreshCw';
      case 'hotfix': return 'Zap';
      default: return 'Code';
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'assigned': return task.assignee === 'Current Developer' && task.status !== 'done';
      case 'in_progress': return task.status === 'in_progress';
      case 'review': return task.status === 'review';
      default: return true;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading development tasks...</p>
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
              <Icon name="Code" size={24} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Developer Task Board</h1>
                <p className="text-text-secondary">Manage your development tasks and sprints</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-error-50 border border-error-200 rounded-lg px-4 py-2">
                <span className="text-error font-medium">{tasks.filter(t => t.priority === 'critical' && t.status !== 'done').length} Critical</span>
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
              { key: 'assigned', label: 'My Tasks', count: tasks.filter(t => t.assignee === 'Current Developer' && t.status !== 'done').length },
              { key: 'in_progress', label: 'In Progress', count: tasks.filter(t => t.status === 'in_progress').length },
              { key: 'review', label: 'In Review', count: tasks.filter(t => t.status === 'review').length },
              { key: 'all', label: 'All Tasks', count: tasks.length }
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
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <Icon name={getTypeIcon(task.type)} size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm font-mono text-text-muted">{task.id}</span>
                          <h3 className="font-semibold text-text-primary">{task.title}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                            {task.priority.toUpperCase()}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                            {task.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <p className="text-text-secondary mb-3 line-clamp-2">{task.description}</p>
                        <div className="flex items-center space-x-6 text-sm text-text-muted">
                          <div className="flex items-center space-x-1">
                            <Icon name="Clock" size={14} />
                            <span>{task.estimatedHours}h estimated</span>
                            {task.actualHours && <span>• {task.actualHours}h logged</span>}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Calendar" size={14} />
                            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Tag" size={14} />
                            <span>{task.tags.slice(0, 2).join(', ')}</span>
                            {task.tags.length > 2 && <span>+{task.tags.length - 2}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-text-muted" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm font-mono text-text-muted">{selectedTask.id}</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedTask.status)}`}>
                      {selectedTask.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-text-primary">{selectedTask.title}</h2>
                  <p className="text-sm text-text-muted capitalize">
                    {selectedTask.type} • Priority: {selectedTask.priority}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setSelectedTask(null)}
                  className="text-text-muted hover:text-text-primary"
                />
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Task Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Task Details</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Description</label>
                        <p className="text-text-primary">{selectedTask.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Assignee</label>
                          <p className="text-text-primary">{selectedTask.assignee}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Reporter</label>
                          <p className="text-text-primary">{selectedTask.reporter}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Estimated</label>
                          <p className="text-text-primary">{selectedTask.estimatedHours} hours</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Logged</label>
                          <p className="text-text-primary">{selectedTask.actualHours || 0} hours</p>
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

                      {selectedTask.branch && (
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Branch</label>
                          <p className="text-text-primary font-mono text-sm">{selectedTask.branch}</p>
                        </div>
                      )}

                      {selectedTask.pullRequest && (
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Pull Request</label>
                          <a href={selectedTask.pullRequest} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                            View PR →
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Test Cases */}
                  {selectedTask.testCases && (
                    <div>
                      <h4 className="text-sm font-medium text-text-primary mb-3">Test Cases</h4>
                      <div className="space-y-2">
                        {selectedTask.testCases.map((testCase, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-text-secondary">{testCase}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Actions</h3>
                    
                    {/* Time Logging */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Log Time (hours)
                        </label>
                        <input
                          type="number"
                          value={timeLogged}
                          onChange={(e) => setTimeLogged(e.target.value)}
                          placeholder="Hours worked"
                          className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          min="0"
                          step="0.5"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Status Update Note
                        </label>
                        <textarea
                          value={statusUpdate}
                          onChange={(e) => setStatusUpdate(e.target.value)}
                          placeholder="Optional note about progress..."
                          className="w-full h-24 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Status Updates */}
                    <div className="space-y-3 pt-4">
                      {selectedTask.status === 'todo' && (
                        <Button
                          onClick={() => handleStatusUpdate(selectedTask.id, 'in_progress', parseFloat(timeLogged) || undefined, statusUpdate)}
                          iconName="Play"
                          className="w-full"
                        >
                          Start Working
                        </Button>
                      )}
                      
                      {selectedTask.status === 'in_progress' && (
                        <>
                          <Button
                            onClick={() => handleStatusUpdate(selectedTask.id, 'review', parseFloat(timeLogged) || undefined, statusUpdate)}
                            iconName="GitPullRequest"
                            className="w-full"
                          >
                            Ready for Review
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleStatusUpdate(selectedTask.id, 'blocked', parseFloat(timeLogged) || undefined, statusUpdate)}
                            iconName="AlertCircle"
                            className="w-full text-error border-error-200 hover:bg-error-50"
                          >
                            Mark as Blocked
                          </Button>
                        </>
                      )}
                      
                      {selectedTask.status === 'review' && (
                        <>
                          <Button
                            onClick={() => handleStatusUpdate(selectedTask.id, 'testing', parseFloat(timeLogged) || undefined, statusUpdate)}
                            iconName="TestTube"
                            className="w-full"
                          >
                            Move to Testing
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleStatusUpdate(selectedTask.id, 'in_progress', parseFloat(timeLogged) || undefined, statusUpdate)}
                            iconName="ArrowLeft"
                            className="w-full"
                          >
                            Back to Development
                          </Button>
                        </>
                      )}
                      
                      {selectedTask.status === 'testing' && (
                        <Button
                          onClick={() => handleStatusUpdate(selectedTask.id, 'done', parseFloat(timeLogged) || undefined, statusUpdate)}
                          iconName="CheckCircle"
                          className="w-full text-success border-success-200 hover:bg-success-50"
                        >
                          Mark as Complete
                        </Button>
                      )}
                      
                      {selectedTask.status === 'blocked' && (
                        <Button
                          onClick={() => handleStatusUpdate(selectedTask.id, 'in_progress', parseFloat(timeLogged) || undefined, statusUpdate)}
                          iconName="Play"
                          className="w-full"
                        >
                          Resume Work
                        </Button>
                      )}

                      {/* Time logging only */}
                      <Button
                        variant="outline"
                        onClick={() => handleStatusUpdate(selectedTask.id, selectedTask.status, parseFloat(timeLogged) || undefined, statusUpdate)}
                        disabled={!timeLogged}
                        iconName="Clock"
                        className="w-full"
                      >
                        Log Time Only
                      </Button>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-text-primary mb-3">Quick Links</h4>
                    <div className="space-y-2">
                      {selectedTask.pullRequest && (
                        <a
                          href={selectedTask.pullRequest}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full p-2 text-center text-sm border border-border rounded-lg hover:bg-surface transition-colors"
                        >
                          View Pull Request
                        </a>
                      )}
                      <button className="block w-full p-2 text-center text-sm border border-border rounded-lg hover:bg-surface transition-colors">
                        View in Jira/GitHub
                      </button>
                      <button className="block w-full p-2 text-center text-sm border border-border rounded-lg hover:bg-surface transition-colors">
                        Run Local Tests
                      </button>
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

export default Developer;