'use client'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricCard from './components/MetricCard';
import QuickActionCard from './components/QuickActionCard';
import ActivityFeed from './components/ActivityFeed';
import TaskOverview from './components/TaskOverview';
import TeamPerformance from './components/TeamPerformance';
import SystemHealth from './components/SystemHealth';
import SearchBar from './components/SearchBar';
import { QuickAction } from '../../types';

// Types for metrics, quickActions, activities, tasks, teams
interface Metric {
  title: string;
  value: string;
  change: string;
  changeType: string;
  icon: string;
  color: string;
  trend: number[];
}

interface Activity {
  type: string;
  user?: { name: string; avatar: string };
  description: string;
  timestamp: Date;
  metadata?: { project: string };
}

interface Task {
  title: string;
  project: string;
  assignee: string;
  status: string;
  priority: string;
  progress: number;
  dueDate: Date;
}

interface Team {
  name: string;
  department: string;
  icon: string;
  members: number;
  activeTasks: number;
  performance: number;
}

const UnifiedCommandDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [userRole] = useState<string>('Operations Manager');
  const [notifications] = useState<number>(12);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setRecentActivities([
      {
        type: 'task_completed',
        user: { name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/32.jpg' },
        description: 'Completed Q4 marketing campaign review',
        timestamp: new Date(Date.now() - 300000),
        metadata: { project: 'Marketing Campaign' }
      },
      {
        type: 'task_assigned',
        user: { name: 'Michael Chen', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
        description: 'Assigned new security audit task to DevOps team',
        timestamp: new Date(Date.now() - 900000),
        metadata: { project: 'Security Audit' }
      },
      {
        type: 'report_generated',
        user: { name: 'Emily Rodriguez', avatar: 'https://randomuser.me/api/portraits/women/28.jpg' },
        description: 'Generated monthly performance analytics report',
        timestamp: new Date(Date.now() - 1800000),
        metadata: { project: 'Analytics' }
      },
      {
        type: 'system_alert',
        description: 'System maintenance scheduled for tonight at 2:00 AM',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        type: 'integration_success',
        user: { name: 'David Kim', avatar: 'https://randomuser.me/api/portraits/men/38.jpg' },
        description: 'Successfully integrated Slack workspace with notification system',
        timestamp: new Date(Date.now() - 7200000),
        metadata: { project: 'Integrations' }
      }
    ]);
  }, []);

  // Mock data for metrics
  const metrics: Metric[] = [
    {
      title: 'Active Operations',
      value: '247',
      change: '+12%',
      changeType: 'positive',
      icon: 'Activity',
      color: 'primary',
      trend: [45, 52, 48, 61, 58, 67, 73, 69, 76, 82]
    },
    {
      title: 'Task Completion Rate',
      value: '94.2%',
      change: '+5.1%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'success',
      trend: [78, 82, 85, 88, 91, 89, 92, 94, 93, 94]
    },
    {
      title: 'Team Productivity',
      value: '87.5%',
      change: '+2.3%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'accent',
      trend: [82, 84, 83, 85, 86, 87, 85, 88, 87, 88]
    },
    {
      title: 'System Uptime',
      value: '99.8%',
      change: '-0.1%',
      changeType: 'negative',
      icon: 'Shield',
      color: 'warning',
      trend: [99, 100, 99, 100, 99, 100, 99, 100, 99, 100]
    }
  ];

  // Mock data for quick actions
  const quickActions: QuickAction[] = [
    {
      title: 'Task Management',
      description: 'Create, assign, and track tasks across teams',
      icon: 'CheckSquare',
      color: 'primary',
      stats: { value: '23', label: 'Pending' },
      actions: [
        { label: 'New Task', icon: 'Plus', onClick: () => console.log('New task') },
        { label: 'View All', icon: 'ArrowRight', onClick: () => console.log('View tasks') }
      ]
    },
    {
      title: 'Team Collaboration',
      description: 'Coordinate with team members and departments',
      icon: 'Users',
      color: 'accent',
      stats: { value: '8', label: 'Online' },
      actions: [
        { label: 'Team Chat', icon: 'MessageCircle', onClick: () => console.log('Team chat') },
        { label: 'Schedule', icon: 'Calendar', onClick: () => console.log('Schedule') }
      ]
    },
    {
      title: 'Analytics & Reports',
      description: 'Generate insights and performance reports',
      icon: 'BarChart3',
      color: 'secondary',
      stats: { value: '15', label: 'Reports' },
      actions: [
        { label: 'Generate', icon: 'FileText', onClick: () => console.log('Generate report') },
        { label: 'Dashboard', icon: 'BarChart3', onClick: () => console.log('Analytics') }
      ]
    },
    {
      title: 'System Monitoring',
      description: 'Monitor system health and performance',
      icon: 'Monitor',
      color: 'warning',
      stats: { value: '99.8%', label: 'Uptime' },
      actions: [
        { label: 'Health Check', icon: 'Activity', onClick: () => console.log('Health check') },
        { label: 'Alerts', icon: 'Bell', onClick: () => console.log('Alerts') }
      ]
    }
  ];

  // Mock data for tasks
  const tasks: Task[] = [
    {
      title: 'Review Q4 Budget Allocation',
      project: 'Finance Operations',
      assignee: 'Sarah Johnson',
      status: 'in_progress',
      priority: 'high',
      progress: 75,
      dueDate: new Date(Date.now() + 86400000)
    },
    {
      title: 'Security Compliance Audit',
      project: 'Security & Compliance',
      assignee: 'Michael Chen',
      status: 'review',
      priority: 'high',
      progress: 90,
      dueDate: new Date(Date.now() + 172800000)
    },
    {
      title: 'Team Performance Analysis',
      project: 'HR Operations',
      assignee: 'Emily Rodriguez',
      status: 'pending',
      priority: 'medium',
      progress: 25,
      dueDate: new Date(Date.now() + 259200000)
    },
    {
      title: 'API Integration Testing',
      project: 'Development',
      assignee: 'David Kim',
      status: 'in_progress',
      priority: 'medium',
      progress: 60,
      dueDate: new Date(Date.now() + 345600000)
    }
  ];

  // Mock data for teams
  const teams: Team[] = [
    {
      name: 'Development Team',
      department: 'Engineering',
      icon: 'Code',
      members: 12,
      activeTasks: 8,
      performance: 92
    },
    {
      name: 'Marketing Operations',
      department: 'Marketing',
      icon: 'Megaphone',
      members: 8,
      activeTasks: 15,
      performance: 88
    },
    {
      name: 'Security & Compliance',
      department: 'Security',
      icon: 'Shield',
      members: 6,
      activeTasks: 4,
      performance: 95
    },
    {
      name: 'HR Operations',
      department: 'Human Resources',
      icon: 'Users',
      members: 5,
      activeTasks: 7,
      performance: 85
    }
  ];

  // Mock data for system health
  const systems = [
    {
      name: 'Core Application',
      description: 'Main application server and database',
      status: 'healthy',
      uptime: 99.9,
      responseTime: 142,
      lastCheck: '2 minutes ago'
    },
    {
      name: 'Authentication Service',
      description: 'User authentication and authorization',
      status: 'healthy',
      uptime: 99.8,
      responseTime: 89,
      lastCheck: '1 minute ago'
    },
    {
      name: 'Notification System',
      description: 'Email and push notification service',
      status: 'warning',
      uptime: 98.5,
      responseTime: 234,
      lastCheck: '5 minutes ago'
    },
    {
      name: 'Analytics Engine',
      description: 'Data processing and analytics service',
      status: 'healthy',
      uptime: 99.7,
      responseTime: 156,
      lastCheck: '3 minutes ago'
    }
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Unified Command Dashboard
                </h1>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <span className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} />
                    <span>{currentTime ? formatTime(currentTime) : ''}</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} />
                    <span>{currentTime ? formatDate(currentTime) : ''}</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Icon name="User" size={16} />
                    <span>{userRole}</span>
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button variant="outline" size="sm" iconName="Download">
                  Export Data
                </Button>
                <Button variant="primary" size="sm" iconName="Plus">
                  Quick Action
                </Button>
                <div className="relative">
                  <Button variant="ghost" size="sm" iconName="Bell">
                    <span className="sr-only">Notifications</span>
                  </Button>
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar />
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickActions.map((action, index) => (
              <QuickActionCard key={index} {...action} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Activity Feed */}
            <div className="lg:col-span-1">
              <ActivityFeed activities={recentActivities} />
            </div>

            {/* Middle Column - Task Overview */}
            <div className="lg:col-span-1">
              <TaskOverview tasks={tasks} />
            </div>

            {/* Right Column - Team Performance */}
            <div className="lg:col-span-1">
              <TeamPerformance teams={teams} />
            </div>
          </div>

          {/* System Health Section */}
          <div className="mb-8">
            <SystemHealth systems={systems} />
          </div>

          {/* Navigation Links */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/task-intelligence-center"
                className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:shadow-brand hover:border-primary-200 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Icon name="Brain" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-text-primary">Task Intelligence Center</div>
                  <div className="text-sm text-text-muted">AI-powered task management</div>
                </div>
              </Link>

              <Link
                to="/analytics-observatory"
                className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:shadow-brand hover:border-primary-200 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-accent-50 rounded-lg flex items-center justify-center">
                  <Icon name="BarChart3" size={20} className="text-accent" />
                </div>
                <div>
                  <div className="font-medium text-text-primary">Analytics Observatory</div>
                  <div className="text-sm text-text-muted">Performance insights & metrics</div>
                </div>
              </Link>

              <Link
                to="/team-administration-console"
                className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:shadow-brand hover:border-primary-200 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-secondary-50 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-secondary" />
                </div>
                <div>
                  <div className="font-medium text-text-primary">Team Administration</div>
                  <div className="text-sm text-text-muted">Team management & roles</div>
                </div>
              </Link>

              <Link
                to="/notification-command-center"
                className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:shadow-brand hover:border-primary-200 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-warning-50 rounded-lg flex items-center justify-center">
                  <Icon name="Bell" size={20} className="text-warning" />
                </div>
                <div>
                  <div className="font-medium text-text-primary">Notification Center</div>
                  <div className="text-sm text-text-muted">Alert management system</div>
                </div>
              </Link>

              <Link
                to="/integration-marketplace"
                className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:shadow-brand hover:border-primary-200 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-success-50 rounded-lg flex items-center justify-center">
                  <Icon name="Puzzle" size={20} className="text-success" />
                </div>
                <div>
                  <div className="font-medium text-text-primary">Integration Marketplace</div>
                  <div className="text-sm text-text-muted">Connect external tools</div>
                </div>
              </Link>

              <Link
                to="/security-compliance-center"
                className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:shadow-brand hover:border-primary-200 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-error-50 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} className="text-error" />
                </div>
                <div>
                  <div className="font-medium text-text-primary">Security & Compliance</div>
                  <div className="text-sm text-text-muted">Security monitoring</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UnifiedCommandDashboard;