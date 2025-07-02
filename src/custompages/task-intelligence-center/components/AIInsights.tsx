import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import * as LucideIcons from 'lucide-react';
import { Assignee } from '@/types';

interface Task {
  id: string | number;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: string | Date;
  assignees: Assignee[];
  progress: number;
  attachments: number;
}

interface Recommendation {
  id: number;
  type: string;
  title: string;
  description: string;
  impact: string;
  effort: string;
  action: string;
  icon: string;
  color: string;
}

// interface Prediction {
//   id: number;
//   title: string;
//   prediction: string;
//   confidence: number;
//   timeframe: string;
//   factors: string[];
//   icon: string;
//   trend: string;
// }

// interface Optimization {
//   id: number;
//   type: string;
//   title: string;
//   description: string;
//   impact: string;
//   effort: string;
//   action: string;
//   color: string;
//   tasks: string[];
//   icon: string;
//   status: string;
// }

interface AIInsightsProps {
  tasks: Task[];
  onApplyRecommendation: (recommendation: Recommendation) => void;
}

const AIInsights: React.FC<AIInsightsProps> = ({ tasks, onApplyRecommendation }) => {
  const [activeTab, setActiveTab] = useState<'recommendations' | 'predictions' | 'optimizations'>('recommendations');

  const generateRecommendations = () => {
    const overdueTasks = tasks.filter(task => 
      new Date(task.deadline) < new Date() && task.status !== 'Completed'
    ).length;

    const highPriorityTasks = tasks.filter(task => 
      task.priority === 'High' && task.status !== 'Completed'
    ).length;

    const blockedTasks = tasks.filter(task => 
      task.status === 'Blocked'
    ).length;

    return [
      {
        id: 1,
        type: 'priority',
        title: 'Optimize Task Prioritization',
        description: `You have ${highPriorityTasks} high-priority tasks. Consider redistributing workload to prevent bottlenecks.`,
        impact: 'High',
        effort: 'Medium',
        action: 'Reorder tasks by deadline and dependencies',
        icon: 'TrendingUp',
        color: 'text-warning bg-warning-50 border-warning-200'
      },
      {
        id: 2,
        type: 'deadline',
        title: 'Address Overdue Tasks',
        description: `${overdueTasks} tasks are overdue. Immediate attention required to prevent project delays.`,
        impact: 'Critical',
        effort: 'High',
        action: 'Review and reschedule overdue tasks',
        icon: 'AlertTriangle',
        color: 'text-error bg-error-50 border-error-200'
      },
      {
        id: 3,
        type: 'workflow',
        title: 'Resolve Blocked Tasks',
        description: `${blockedTasks} tasks are currently blocked. Identifying and removing blockers will improve team velocity.`,
        impact: 'Medium',
        effort: 'Low',
        action: 'Identify and resolve task dependencies',
        icon: 'Unlock',
        color: 'text-accent bg-accent-50 border-accent-200'
      },
      {
        id: 4,
        type: 'automation',
        title: 'Automate Recurring Tasks',
        description: 'Detected 12 similar tasks that could be automated to save 4 hours per week.',
        impact: 'Medium',
        effort: 'Medium',
        action: 'Set up task templates and automation rules',
        icon: 'Zap',
        color: 'text-primary bg-primary-50 border-primary-200'
      }
    ];
  };

  const generatePredictions = () => {
    return [
      {
        id: 1,
        title: 'Project Completion Forecast',
        prediction: 'Website Redesign project is 78% likely to complete on time',
        confidence: 78,
        timeframe: 'Next 2 weeks',
        factors: ['Current velocity', 'Resource availability', 'Historical data'],
        icon: 'Target',
        trend: 'positive'
      },
      {
        id: 2,
        title: 'Resource Bottleneck Alert',
        prediction: 'Sarah Johnson may become overloaded by Friday',
        confidence: 85,
        timeframe: 'This week',
        factors: ['Current workload', 'Task complexity', 'Historical performance'],
        icon: 'AlertCircle',
        trend: 'negative'
      },
      {
        id: 3,
        title: 'Quality Risk Assessment',
        prediction: 'Mobile App tasks show 23% higher error rate than average',
        confidence: 67,
        timeframe: 'Current sprint',
        factors: ['Code complexity', 'Team experience', 'Testing coverage'],
        icon: 'Shield',
        trend: 'neutral'
      }
    ];
  };

  const generateOptimizations = () => {
    return [
      {
        id: 1,
        type: 'optimization',
        title: 'Team Workload Balancing',
        description: 'Redistribute 3 tasks from Sarah to Mike to optimize team capacity',
        impact: '+15% team efficiency',
        effort: 'Medium',
        action: 'Reassign tasks',
        color: 'text-primary bg-primary-50 border-primary-200',
        tasks: ['Mobile UI Review', 'API Documentation', 'User Testing'],
        icon: 'Users',
        status: 'recommended'
      },
      {
        id: 2,
        type: 'optimization',
        title: 'Deadline Adjustment',
        description: 'Extend Marketing Campaign deadline by 2 days to ensure quality',
        impact: '+25% success probability',
        effort: 'Low',
        action: 'Extend deadline',
        color: 'text-warning bg-warning-50 border-warning-200',
        tasks: ['Content Creation', 'Design Review'],
        icon: 'Calendar',
        status: 'suggested'
      },
      {
        id: 3,
        type: 'optimization',
        title: 'Dependency Resolution',
        description: 'Parallel execution of Design and Development phases possible',
        impact: '-3 days project timeline',
        effort: 'High',
        action: 'Parallelize tasks',
        color: 'text-success bg-success-50 border-success-200',
        tasks: ['UI Design', 'Backend Development'],
        icon: 'GitBranch',
        status: 'available'
      }
    ];
  };

  const recommendations = generateRecommendations();
  const predictions = generatePredictions();
  const optimizations = generateOptimizations();

  const tabs = [
    { id: 'recommendations', label: 'Recommendations', icon: 'Lightbulb', count: recommendations.length },
    { id: 'predictions', label: 'Predictions', icon: 'TrendingUp', count: predictions.length },
    { id: 'optimizations', label: 'Optimizations', icon: 'Zap', count: optimizations.length }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'critical':
        return 'text-error bg-error-50 border-error-200';
      case 'high':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'medium':
        return 'text-primary bg-primary-50 border-primary-200';
      case 'low':
        return 'text-success bg-success-50 border-success-200';
      default:
        return 'text-text-muted bg-surface border-border';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-text-muted';
    }
  };

  return (
    <div className="bg-white border border-border rounded-lg shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Brain" size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-text-primary">AI Insights</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            className="text-text-muted hover:text-text-primary"
          >
            Refresh
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-surface rounded-lg p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'recommendations' | 'predictions' | 'optimizations')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-text-primary shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon as keyof typeof LucideIcons} size={16} />
              <span>{tab.label}</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            {recommendations.map(rec => (
              <div key={rec.id} className={`border rounded-lg p-4 ${rec.color}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <Icon name={rec.icon as keyof typeof LucideIcons} size={20} className="mt-0.5" />
                    <div>
                      <h4 className="font-medium text-text-primary mb-1">{rec.title}</h4>
                      <p className="text-sm text-text-secondary">{rec.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(rec.impact)}`}>
                      {rec.impact} Impact
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-text-muted">
                    <span>Effort: {rec.effort}</span>
                    <span>•</span>
                    <span>{rec.action}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-text-muted hover:text-text-primary"
                    >
                      Learn More
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onApplyRecommendation(rec as Recommendation)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Predictions Tab */}
        {activeTab === 'predictions' && (
          <div className="space-y-4">
            {predictions.map(pred => (
              <div key={pred.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <Icon name={pred.icon as keyof typeof LucideIcons} size={20} className="mt-0.5 text-text-muted" />
                    <div>
                      <h4 className="font-medium text-text-primary mb-1">{pred.title}</h4>
                      <p className="text-sm text-text-secondary">{pred.prediction}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name={getTrendIcon(pred.trend)} size={16} className={getTrendColor(pred.trend)} />
                    <span className="text-sm font-medium text-text-primary">{pred.confidence}%</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-text-muted">Confidence Level</span>
                    <span className="text-sm font-medium text-text-primary">{pred.confidence}%</span>
                  </div>
                  <div className="w-full bg-surface rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        pred.confidence >= 80 ? 'bg-success' :
                        pred.confidence >= 60 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${pred.confidence}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-text-muted">
                    <span>Timeframe: {pred.timeframe}</span>
                    <span>•</span>
                    <span>Based on: {pred.factors.join(', ')}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ExternalLink"
                    className="text-text-muted hover:text-text-primary"
                  >
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Optimizations Tab */}
        {activeTab === 'optimizations' && (
          <div className="space-y-4">
            {optimizations.map(opt => (
              <div key={opt.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <Icon name={opt.icon as keyof typeof LucideIcons} size={20} className="mt-0.5 text-accent" />
                    <div>
                      <h4 className="font-medium text-text-primary mb-1">{opt.title}</h4>
                      <p className="text-sm text-text-secondary">{opt.description}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-50 text-success border border-success-200">
                    {opt.impact}
                  </span>
                </div>
                
                <div className="mb-3">
                  <span className="text-sm text-text-muted">Affected Tasks:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {opt.tasks.map((task, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-surface text-text-primary">
                        {task}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    opt.status === 'recommended' ? 'bg-primary-50 text-primary border border-primary-200' :
                    opt.status === 'suggested'? 'bg-warning-50 text-warning border border-warning-200' : 'bg-success-50 text-success border border-success-200'
                  }`}>
                    {opt.status}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-text-muted hover:text-text-primary"
                    >
                      Preview
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onApplyRecommendation(opt)}
                    >
                      Apply Optimization
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;