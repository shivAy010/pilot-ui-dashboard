'use client'
import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import IntegrationCard from './components/IntegrationCard';
import CategoryFilter from './components/CategoryFilter';
import AutomationTemplate from './components/AutomationTemplate';
import ConnectionHealth from './components/ConnectionHealth';
import APIManagement from './components/APIManagement';
import WorkflowBuilder from './components/WorkflowBuilder';
import * as LucideIcons from 'lucide-react';
import { APIEndpoint } from '@/types';
// Types for integrations, categories, templates, healthData
interface Integration {
  id: number;
  name: string;
  category: string;
  description: string;
  logo: string;
  status: string;
  rating: number;
  reviews: number;
  installs: string;
  complexity: string;
  isPopular: boolean;
  lastSync?: string;
  syncFrequency?: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface AutomationTemplate {
  id: number;
  name: string;
  category: string;
  description: string;
  icon: string;
  difficulty: string;
  setupTime: string;
  usageCount: number;
  rating: number;
  steps: string[];
}

interface HealthData {
  id: number;
  name: string;
  uptime: number;
  lastCheck: string;
  responseTime: number;
}

const IntegrationMarketplace = () => {
  const [activeTab, setActiveTab] = useState<string>('marketplace');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<string>('grid');

  // Mock data for integrations
  const integrations: Integration[] = [
    {
      id: 1,
      name: "Slack",
      category: "Communication",
      description: "Team communication and collaboration platform with real-time messaging, file sharing, and workflow automation capabilities.",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center",
      status: "connected",
      rating: 4.8,
      reviews: 2847,
      installs: "50K+",
      complexity: "Easy",
      isPopular: true,
      lastSync: "2 minutes ago",
      syncFrequency: "Real-time"
    },
    {
      id: 2,
      name: "Google Workspace",
      category: "Productivity",
      description: "Complete suite of productivity tools including Gmail, Drive, Docs, Sheets, and Calendar for seamless business operations.",
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop&crop=center",
      status: "connected",
      rating: 4.7,
      reviews: 5234,
      installs: "100K+",
      complexity: "Medium",
      isPopular: true,
      lastSync: "5 minutes ago",
      syncFrequency: "Every 15 minutes"
    },
    {
      id: 3,
      name: "Salesforce",
      category: "CRM",
      description: "World's leading customer relationship management platform with advanced sales, marketing, and service automation.",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
      status: "disconnected",
      rating: 4.6,
      reviews: 3421,
      installs: "75K+",
      complexity: "Advanced",
      isPopular: false
    },
    {
      id: 4,
      name: "Stripe",
      category: "Financial",
      description: "Complete payment processing solution with support for online payments, subscriptions, and financial reporting.",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center",
      status: "pending",
      rating: 4.9,
      reviews: 1876,
      installs: "25K+",
      complexity: "Medium",
      isPopular: true
    },
    {
      id: 5,
      name: "Jira",
      category: "Project Management",
      description: "Agile project management and issue tracking tool designed for software development teams and project coordination.",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center",
      status: "connected",
      rating: 4.4,
      reviews: 2156,
      installs: "40K+",
      complexity: "Medium",
      isPopular: false,
      lastSync: "1 hour ago",
      syncFrequency: "Every hour"
    },
    {
      id: 6,
      name: "HubSpot",
      category: "Marketing",
      description: "Comprehensive marketing automation platform with CRM, email marketing, and lead generation capabilities.",
      logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop&crop=center",
      status: "disconnected",
      rating: 4.5,
      reviews: 1923,
      installs: "30K+",
      complexity: "Medium",
      isPopular: false
    }
  ];

  const categories: Category[] = [
    { id: 'all', name: 'All Categories', icon: 'Grid3X3' },
    { id: 'Communication', name: 'Communication', icon: 'MessageCircle' },
    { id: 'Productivity', name: 'Productivity', icon: 'Briefcase' },
    { id: 'CRM', name: 'CRM', icon: 'Users' },
    { id: 'Financial', name: 'Financial', icon: 'DollarSign' },
    { id: 'Project Management', name: 'Project Management', icon: 'Kanban' },
    { id: 'Marketing', name: 'Marketing', icon: 'TrendingUp' }
  ];

  const automationTemplates: AutomationTemplate[] = [
    {
      id: 1,
      name: "Lead Routing Automation",
      category: "Sales",
      description: "Automatically route new leads from forms to appropriate sales representatives based on territory and product interest.",
      icon: "UserPlus",
      difficulty: "Beginner",
      setupTime: "5 minutes",
      usageCount: 1247,
      rating: 4.8,
      steps: [
        "New lead form submission detected",
        "Extract lead information and territory",
        "Assign to appropriate sales rep",
        "Send notification to sales rep",
        "Create follow-up task in CRM"
      ]
    },
    {
      id: 2,
      name: "Expense Approval Workflow",
      category: "Finance",
      description: "Streamline expense report approvals with automatic routing based on amount thresholds and department policies.",
      icon: "Receipt",
      difficulty: "Intermediate",
      setupTime: "15 minutes",
      usageCount: 892,
      rating: 4.6,
      steps: [
        "Expense report submitted",
        "Validate expense categories and amounts",
        "Route to manager for approval",
        "Send approval notifications",
        "Update accounting system"
      ]
    },
    {
      id: 3,
      name: "Customer Support Escalation",
      category: "Support",
      description: "Automatically escalate high-priority support tickets and notify relevant team members for faster resolution.",
      icon: "AlertTriangle",
      difficulty: "Advanced",
      setupTime: "30 minutes",
      usageCount: 634,
      rating: 4.7,
      steps: [
        "Monitor ticket priority and response time",
        "Identify escalation criteria",
        "Notify senior support staff",
        "Update ticket status and priority",
        "Schedule follow-up actions"
      ]
    }
  ];

  const healthData: HealthData[] = [
    {
      id: 1,
      name: "Slack",
      uptime: 99.8,
      lastCheck: "30s ago",
      responseTime: 45
    },
    {
      id: 2,
      name: "Google Workspace",
      uptime: 99.9,
      lastCheck: "1m ago",
      responseTime: 32
    },
    {
      id: 3,
      name: "Jira",
      uptime: 97.2,
      lastCheck: "2m ago",
      responseTime: 156
    }
  ];

  const uptimeData = [
    { time: '00:00', uptime: 99.8 },
    { time: '04:00', uptime: 99.9 },
    { time: '08:00', uptime: 99.7 },
    { time: '12:00', uptime: 99.8 },
    { time: '16:00', uptime: 99.9 },
    { time: '20:00', uptime: 99.6 },
    { time: '24:00', uptime: 99.8 }
  ];

  const apiEndpoints = [
    {
      id: 1,
      method: "GET",
      path: "/api/v1/integrations",
      description: "Retrieve list of all available integrations",
      status: "active",
      rateLimit: "1000/hour",
      lastUsed: "2 minutes ago",
      requestsToday: 1247,
      successRate: 99.8,
      parameters: [
        { name: "category", type: "string", required: false },
        { name: "status", type: "string", required: false },
        { name: "limit", type: "number", required: false }
      ]
    },
    {
      id: 2,
      method: "POST",
      path: "/api/v1/integrations/connect",
      description: "Establish connection to a third-party service",
      status: "active",
      rateLimit: "100/hour",
      lastUsed: "15 minutes ago",
      requestsToday: 89,
      successRate: 97.2,
      parameters: [
        { name: "service_id", type: "string", required: true },
        { name: "credentials", type: "object", required: true },
        { name: "config", type: "object", required: false }
      ]
    },
    {
      id: 3,
      method: "PUT",
      path: "/api/v1/integrations/{id}/sync",
      description: "Trigger manual synchronization for specific integration",
      status: "active",
      rateLimit: "50/hour",
      lastUsed: "1 hour ago",
      requestsToday: 34,
      successRate: 98.5,
      parameters: [
        { name: "id", type: "string", required: true },
        { name: "force", type: "boolean", required: false }
      ]
    }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryCounts = categories.reduce((acc: Record<string, number>, category) => {
    if (category.id === 'all') {
      acc[category.id] = integrations.length;
    } else {
      acc[category.id] = integrations.filter(integration => integration.category === category.id).length;
    }
    return acc;
  }, {} as Record<string, number>);

  const handleConnect = (integration: Integration) => {
    console.log('Connecting to:', integration.name);
  };

  const handleViewDetails = (integration: Integration) => {
    console.log('Viewing details for:', integration.name);
  };

  const handleConfigure = (integration: Integration) => {
    console.log('Configuring:', integration.name);
  };

  const handleUseTemplate = (template: AutomationTemplate) => {
    console.log('Using template:', template.name);
  };

  const handleViewTemplate = (template: AutomationTemplate) => {
    console.log('Viewing template:', template.name);
  };

  const handleTestEndpoint = (endpoint: APIEndpoint, request: string) => {
    console.log('Testing endpoint:', endpoint.path, 'with request:', request);
  };

  const handleViewDocs = () => {
    console.log('Opening API documentation');
  };

  const handleSaveWorkflow = () => {
    console.log('Saving workflow:');
  };

  const handleTestWorkflow = () => {
    console.log('Testing workflow:');
  };

  const tabs = [
    { id: 'marketplace', name: 'Integration Marketplace', icon: 'Store' },
    { id: 'templates', name: 'Automation Templates', icon: 'Workflow' },
    { id: 'health', name: 'Connection Health', icon: 'Activity' },
    { id: 'api', name: 'API Management', icon: 'Code' },
    { id: 'builder', name: 'Workflow Builder', icon: 'GitBranch' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Integration Marketplace</h1>
                <p className="text-text-secondary mt-2">
                  Connect and manage third-party tools to streamline your operations
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  size="sm"
                >
                  Sync All
                </Button>
                <Button
                  variant="primary"
                  iconName="Plus"
                  size="sm"
                >
                  Add Integration
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-muted">Connected</p>
                  <p className="text-2xl font-bold text-success">24</p>
                </div>
                <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-muted">Available</p>
                  <p className="text-2xl font-bold text-primary">156</p>
                </div>
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Icon name="Store" size={24} className="text-primary" />
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-muted">Workflows</p>
                  <p className="text-2xl font-bold text-accent">12</p>
                </div>
                <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center">
                  <Icon name="Workflow" size={24} className="text-accent" />
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-muted">Uptime</p>
                  <p className="text-2xl font-bold text-text-primary">99.8%</p>
                </div>
                <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center">
                  <Icon name="Activity" size={24} className="text-text-muted" />
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-text-muted hover:text-text-primary hover:border-border'
                    }`}
                  >
                    <Icon name={tab.icon as keyof typeof LucideIcons} size={18} />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'marketplace' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  integrationCounts={categoryCounts}
                />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Search and View Controls */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1 max-w-md">
                    <div className="relative">
                      <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
                      <Input
                        type="search"
                        placeholder="Search integrations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                      size="sm"
                      iconName="Grid3X3"
                      onClick={() => setViewMode('grid')}
                    />
                    <Button
                      variant={viewMode === 'list' ? 'primary' : 'ghost'}
                      size="sm"
                      iconName="List"
                      onClick={() => setViewMode('list')}
                    />
                  </div>
                </div>

                {/* Integrations Grid */}
                <div className={`grid gap-6 ${
                  viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :'grid-cols-1'
                }`}>
                  {filteredIntegrations.map((integration) => (
                    <IntegrationCard
                      key={integration.id}
                      integration={integration}
                      onConnect={handleConnect}
                      onViewDetails={handleViewDetails}
                      onConfigure={handleConfigure}
                    />
                  ))}
                </div>

                {filteredIntegrations.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-text-primary mb-2">No integrations found</h3>
                    <p className="text-text-muted">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-text-primary mb-2">Automation Templates</h2>
                <p className="text-text-secondary">
                  Pre-built workflow templates to automate common business processes
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {automationTemplates.map((template) => (
                  <AutomationTemplate
                    key={template.id}
                    template={template}
                    onUseTemplate={handleUseTemplate}
                    onViewTemplate={handleViewTemplate}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <ConnectionHealth
              healthData={healthData}
              uptimeData={uptimeData}
            />
          )}

          {activeTab === 'api' && (
            <APIManagement
              apiEndpoints={apiEndpoints}
              onTestEndpoint={handleTestEndpoint}
              onViewDocs={handleViewDocs}
            />
          )}

          {activeTab === 'builder' && (
            <WorkflowBuilder
              onSaveWorkflow={handleSaveWorkflow}
              onTestWorkflow={handleTestWorkflow}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default IntegrationMarketplace;