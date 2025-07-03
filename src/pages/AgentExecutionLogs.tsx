import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

interface AgentExecution {
  id: string;
  agentName: string;
  taskType: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: string;
  endTime?: string;
  duration?: number;
  logs: string[];
  error?: string;
  entityId?: string;
  parameters: Record<string, any>;
}

const AgentExecutionLogs: React.FC = () => {
  const [executions, setExecutions] = useState<AgentExecution[]>([]);
  const [selectedExecution, setSelectedExecution] = useState<AgentExecution | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'running' | 'completed' | 'failed'>('all');

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setExecutions([
        {
          id: '1',
          agentName: 'Provider Score Calculator',
          taskType: 'score_calculation',
          status: 'completed',
          startTime: '2024-07-02T14:30:00Z',
          endTime: '2024-07-02T14:32:15Z',
          duration: 135,
          logs: [
            'Starting provider score calculation for provider ID: PROV_001',
            'Fetching patient reviews and ratings',
            'Calculating performance metrics',
            'Updating provider score: 4.8/5.0',
            'Execution completed successfully'
          ],
          entityId: 'PROV_001',
          parameters: { provider_id: 'PROV_001', include_reviews: true }
        },
        {
          id: '2',
          agentName: 'Market Analysis Agent',
          taskType: 'market_expansion',
          status: 'running',
          startTime: '2024-07-02T15:00:00Z',
          logs: [
            'Initiating market analysis for Austin, TX',
            'Collecting demographic data',
            'Analyzing competitor presence'
          ],
          entityId: 'MARKET_AUSTIN',
          parameters: { city: 'Austin', state: 'TX', analysis_depth: 'comprehensive' }
        },
        {
          id: '3',
          agentName: 'Lead Generation Optimizer',
          taskType: 'lead_optimization',
          status: 'failed',
          startTime: '2024-07-02T13:15:00Z',
          endTime: '2024-07-02T13:16:30Z',
          duration: 75,
          logs: [
            'Starting lead optimization analysis',
            'Connecting to analytics database',
            'Error: Database connection timeout'
          ],
          error: 'Database connection timeout after 60 seconds',
          parameters: { campaign_id: 'CAMP_Q4_2024', optimization_type: 'conversion' }
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success bg-success-50 border-success-200';
      case 'running': return 'text-primary bg-primary-50 border-primary-200';
      case 'failed': return 'text-error bg-error-50 border-error-200';
      case 'cancelled': return 'text-text-muted bg-surface border-border';
      default: return 'text-text-muted bg-surface border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'running': return 'Loader';
      case 'failed': return 'XCircle';
      case 'cancelled': return 'StopCircle';
      default: return 'Circle';
    }
  };

  const filteredExecutions = filter === 'all' ? executions : executions.filter(exec => exec.status === filter);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading execution logs...</p>
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
              <Icon name="Terminal" size={24} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Agent Execution Logs</h1>
                <p className="text-text-secondary">Monitor and debug AI agent workflows</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-primary-50 border border-primary-200 rounded-lg px-4 py-2">
                <span className="text-primary font-medium">{executions.filter(e => e.status === 'running').length} Running</span>
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
              { key: 'all', label: 'All Executions', count: executions.length },
              { key: 'running', label: 'Running', count: executions.filter(e => e.status === 'running').length },
              { key: 'completed', label: 'Completed', count: executions.filter(e => e.status === 'completed').length },
              { key: 'failed', label: 'Failed', count: executions.filter(e => e.status === 'failed').length }
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
            {filteredExecutions.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Terminal" size={48} className="text-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No executions found</h3>
                <p className="text-text-secondary">No agent executions match the current filter.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredExecutions.map((execution) => (
                  <div
                    key={execution.id}
                    className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedExecution(execution)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          <Icon 
                            name={getStatusIcon(execution.status)} 
                            size={20} 
                            className={`${execution.status === 'running' ? 'animate-spin' : ''} ${
                              execution.status === 'completed' ? 'text-success' : 
                              execution.status === 'failed' ? 'text-error' : 'text-primary'
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-text-primary">{execution.agentName}</h3>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(execution.status)}`}>
                              {execution.status.charAt(0).toUpperCase() + execution.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-text-secondary mb-3 capitalize">{execution.taskType.replace('_', ' ')}</p>
                          <div className="flex items-center space-x-6 text-sm text-text-muted">
                            <div className="flex items-center space-x-1">
                              <Icon name="Clock" size={14} />
                              <span>Started {new Date(execution.startTime).toLocaleString()}</span>
                            </div>
                            {execution.duration && (
                              <div className="flex items-center space-x-1">
                                <Icon name="Timer" size={14} />
                                <span>{execution.duration}s</span>
                              </div>
                            )}
                            {execution.entityId && (
                              <div className="flex items-center space-x-1">
                                <Icon name="Tag" size={14} />
                                <span>{execution.entityId}</span>
                              </div>
                            )}
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

      {/* Execution Detail Modal */}
      {selectedExecution && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-text-primary">Execution Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setSelectedExecution(null)}
                  className="text-text-muted hover:text-text-primary"
                />
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Execution Info</h4>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="text-text-muted">Agent:</span> {selectedExecution.agentName}</p>
                      <p className="text-sm"><span className="text-text-muted">Task Type:</span> {selectedExecution.taskType}</p>
                      <p className="text-sm"><span className="text-text-muted">Status:</span> 
                        <span className={`ml-1 px-2 py-1 rounded text-xs ${getStatusColor(selectedExecution.status)}`}>
                          {selectedExecution.status}
                        </span>
                      </p>
                      {selectedExecution.entityId && (
                        <p className="text-sm"><span className="text-text-muted">Entity ID:</span> {selectedExecution.entityId}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Timeline</h4>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="text-text-muted">Started:</span> {new Date(selectedExecution.startTime).toLocaleString()}</p>
                      {selectedExecution.endTime && (
                        <p className="text-sm"><span className="text-text-muted">Ended:</span> {new Date(selectedExecution.endTime).toLocaleString()}</p>
                      )}
                      {selectedExecution.duration && (
                        <p className="text-sm"><span className="text-text-muted">Duration:</span> {selectedExecution.duration} seconds</p>
                      )}
                    </div>
                  </div>
                </div>

                {Object.keys(selectedExecution.parameters).length > 0 && (
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Parameters</h4>
                    <div className="bg-surface rounded-lg p-4">
                      <pre className="text-sm text-text-secondary overflow-x-auto">
                        {JSON.stringify(selectedExecution.parameters, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-text-primary mb-3">Execution Logs</h4>
                  <div className="bg-text-primary rounded-lg p-4 font-mono text-sm max-h-96 overflow-y-auto">
                    {selectedExecution.logs.map((log, index) => (
                      <div key={index} className="text-text-inverse mb-1">
                        <span className="text-text-muted mr-2">[{index + 1}]</span>
                        {log}
                      </div>
                    ))}
                    {selectedExecution.error && (
                      <div className="text-error mt-2">
                        <span className="text-text-muted mr-2">[ERROR]</span>
                        {selectedExecution.error}
                      </div>
                    )}
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

export default AgentExecutionLogs;