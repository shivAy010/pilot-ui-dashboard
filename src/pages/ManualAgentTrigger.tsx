import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

interface AgentOption {
  id: string;
  name: string;
  description: string;
  category: 'analytics' | 'operations' | 'marketing' | 'finance';
  parameters: {
    name: string;
    type: 'text' | 'number' | 'select' | 'boolean';
    required: boolean;
    description: string;
    options?: string[];
  }[];
}

const ManualAgentTrigger: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentOption | null>(null);
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const agentOptions: AgentOption[] = [
    {
      id: 'provider_score_calc',
      name: 'Provider Score Calculator',
      description: 'Recalculate performance scores for specific providers based on recent activity and reviews.',
      category: 'analytics',
      parameters: [
        {
          name: 'provider_id',
          type: 'text',
          required: true,
          description: 'Provider ID to recalculate score for'
        },
        {
          name: 'include_reviews',
          type: 'boolean',
          required: false,
          description: 'Include recent patient reviews in calculation'
        },
        {
          name: 'time_period',
          type: 'select',
          required: false,
          description: 'Time period for data analysis',
          options: ['30_days', '60_days', '90_days', '6_months']
        }
      ]
    },
    {
      id: 'market_analysis',
      name: 'Market Analysis Agent',
      description: 'Analyze market opportunities and competitive landscape for potential expansion.',
      category: 'operations',
      parameters: [
        {
          name: 'city',
          type: 'text',
          required: true,
          description: 'Target city for market analysis'
        },
        {
          name: 'state',
          type: 'text',
          required: true,
          description: 'State code (e.g., TX, CA, NY)'
        },
        {
          name: 'analysis_depth',
          type: 'select',
          required: false,
          description: 'Depth of market analysis',
          options: ['basic', 'standard', 'comprehensive']
        }
      ]
    },
    {
      id: 'lead_optimizer',
      name: 'Lead Generation Optimizer',
      description: 'Optimize lead generation campaigns and analyze conversion rates.',
      category: 'marketing',
      parameters: [
        {
          name: 'campaign_id',
          type: 'text',
          required: false,
          description: 'Specific campaign ID to optimize (leave empty for all active campaigns)'
        },
        {
          name: 'optimization_type',
          type: 'select',
          required: true,
          description: 'Type of optimization to perform',
          options: ['conversion', 'cost_per_lead', 'quality_score', 'all']
        },
        {
          name: 'budget_limit',
          type: 'number',
          required: false,
          description: 'Maximum budget for optimization changes'
        }
      ]
    },
    {
      id: 'financial_analyzer',
      name: 'Financial Performance Analyzer',
      description: 'Analyze financial metrics and generate budget recommendations.',
      category: 'finance',
      parameters: [
        {
          name: 'analysis_period',
          type: 'select',
          required: true,
          description: 'Period for financial analysis',
          options: ['current_month', 'current_quarter', 'last_quarter', 'ytd']
        },
        {
          name: 'include_projections',
          type: 'boolean',
          required: false,
          description: 'Include future projections in analysis'
        },
        {
          name: 'department',
          type: 'select',
          required: false,
          description: 'Specific department to analyze (leave empty for all)',
          options: ['marketing', 'operations', 'hr', 'all']
        }
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'analytics': return 'text-primary bg-primary-50 border-primary-200';
      case 'operations': return 'text-success bg-success-50 border-success-200';
      case 'marketing': return 'text-warning bg-warning-50 border-warning-200';
      case 'finance': return 'text-accent bg-accent-50 border-accent-200';
      default: return 'text-text-muted bg-surface border-border';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'analytics': return 'BarChart3';
      case 'operations': return 'Settings';
      case 'marketing': return 'Megaphone';
      case 'finance': return 'DollarSign';
      default: return 'Bot';
    }
  };

  const handleAgentSelect = (agent: AgentOption) => {
    setSelectedAgent(agent);
    // Initialize parameters with default values
    const initialParams: Record<string, any> = {};
    agent.parameters.forEach(param => {
      if (param.type === 'boolean') {
        initialParams[param.name] = false;
      } else {
        initialParams[param.name] = '';
      }
    });
    setParameters(initialParams);
  };

  const handleParameterChange = (paramName: string, value: any) => {
    setParameters(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  const handleTriggerAgent = async () => {
    if (!selectedAgent) return;

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      console.log('Triggering agent:', selectedAgent.id, 'with parameters:', parameters);
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setSelectedAgent(null);
      setParameters({});
      
      // Show success (you might want to use a toast here)
      alert('Agent triggered successfully!');
    } catch (error) {
      console.error('Failed to trigger agent:', error);
      alert('Failed to trigger agent. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    if (!selectedAgent) return false;
    
    // Check required parameters
    return selectedAgent.parameters
      .filter(param => param.required)
      .every(param => {
        const value = parameters[param.name];
        return value !== '' && value !== null && value !== undefined;
      });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Zap" size={24} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Manual Agent Trigger</h1>
                <p className="text-text-secondary">Manually trigger AI agents for testing and special operations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agent Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-6">Select Agent</h2>
              <div className="space-y-3">
                {agentOptions.map((agent) => (
                  <div
                    key={agent.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedAgent?.id === agent.id
                        ? 'border-primary bg-primary-50'
                        : 'border-border hover:border-primary-200 hover:bg-primary-50'
                    }`}
                    onClick={() => handleAgentSelect(agent)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Icon name={getCategoryIcon(agent.category)} size={18} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-text-primary">{agent.name}</h3>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border mb-2 ${getCategoryColor(agent.category)}`}>
                          {agent.category.charAt(0).toUpperCase() + agent.category.slice(1)}
                        </span>
                        <p className="text-sm text-text-secondary">{agent.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Parameter Configuration */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-6">Configure Parameters</h2>
              
              {selectedAgent ? (
                <div className="space-y-6">
                  <div className="bg-surface rounded-lg p-4">
                    <h3 className="font-medium text-text-primary mb-2">{selectedAgent.name}</h3>
                    <p className="text-text-secondary">{selectedAgent.description}</p>
                  </div>

                  <div className="space-y-4">
                    {selectedAgent.parameters.map((param) => (
                      <div key={param.name}>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          {param.name.replace('_', ' ').charAt(0).toUpperCase() + param.name.replace('_', ' ').slice(1)}
                          {param.required && <span className="text-error ml-1">*</span>}
                        </label>
                        <p className="text-sm text-text-muted mb-2">{param.description}</p>
                        
                        {param.type === 'text' && (
                          <input
                            type="text"
                            value={parameters[param.name] || ''}
                            onChange={(e) => handleParameterChange(param.name, e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder={`Enter ${param.name}`}
                          />
                        )}
                        
                        {param.type === 'number' && (
                          <input
                            type="number"
                            value={parameters[param.name] || ''}
                            onChange={(e) => handleParameterChange(param.name, Number(e.target.value))}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder={`Enter ${param.name}`}
                          />
                        )}
                        
                        {param.type === 'select' && param.options && (
                          <select
                            value={parameters[param.name] || ''}
                            onChange={(e) => handleParameterChange(param.name, e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="">Select option</option>
                            {param.options.map((option) => (
                              <option key={option} value={option}>
                                {option.replace('_', ' ').charAt(0).toUpperCase() + option.replace('_', ' ').slice(1)}
                              </option>
                            ))}
                          </select>
                        )}
                        
                        {param.type === 'boolean' && (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={parameters[param.name] || false}
                              onChange={(e) => handleParameterChange(param.name, e.target.checked)}
                              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                            />
                            <span className="ml-2 text-sm text-text-secondary">Enable this option</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedAgent(null)}
                      className="text-text-secondary hover:text-text-primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      iconName="Zap"
                      onClick={handleTriggerAgent}
                      disabled={!isFormValid() || isSubmitting}
                      className={isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      {isSubmitting ? 'Triggering...' : 'Trigger Agent'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="MousePointer" size={48} className="text-text-muted mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-text-primary mb-2">Select an Agent</h3>
                  <p className="text-text-secondary">Choose an agent from the list to configure its parameters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualAgentTrigger;