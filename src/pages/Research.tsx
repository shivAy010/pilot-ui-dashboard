import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

interface ResearchTask {
  id: string;
  title: string;
  description: string;
  type: 'market_research' | 'competitor_analysis' | 'user_study' | 'data_analysis' | 'report';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'data_collection' | 'analysis' | 'completed' | 'on_hold';
  assignee: string;
  deadline: string;
  createdAt: string;
  researchMethod: string;
  targetDemographic: string;
  deliverables: string[];
  documentsUploaded: number;
  progressPercentage: number;
}

const Research: React.FC = () => {
  const [tasks, setTasks] = useState<ResearchTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<ResearchTask | null>(null);
  const [filter, setFilter] = useState<'all' | 'assigned' | 'urgent' | 'completed'>('assigned');
  const [isLoading, setIsLoading] = useState(true);
  const [researchNotes, setResearchNotes] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setTasks([
        {
          id: 'RES-001',
          title: 'Healthcare Market Analysis - Tier 2 Cities',
          description: 'Comprehensive market research on healthcare demand and supply in tier 2 cities across India. Focus on digital health adoption rates and patient preferences.',
          type: 'market_research',
          priority: 'high',
          status: 'in_progress',
          assignee: 'Current Researcher',
          deadline: '2024-07-15T17:00:00Z',
          createdAt: '2024-07-02T09:00:00Z',
          researchMethod: 'Mixed methods: Surveys, Interviews, Data Analysis',
          targetDemographic: 'Adults 25-65 in tier 2 cities',
          deliverables: [
            'Market size analysis report',
            'Competitor landscape overview',
            'Patient behavior insights',
            'Recommendations for market entry'
          ],
          documentsUploaded: 8,
          progressPercentage: 65
        },
        {
          id: 'RES-002',
          title: 'Telemedicine Adoption Study',
          description: 'Research on telemedicine adoption patterns post-COVID, focusing on patient satisfaction and doctor comfort levels with digital consultations.',
          type: 'user_study',
          priority: 'medium',
          status: 'data_collection',
          assignee: 'Current Researcher',
          deadline: '2024-07-20T17:00:00Z',
          createdAt: '2024-06-28T14:30:00Z',
          researchMethod: 'Survey and interview-based study',
          targetDemographic: 'Patients and doctors using telemedicine',
          deliverables: [
            'User experience analysis',
            'Adoption barrier identification',
            'Feature preference mapping',
            'Improvement recommendations'
          ],
          documentsUploaded: 15,
          progressPercentage: 40
        },
        {
          id: 'RES-003',
          title: 'Competitor Analysis - Digital Health Platforms',
          description: 'Detailed analysis of competing digital health platforms, their features, pricing strategies, and market positioning.',
          type: 'competitor_analysis',
          priority: 'high',
          status: 'pending',
          assignee: 'Current Researcher',
          deadline: '2024-07-12T17:00:00Z',
          createdAt: '2024-07-05T11:15:00Z',
          researchMethod: 'Desk research and feature analysis',
          targetDemographic: 'Competing platforms and their users',
          deliverables: [
            'Competitive landscape map',
            'Feature comparison matrix',
            'Pricing analysis',
            'Strategic recommendations'
          ],
          documentsUploaded: 3,
          progressPercentage: 15
        },
        {
          id: 'RES-004',
          title: 'Patient Journey Mapping Study',
          description: 'Research to understand the complete patient journey from symptom onset to treatment completion, identifying pain points and opportunities.',
          type: 'user_study',
          priority: 'medium',
          status: 'completed',
          assignee: 'Current Researcher',
          deadline: '2024-07-01T17:00:00Z',
          createdAt: '2024-06-20T10:00:00Z',
          researchMethod: 'Ethnographic study and journey mapping',
          targetDemographic: 'Patients across various specialties',
          deliverables: [
            'Patient journey maps',
            'Pain point analysis',
            'Opportunity identification',
            'Service design recommendations'
          ],
          documentsUploaded: 22,
          progressPercentage: 100
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleStatusUpdate = (taskId: string, newStatus: ResearchTask['status'], notes?: string) => {
    setTasks(prev => prev.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
    setSelectedTask(null);
    setResearchNotes('');
    console.log(`Task ${taskId} updated to ${newStatus}${notes ? ` with notes: ${notes}` : ''}`);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
      // In real implementation, upload files to server
      console.log('Files uploaded:', fileNames);
    }
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
      case 'pending': return 'text-text-muted bg-surface border-border';
      case 'in_progress': return 'text-primary bg-primary-50 border-primary-200';
      case 'data_collection': return 'text-info bg-info-50 border-info-200';
      case 'analysis': return 'text-warning bg-warning-50 border-warning-200';
      case 'completed': return 'text-success bg-success-50 border-success-200';
      case 'on_hold': return 'text-error bg-error-50 border-error-200';
      default: return 'text-text-muted bg-surface border-border';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'market_research': return 'BarChart';
      case 'competitor_analysis': return 'TrendingUp';
      case 'user_study': return 'Users';
      case 'data_analysis': return 'PieChart';
      case 'report': return 'FileText';
      default: return 'Search';
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'assigned': return task.assignee === 'Current Researcher' && task.status !== 'completed';
      case 'urgent': return task.priority === 'high' && task.status !== 'completed';
      case 'completed': return task.status === 'completed';
      default: return true;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading research tasks...</p>
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
              <Icon name="Search" size={20} className="text-primary sm:w-6 sm:h-6" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary">Research Center</h1>
                <p className="text-sm sm:text-base text-text-secondary">Market research and analysis tasks</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="bg-error-50 border border-error-200 rounded-lg px-3 sm:px-4 py-2 w-full sm:w-auto">
                <span className="text-error font-medium text-sm">{tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length} High Priority</span>
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
              { key: 'assigned', label: 'My Tasks', count: tasks.filter(t => t.assignee === 'Current Researcher' && t.status !== 'completed').length },
              { key: 'urgent', label: 'Urgent', count: tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length },
              { key: 'completed', label: 'Completed', count: tasks.filter(t => t.status === 'completed').length },
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
                            <Icon name="Calendar" size={12} className="sm:w-3.5 sm:h-3.5" />
                            <span className="truncate">Due: {new Date(task.deadline).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="FileText" size={12} className="sm:w-3.5 sm:h-3.5" />
                            <span>{task.documentsUploaded} documents</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="TrendingUp" size={12} className="sm:w-3.5 sm:h-3.5" />
                            <span>{task.progressPercentage}% complete</span>
                          </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${task.progressPercentage}%` }}
                            ></div>
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
                      {selectedTask.type.replace('_', ' ')} • Priority: {selectedTask.priority}
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
                {/* Research Details */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-text-primary">Research Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Description</label>
                      <p className="text-text-primary text-sm">{selectedTask.description}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Research Method</label>
                        <p className="text-text-primary text-sm">{selectedTask.researchMethod}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Target Demographic</label>
                        <p className="text-text-primary text-sm">{selectedTask.targetDemographic}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Progress</label>
                        <p className="text-text-primary text-sm">{selectedTask.progressPercentage}% complete</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Documents</label>
                        <p className="text-text-primary text-sm">{selectedTask.documentsUploaded} uploaded</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-text-secondary">Expected Deliverables</label>
                      <div className="mt-2 space-y-2">
                        {selectedTask.deliverables.map((deliverable, index) => (
                          <div key={index} className="flex items-start space-x-2 p-2 bg-surface rounded border">
                            <Icon name="FileText" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-text-primary text-sm">{deliverable}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Progress Overview</label>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-primary h-3 rounded-full transition-all duration-300" 
                            style={{ width: `${selectedTask.progressPercentage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-text-muted mt-1">{selectedTask.progressPercentage}% completed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions & Documents */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-text-primary">Actions & Documents</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Research Notes
                    </label>
                    <textarea
                      value={researchNotes}
                      onChange={(e) => setResearchNotes(e.target.value)}
                      placeholder="Add research findings, observations, methodology notes..."
                      className="w-full h-32 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Upload Documents
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      accept=".pdf,.doc,.docx,.xlsx,.ppt,.pptx"
                    />
                    {uploadedFiles.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center space-x-2 text-xs text-text-muted">
                            <Icon name="Check" size={12} className="text-success" />
                            <span>{file}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => handleStatusUpdate(selectedTask.id, 'in_progress', researchNotes)}
                      iconName="Play"
                      className="w-full"
                    >
                      Start Research
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleStatusUpdate(selectedTask.id, 'data_collection', researchNotes)}
                      iconName="Database"
                      className="w-full text-info border-info-200 hover:bg-info-50"
                    >
                      Begin Data Collection
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleStatusUpdate(selectedTask.id, 'analysis', researchNotes)}
                      iconName="BarChart"
                      className="w-full text-warning border-warning-200 hover:bg-warning-50"
                    >
                      Start Analysis
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleStatusUpdate(selectedTask.id, 'completed', researchNotes)}
                      iconName="CheckCircle"
                      className="w-full text-success border-success-200 hover:bg-success-50"
                    >
                      Mark as Completed
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleStatusUpdate(selectedTask.id, 'on_hold', researchNotes)}
                      iconName="Pause"
                      className="w-full text-error border-error-200 hover:bg-error-50"
                    >
                      Put on Hold
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

export default Research;