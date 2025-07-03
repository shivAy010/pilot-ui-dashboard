import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

interface Decision {
  id: string;
  title: string;
  description: string;
  type: 'city_expansion' | 'budget_allocation' | 'policy_change';
  priority: 'high' | 'medium' | 'low';
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  impact: string;
  estimatedCost?: string;
  timeline?: string;
}

const DecisionHub: React.FC = () => {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setDecisions([
        {
          id: '1',
          title: 'Expand to Austin, Texas',
          description: 'AI agent proposes expanding healthcare services to Austin market based on demand analysis and competitive landscape review.',
          type: 'city_expansion',
          priority: 'high',
          submittedBy: 'Market Analysis Agent',
          submittedAt: '2024-07-02T09:00:00Z',
          status: 'pending',
          impact: 'Potential 15% revenue increase, serving 50,000+ new patients',
          estimatedCost: '$2.3M',
          timeline: '6-8 months'
        },
        {
          id: '2',
          title: 'Increase Marketing Budget by 25%',
          description: 'Performance data suggests increasing digital marketing spend would improve patient acquisition rates significantly.',
          type: 'budget_allocation',
          priority: 'medium',
          submittedBy: 'Performance Analytics Agent',
          submittedAt: '2024-07-02T11:30:00Z',
          status: 'pending',
          impact: 'Expected 30% increase in patient acquisition',
          estimatedCost: '$500K additional quarterly',
          timeline: '1 month implementation'
        },
        {
          id: '3',
          title: 'Update Provider Payment Policy',
          description: 'Recommend adjusting provider compensation structure to improve retention rates based on market analysis.',
          type: 'policy_change',
          priority: 'medium',
          submittedBy: 'HR Analytics Agent',
          submittedAt: '2024-07-01T16:45:00Z',
          status: 'pending',
          impact: 'Improve provider retention by 20%',
          timeline: '2-3 months rollout'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleDecisionClick = (decision: Decision) => {
    setSelectedDecision(decision);
  };

  const handleCloseModal = () => {
    setSelectedDecision(null);
  };

  const handleApprove = (decisionId: string) => {
    setDecisions(prev => 
      prev.map(d => d.id === decisionId ? { ...d, status: 'approved' as const } : d)
    );
    setSelectedDecision(null);
  };

  const handleReject = (decisionId: string) => {
    setDecisions(prev => 
      prev.map(d => d.id === decisionId ? { ...d, status: 'rejected' as const } : d)
    );
    setSelectedDecision(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-error bg-error-50 border-error-200';
      case 'medium': return 'text-warning bg-warning-50 border-warning-200';
      case 'low': return 'text-success bg-success-50 border-success-200';
      default: return 'text-text-muted bg-surface border-border';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'city_expansion': return 'MapPin';
      case 'budget_allocation': return 'DollarSign';
      case 'policy_change': return 'FileText';
      default: return 'AlertCircle';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading decisions...</p>
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
              <Icon name="Target" size={24} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Decision Hub</h1>
                <p className="text-text-secondary">Review and approve AI-generated business proposals</p>
              </div>
            </div>
            <div className="bg-primary-50 border border-primary-200 rounded-lg px-4 py-2">
              <span className="text-primary font-medium">{decisions.filter(d => d.status === 'pending').length} Pending Decisions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-border">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-6">Pending Decisions</h2>
            
            {decisions.filter(d => d.status === 'pending').length === 0 ? (
              <div className="text-center py-12">
                <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">All decisions reviewed!</h3>
                <p className="text-text-secondary">No pending decisions require your attention.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {decisions.filter(d => d.status === 'pending').map((decision) => (
                  <div
                    key={decision.id}
                    className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleDecisionClick(decision)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          <Icon name={getTypeIcon(decision.type)} size={20} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-text-primary">{decision.title}</h3>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(decision.priority)}`}>
                              {decision.priority.charAt(0).toUpperCase() + decision.priority.slice(1)}
                            </span>
                          </div>
                          <p className="text-text-secondary mb-3">{decision.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-text-muted">
                            <div className="flex items-center space-x-1">
                              <Icon name="Bot" size={14} />
                              <span>{decision.submittedBy}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="Clock" size={14} />
                              <span>{new Date(decision.submittedAt).toLocaleDateString()}</span>
                            </div>
                            {decision.estimatedCost && (
                              <div className="flex items-center space-x-1">
                                <Icon name="DollarSign" size={14} />
                                <span>{decision.estimatedCost}</span>
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

      {/* Decision Detail Modal */}
      {selectedDecision && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-text-primary">Decision Details</h2>
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
                    <h3 className="text-xl font-semibold text-text-primary">{selectedDecision.title}</h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(selectedDecision.priority)}`}>
                      {selectedDecision.priority.charAt(0).toUpperCase() + selectedDecision.priority.slice(1)} Priority
                    </span>
                  </div>
                  <p className="text-text-secondary">{selectedDecision.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Expected Impact</h4>
                    <p className="text-text-secondary">{selectedDecision.impact}</p>
                  </div>
                  {selectedDecision.estimatedCost && (
                    <div>
                      <h4 className="font-medium text-text-primary mb-3">Estimated Cost</h4>
                      <p className="text-text-secondary">{selectedDecision.estimatedCost}</p>
                    </div>
                  )}
                  {selectedDecision.timeline && (
                    <div>
                      <h4 className="font-medium text-text-primary mb-3">Timeline</h4>
                      <p className="text-text-secondary">{selectedDecision.timeline}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Submitted By</h4>
                    <p className="text-text-secondary">{selectedDecision.submittedBy}</p>
                    <p className="text-sm text-text-muted">{new Date(selectedDecision.submittedAt).toLocaleString()}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handleCloseModal}
                    className="text-text-secondary hover:text-text-primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    iconName="XCircle"
                    onClick={() => handleReject(selectedDecision.id)}
                    className="text-error hover:text-error border-error-200 hover:bg-error-50"
                  >
                    Reject
                  </Button>
                  <Button
                    variant="primary"
                    iconName="CheckCircle"
                    onClick={() => handleApprove(selectedDecision.id)}
                  >
                    Approve Decision
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecisionHub;