'use client'
import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import MetricCard from './components/MetricCard';
import ChartWidget from './components/ChartWidget';
import ReportBuilder from './components/ReportBuilder';
import FilterPanel from './components/FilterPanel';
import InsightCard from './components/InsightCard';
import * as LucideIcons from 'lucide-react';
// Types for metrics, charts, and insights
interface Metric {
  id: number;
  title: string;
  category: string;
  value: string;
  unit: string;
  trend: number;
  progress: number;
  icon: string;
  iconBg: string;
  iconColor: string;
  progressColor: string;
}

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

interface Chart {
  id: number;
  title: string;
  description: string;
  type: string;
  data: ChartData[];
  insights: string;
}

interface InsightMetric {
  label: string;
  value: string;
}

interface Insight {
  id: number;
  type: string;
  priority: string;
  category: string;
  title: string;
  description: string;
  timestamp: string;
  actionable: boolean;
  metrics: InsightMetric[];
  recommendations: string[];
}

const AnalyticsObservatory = () => {
  const [isReportBuilderOpen, setIsReportBuilderOpen] = useState<boolean>(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Mock data for metrics
  const metrics: Metric[] = [
    {
      id: 1,
      title: 'Total Revenue',
      category: 'Financial',
      value: '$2.4M',
      unit: '',
      trend: 12.5,
      progress: 85,
      icon: 'DollarSign',
      iconBg: 'bg-success-100',
      iconColor: 'text-success',
      progressColor: 'bg-success'
    },
    {
      id: 2,
      title: 'Active Users',
      category: 'Engagement',
      value: '45.2K',
      unit: 'users',
      trend: 8.3,
      progress: 72,
      icon: 'Users',
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary',
      progressColor: 'bg-primary'
    },
    {
      id: 3,
      title: 'Conversion Rate',
      category: 'Marketing',
      value: '3.8',
      unit: '%',
      trend: -2.1,
      progress: 65,
      icon: 'Target',
      iconBg: 'bg-warning-100',
      iconColor: 'text-warning',
      progressColor: 'bg-warning'
    },
    {
      id: 4,
      title: 'System Uptime',
      category: 'Technical',
      value: '99.9',
      unit: '%',
      trend: 0.2,
      progress: 99,
      icon: 'Activity',
      iconBg: 'bg-accent-100',
      iconColor: 'text-accent',
      progressColor: 'bg-accent'
    },
    {
      id: 5,
      title: 'Team Productivity',
      category: 'Operations',
      value: '87',
      unit: 'score',
      trend: 5.7,
      progress: 87,
      icon: 'Zap',
      iconBg: 'bg-secondary-100',
      iconColor: 'text-secondary',
      progressColor: 'bg-secondary'
    },
    {
      id: 6,
      title: 'Customer Satisfaction',
      category: 'Support',
      value: '4.6',
      unit: '/5',
      trend: 3.2,
      progress: 92,
      icon: 'Heart',
      iconBg: 'bg-error-100',
      iconColor: 'text-error',
      progressColor: 'bg-error'
    }
  ];

  // Mock data for charts
  const charts: Chart[] = [
    {
      id: 1,
      title: 'Revenue Trends',
      description: 'Monthly revenue performance over time',
      type: 'line',
      data: [
        { name: 'Jan', value: 180000 },
        { name: 'Feb', value: 195000 },
        { name: 'Mar', value: 210000 },
        { name: 'Apr', value: 225000 },
        { name: 'May', value: 240000 },
        { name: 'Jun', value: 235000 }
      ],
      insights: `Revenue growth shows a strong upward trend with 33% increase over the past 6 months. May showed peak performance, with a slight dip in June that requires attention.`
    },
    {
      id: 2,
      title: 'Department Performance',
      description: 'Productivity scores by department',
      type: 'bar',
      data: [
        { name: 'Marketing', value: 85 },
        { name: 'Sales', value: 92 },
        { name: 'Engineering', value: 88 },
        { name: 'HR', value: 79 },
        { name: 'Finance', value: 91 },
        { name: 'Operations', value: 87 }
      ],
      insights: `Sales department leads with 92% productivity score. HR shows opportunity for improvement at 79%. Overall team performance is above industry average.`
    },
    {
      id: 3,
      title: 'Traffic Sources',
      description: 'User acquisition channels breakdown',
      type: 'pie',
      data: [
        { name: 'Organic Search', value: 35, color: '#0EA5E9' },
        { name: 'Direct', value: 25, color: '#06B6D4' },
        { name: 'Social Media', value: 20, color: '#10B981' },
        { name: 'Email', value: 12, color: '#F59E0B' },
        { name: 'Paid Ads', value: 8, color: '#EF4444' }
      ],
      insights: `Organic search remains the top acquisition channel at 35%. Social media shows strong growth potential. Consider optimizing paid ad campaigns for better ROI.`
    }
  ];

  // Mock data for AI insights
  const insights: Insight[] = [
    {
      id: 1,
      type: 'trend',
      priority: 'high',
      category: 'Revenue',
      title: 'Revenue Growth Acceleration',
      description: `Your revenue has increased by 15% this month compared to last month. This growth is primarily driven by improved conversion rates in the enterprise segment and successful product launches.`,
      timestamp: '2 hours ago',
      actionable: true,
      metrics: [
        { label: 'Growth Rate', value: '+15%' },
        { label: 'Enterprise Conv.', value: '8.2%' }
      ],
      recommendations: [
        'Scale successful marketing campaigns',
        'Increase enterprise sales team capacity',
        'Optimize pricing strategy for new segments'
      ]
    },
    {
      id: 2,
      type: 'anomaly',
      priority: 'medium',
      category: 'User Engagement',
      title: 'Unusual Traffic Pattern Detected',
      description: `There's been a 25% spike in user activity during off-peak hours (2-6 AM). This could indicate international user growth or potential bot activity that needs investigation.`,timestamp: '4 hours ago',
      actionable: true,
      metrics: [
        { label: 'Off-peak Traffic', value: '+25%' },
        { label: 'New Sessions', value: '12.3K' }
      ],
      recommendations: [
        'Analyze geographic distribution of new traffic','Implement bot detection measures','Consider international market expansion'
      ]
    },
    {
      id: 3,
      type: 'opportunity',priority: 'low',category: 'Operations',title: 'Process Optimization Opportunity',description: `Analysis shows that automating the customer onboarding process could reduce manual work by 40% and improve customer satisfaction scores by an estimated 12%.`,timestamp: '1 day ago',
      actionable: false,
      metrics: [
        { label: 'Time Savings', value: '40%' },
        { label: 'Satisfaction Boost', value: '+12%' }
      ],
      recommendations: [
        'Evaluate automation tools for onboarding','Create automated email sequences','Implement self-service portal features'
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'performance', label: 'Performance', icon: 'BarChart3' },
    { id: 'insights', label: 'AI Insights', icon: 'Brain' },
    { id: 'reports', label: 'Reports', icon: 'FileText' }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const handleApplyFilters = () => {
    console.log('Applied filters:');
  };

  const handleExportData = () => {
    console.log('Exporting analytics data...');
  };

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      // Update metrics or trigger refresh
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-semibold text-text-primary">Analytics Observatory</h1>
              <p className="text-text-muted">
                Transform operational data into actionable insights with AI-powered analytics
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
                <Input
                  type="search"
                  placeholder="Search analytics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFilterPanelOpen(true)}
                iconName="Filter"
              >
                Filters
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                iconName="RefreshCw"
                disabled={refreshing}
                className={refreshing ? 'animate-spin' : ''}
              >
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExportData}
                iconName="Download"
              >
                Export
              </Button>
              
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsReportBuilderOpen(true)}
                iconName="Plus"
              >
                Create Report
              </Button>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></div>
                  <span className="text-sm text-text-secondary">Real-time data active</span>
                </div>
                <div className="text-sm text-text-muted">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
                <div className="text-sm text-text-muted">
                  Data sources: 12 connected
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm text-text-secondary">
                  Processing: <span className="font-medium text-primary">2.4M events/hour</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-border">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-text-muted hover:text-text-primary hover:border-border'
                  }`}
                >
                  <Icon name={tab.icon as keyof typeof LucideIcons} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics Grid */}
              <div>
                <h2 className="text-lg font-semibold text-text-primary mb-4">Key Performance Indicators</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {metrics.map((metric) => (
                    <MetricCard key={metric.id} metric={metric} />
                  ))}
                </div>
              </div>

              {/* Charts Section */}
              <div>
                <h2 className="text-lg font-semibold text-text-primary mb-4">Performance Analytics</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {charts.slice(0, 2).map((chart) => (
                    <ChartWidget key={chart.id} chart={chart} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {charts.map((chart) => (
                  <ChartWidget key={chart.id} chart={chart} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-text-primary">AI-Powered Insights</h2>
                <div className="flex items-center space-x-2 text-sm text-text-muted">
                  <Icon name="Sparkles" size={16} className="text-primary" />
                  <span>Powered by Advanced Analytics Engine</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {insights.map((insight) => (
                  <InsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <Icon name="FileText" size={48} className="text-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No Custom Reports Yet</h3>
                <p className="text-text-muted mb-6">Create your first custom report to get started with automated analytics</p>
                <Button
                  variant="primary"
                  onClick={() => setIsReportBuilderOpen(true)}
                  iconName="Plus"
                >
                  Create Your First Report
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <ReportBuilder
        isOpen={isReportBuilderOpen}
        onClose={() => setIsReportBuilderOpen(false)}
      />
      
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default AnalyticsObservatory;