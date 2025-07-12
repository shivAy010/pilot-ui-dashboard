import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';
import { DeveloperTask } from './Developer';

// QA uses similar task structure as Developer
type QATask = DeveloperTask;

const QAEngineer: React.FC = () => {
  const [tasks, setTasks] = useState<QATask[]>([]);
  const [selectedTask, setSelectedTask] = useState<QATask | null>(null);
  const [filter, setFilter] = useState<'all' | 'assigned' | 'testing' | 'failed'>('assigned');
  const [isLoading, setIsLoading] = useState(true);
  const [testResults, setTestResults] = useState('');
  const [bugReport, setBugReport] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setTasks([
        {
          id: 'QA-001',
          title: 'Test real-time chat feature',
          description: 'Comprehensive testing of WebSocket chat system including functional, performance, and security testing.',
          type: 'feature',
          priority: 'high',
          status: 'testing',
          assignee: 'Current QA',
          reporter: 'Product Manager',
          estimatedHours: 16,
          actualHours: 8,
          createdAt: '2024-07-02T10:00:00Z',
          dueDate: '2024-07-08T17:00:00Z',
          tags: ['testing', 'chat', 'websocket', 'integration'],
          testCases: [
            'Verify real-time message delivery',
            'Test file upload/download functionality',
            'Validate message persistence',
            'Check typing indicators',
            'Test connection handling'
          ]
        },
        {
          id: 'QA-002',
          title: 'Regression testing for appointment booking',
          description: 'Full regression testing suite for appointment booking system after timezone fixes.',
          type: 'bug',
          priority: 'critical',
          status: 'todo',
          assignee: 'Current QA',
          reporter: 'Dev Team',
          estimatedHours: 12,
          createdAt: '2024-07-04T14:00:00Z',
          dueDate: '2024-07-09T17:00:00Z',
          tags: ['regression', 'booking', 'timezone', 'critical'],
          testCases: [
            'Test booking across different timezones',
            'Verify appointment time display',
            'Check calendar integration',
            'Validate email notifications'
          ]
        },
        {
          id: 'QA-003',
          title: 'Performance testing - Doctor search',
          description: 'Load and performance testing for optimized doctor search functionality.',
          type: 'enhancement',
          priority: 'medium',
          status: 'in_progress',
          assignee: 'Current QA',
          reporter: 'DevOps Team',
          estimatedHours: 20,
          actualHours: 6,
          createdAt: '2024-06-30T11:00:00Z',
          dueDate: '2024-07-12T17:00:00Z',
          tags: ['performance', 'search', 'load-testing'],
          testCases: [
            'Test search with 10k+ concurrent users',
            'Validate response times under load',
            'Check memory usage during peak load',
            'Test search accuracy under stress'
          ]
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleStatusUpdate = (taskId: string, newStatus: QATask['status'], testNote?: string) => {
    setTasks(prev => prev.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
    setSelectedTask(null);
    setTestResults('');
    setBugReport('');
    console.log(`Task ${taskId} updated to ${newStatus}${testNote ? ` with note: ${testNote}` : ''}`);
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
      case 'testing': return 'text-primary bg-primary-50 border-primary-200';
      case 'review': return 'text-info bg-info-50 border-info-200';
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
      default: return 'TestTube';
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'assigned': return task.assignee === 'Current QA' && task.status !== 'done';
      case 'testing': return task.status === 'testing';
      case 'failed': return task.status === 'blocked';
      default: return true;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading QA tasks...</p>
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
              <Icon name="TestTube" size={20} className="text-primary sm:w-6 sm:h-6" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary">QA Testing Dashboard</h1>
                <p className="text-sm sm:text-base text-text-secondary">Manage testing tasks and quality assurance</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="bg-error-50 border border-error-200 rounded-lg px-3 sm:px-4 py-2 w-full sm:w-auto">
                <span className="text-error font-medium text-sm">{tasks.filter(t => t.priority === 'critical' && t.status !== 'done').length} Critical</span>
              </div>
              <div className="bg-primary-50 border border-primary-200 rounded-lg px-3 sm:px-4 py-2 w-full sm:w-auto">
                <span className="text-primary font-medium text-sm">{tasks.filter(t => t.status === 'testing').length} Testing</span>
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
              { key: 'assigned', label: 'My Tasks', count: tasks.filter(t => t.assignee === 'Current QA' && t.status !== 'done').length },
              { key: 'testing', label: 'Testing', count: tasks.filter(t => t.status === 'testing').length },
              { key: 'failed', label: 'Failed', count: tasks.filter(t => t.status === 'blocked').length },
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
                            <Icon name="Tag" size={12} className="sm:w-3.5 sm:h-3.5" />
                            <span className="truncate">{task.tags.slice(0, 2).join(', ')}</span>
                            {task.tags.length > 2 && <span>+{task.tags.length - 2}</span>}
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
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs sm:text-sm font-mono text-text-muted">{selectedTask.id}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedTask.status)}`}>
                        {selectedTask.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-text-primary break-words">{selectedTask.title}</h2>
                    <p className="text-xs sm:text-sm text-text-muted capitalize">
                      {selectedTask.type} • Priority: {selectedTask.priority}
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
                  <h3 className="text-lg font-semibold text-text-primary">Test Details</h3>
                  
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
                      <label className="text-sm font-medium text-text-secondary">Test Cases</label>
                      <div className="mt-2 space-y-2">
                        {selectedTask.testCases?.map((testCase, index) => (
                          <div key={index} className="flex items-start space-x-2 p-2 bg-surface rounded border">
                            <Icon name="CheckSquare" size={14} className="text-success mt-0.5 flex-shrink-0" />
                            <span className="text-text-primary text-sm">{testCase}</span>
                          </div>
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

                {/* Actions & Results */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-text-primary">Test Results & Actions</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Test Results
                    </label>
                    <textarea
                      value={testResults}
                      onChange={(e) => setTestResults(e.target.value)}
                      placeholder="Document test execution results, observations, and any issues found..."
                      className="w-full h-32 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Bug Report
                    </label>
                    <textarea
                      value={bugReport}
                      onChange={(e) => setBugReport(e.target.value)}
                      placeholder="Report any bugs found during testing with steps to reproduce..."
                      className="w-full h-32 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => handleStatusUpdate(selectedTask.id, 'testing', testResults)}
                      iconName="Play"
                      className="w-full"
                    >
                      Start Testing
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleStatusUpdate(selectedTask.id, 'done', testResults)}
                      iconName="CheckCircle"
                      className="w-full text-success border-success-200 hover:bg-success-50"
                    >
                      Mark as Passed
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleStatusUpdate(selectedTask.id, 'blocked', bugReport)}
                      iconName="AlertTriangle"
                      className="w-full text-error border-error-200 hover:bg-error-50"
                    >
                      Mark as Failed
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleStatusUpdate(selectedTask.id, 'review', testResults)}
                      iconName="MessageSquare"
                      className="w-full text-info border-info-200 hover:bg-info-50"
                    >
                      Send for Review
                    </Button>
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

export default QAEngineer;