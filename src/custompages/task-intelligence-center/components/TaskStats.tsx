import React from 'react';
import Icon from '../../../components/AppIcon';
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

// interface StatCard {
//   title: string;
//   value: number;
//   icon: string;
//   color: string;
//   change: string;
//   changeType: 'positive' | 'negative';
// }

// interface PerformanceMetric {
//   title: string;
//   value: string | number;
//   icon: string;
//   description: string;
//   progress: number;
// }

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const calculateStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'Completed').length;
    const inProgress = tasks.filter(task => task.status === 'In Progress').length;
    const pending = tasks.filter(task => task.status === 'Pending').length;
    const blocked = tasks.filter(task => task.status === 'Blocked').length;
    const overdue = tasks.filter(task => 
      new Date(task.deadline) < new Date() && task.status !== 'Completed'
    ).length;
    const highPriority = tasks.filter(task => task.priority === 'High').length;
    
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    const avgProgress = total > 0 ? Math.round(
      tasks.reduce((sum, task) => sum + task.progress, 0) / total
    ) : 0;

    return {
      total,
      completed,
      inProgress,
      pending,
      blocked,
      overdue,
      highPriority,
      completionRate,
      avgProgress
    };
  };

  const stats = calculateStats();

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: 'List',
      color: 'text-primary bg-primary-50 border-primary-200',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: 'CheckCircle',
      color: 'text-success bg-success-50 border-success-200',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: 'Play',
      color: 'text-accent bg-accent-50 border-accent-200',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: 'Clock',
      color: 'text-warning bg-warning-50 border-warning-200',
      change: '-3%',
      changeType: 'negative'
    },
    {
      title: 'Blocked',
      value: stats.blocked,
      icon: 'AlertTriangle',
      color: 'text-error bg-error-50 border-error-200',
      change: '+2%',
      changeType: 'negative'
    },
    {
      title: 'Overdue',
      value: stats.overdue,
      icon: 'AlertCircle',
      color: 'text-error bg-error-50 border-error-200',
      change: '-15%',
      changeType: 'positive'
    }
  ];

  const performanceMetrics = [
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: 'Target',
      description: 'Tasks completed on time',
      progress: stats.completionRate
    },
    {
      title: 'Average Progress',
      value: `${stats.avgProgress}%`,
      icon: 'BarChart3',
      description: 'Overall task progress',
      progress: stats.avgProgress
    },
    {
      title: 'High Priority',
      value: stats.highPriority,
      icon: 'AlertTriangle',
      description: 'Critical tasks requiring attention',
      progress: stats.total > 0 ? (stats.highPriority / stats.total) * 100 : 0
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className={`bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 ${stat.color}`}>
            <div className="flex items-center justify-between mb-3">
              <Icon name={stat.icon as keyof typeof LucideIcons} size={20} />
              <span className={`text-xs font-medium ${
                stat.changeType === 'positive' ? 'text-success' : 'text-error'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-sm text-text-muted">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="bg-white border border-border rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="TrendingUp" size={20} className="text-text-muted" />
          <h3 className="text-lg font-semibold text-text-primary">Performance Metrics</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name={metric.icon as keyof typeof LucideIcons} size={16} className="text-text-muted" />
                  <span className="text-sm font-medium text-text-primary">{metric.title}</span>
                </div>
                <span className="text-lg font-bold text-text-primary">{metric.value}</span>
              </div>
              
              <div className="w-full bg-surface rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    metric.progress >= 80 ? 'bg-success' :
                    metric.progress >= 60 ? 'bg-primary' :
                    metric.progress >= 40 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${metric.progress}%` }}
                />
              </div>
              
              <p className="text-xs text-text-muted">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Insights */}
      <div className="bg-white border border-border rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Lightbulb" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-text-primary">Quick Insights</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <Icon name="TrendingUp" size={16} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">Productivity Trend</p>
              <p className="text-xs text-text-secondary mt-1">
                Task completion rate increased by 15% this week compared to last week.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-warning-50 border border-warning-200 rounded-lg">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">Attention Needed</p>
              <p className="text-xs text-text-secondary mt-1">
                {stats.overdue} overdue tasks require immediate attention to prevent delays.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-success-50 border border-success-200 rounded-lg">
            <Icon name="Users" size={16} className="text-success mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">Team Performance</p>
              <p className="text-xs text-text-secondary mt-1">
                All team members are maintaining healthy workload distribution.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-accent-50 border border-accent-200 rounded-lg">
            <Icon name="Zap" size={16} className="text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">Automation Opportunity</p>
              <p className="text-xs text-text-secondary mt-1">
                3 recurring task patterns identified for potential automation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;