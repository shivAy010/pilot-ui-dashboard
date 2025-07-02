'use client'
import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import SecurityHealthScore from './components/SecurityHealthScore';
import ThreatMonitoring from './components/ThreatMonitoring';
import ComplianceTracking from './components/ComplianceTracking';
import AccessLogs from './components/AccessLogs';
import PermissionAudit from './components/PermissionAudit';
import SecuritySettings from './components/SecuritySettings';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import * as LucideIcons from 'lucide-react';

// Types for navigationTabs and quickStats
interface NavigationTab {
  id: string;
  name: string;
  icon: string;
}

interface QuickStat {
  label: string;
  value: string;
  change: string;
  trend: string;
  color: string;
}

const SecurityComplianceCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const navigationTabs: NavigationTab[] = [
    { id: 'overview', name: 'Security Overview', icon: 'Shield' },
    { id: 'threats', name: 'Threat Monitoring', icon: 'AlertTriangle' },
    { id: 'compliance', name: 'Compliance Tracking', icon: 'FileCheck' },
    { id: 'access', name: 'Access Logs', icon: 'Activity' },
    { id: 'permissions', name: 'Permission Audit', icon: 'UserCheck' },
    { id: 'settings', name: 'Security Settings', icon: 'Settings' }
  ];

  const quickStats: QuickStat[] = [
    {
      label: "Security Score",
      value: "94/100",
      change: "+2 from last week",
      trend: "up",
      color: "success"
    },
    {
      label: "Active Threats",
      value: "0",
      change: "No active threats",
      trend: "neutral",
      color: "success"
    },
    {
      label: "Compliance Rate",
      value: "98%",
      change: "+1% this month",
      trend: "up",
      color: "success"
    },
    {
      label: "Failed Logins",
      value: "3",
      change: "+1 from yesterday",
      trend: "up",
      color: "warning"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <SecurityHealthScore />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ThreatMonitoring />
              <ComplianceTracking />
            </div>
          </div>
        );
      case 'threats':
        return <ThreatMonitoring />;
      case 'compliance':
        return <ComplianceTracking />;
      case 'access':
        return <AccessLogs />;
      case 'permissions':
        return <PermissionAudit />;
      case 'settings':
        return <SecuritySettings />;
      default:
        return (
          <div className="space-y-6">
            <SecurityHealthScore />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ThreatMonitoring />
              <ComplianceTracking />
            </div>
          </div>
        );
    }
  };

  // Example handler with typed argument
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64 pt-16">
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-text-primary mb-2">
                    Security & Compliance Center
                  </h1>
                  <p className="text-text-secondary">
                    Comprehensive security monitoring and compliance management platform
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm" iconName="Download">
                    Export Report
                  </Button>
                  <Button variant="primary" size="sm" iconName="Shield">
                    Security Scan
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {quickStats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-secondary">{stat.label}</span>
                      <Icon 
                        name={stat.trend === 'up' ? 'TrendingUp' : stat.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                        size={16} 
                        className={`${
                          stat.color === 'success' ? 'text-success' : 
                          stat.color === 'warning' ? 'text-warning' : 'text-text-muted'
                        }`}
                      />
                    </div>
                    <div className="mb-1">
                      <span className={`text-2xl font-bold ${
                        stat.color === 'success' ? 'text-success' : 
                        stat.color === 'warning' ? 'text-warning' : 'text-text-primary'
                      }`}>
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-xs text-text-muted">{stat.change}</span>
                  </div>
                ))}
              </div>

              {/* Tab Navigation */}
              <div className="bg-white rounded-lg border border-border p-1 mb-6">
                <div className="flex flex-wrap gap-1">
                  {navigationTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                      }`}
                    >
                      <Icon name={tab.icon as keyof typeof LucideIcons} size={16} />
                      <span className="hidden sm:inline">{tab.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="animate-fade-in">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SecurityComplianceCenter;