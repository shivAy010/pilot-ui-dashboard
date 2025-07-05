import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

interface NavigationItem {
  name: string;
  path: string;
  icon: string;
  description: string;
  roles: string[];
}

interface AdminSidebarProps {
  userRole: 'admin' | 'support' | 'stakeholder' | 'executive' | 'dev' | 'verification_officer' | 'support_manager' | 'business_developer' | 'marketing_executor' | 'hr_manager' | 'social_media_executive' | 'developer' | 'qa' | 'devops' | 'research';
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ userRole }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

  const navigationItems: NavigationItem[] = [
    {
      name: 'Dashboard Analytics',
      path: '/ops/dashboard/analytics',
      icon: 'BarChart3',
      description: 'Platform-wide metrics',
      roles: ['admin']
    },
    {
      name: 'Provider Onboarding',
      path: '/ops/providers/onboarding',
      icon: 'UserCheck',
      description: 'Review provider applications',
      roles: ['admin', 'verification_officer']
    },
    {
      name: 'Customer Support',
      path: '/ops/support/dashboard',
      icon: 'MessageCircle',
      description: 'Support ticket management',
      roles: ['support', 'admin', 'support_manager']
    },
    {
      name: 'Business Development',
      path: '/ops/business/developer',
      icon: 'Briefcase',
      description: 'Doctor onboarding CRM',
      roles: ['business_developer', 'admin']
    },
    {
      name: 'Marketing Campaigns',
      path: '/ops/marketing/executor',
      icon: 'Target',
      description: 'Ad campaign management',
      roles: ['marketing_executor', 'admin']
    },
    {
      name: 'HR Management',
      path: '/ops/hr/manager',
      icon: 'Users',
      description: 'Job postings and hiring',
      roles: ['hr_manager', 'admin']
    },
    {
      name: 'Social Media',
      path: '/ops/social/executive',
      icon: 'Share2',
      description: 'Social content management',
      roles: ['social_media_executive', 'admin']
    },
    {
      name: 'Development Tasks',
      path: '/ops/dev/tasks',
      icon: 'Code',
      description: 'Developer task queue',
      roles: ['developer', 'admin']
    },
    {
      name: 'QA Testing',
      path: '/ops/qa/tasks',
      icon: 'TestTube',
      description: 'Quality assurance tasks',
      roles: ['qa', 'admin']
    },
    {
      name: 'DevOps Operations',
      path: '/ops/devops/tasks',
      icon: 'Server',
      description: 'Infrastructure management',
      roles: ['devops', 'admin']
    },
    {
      name: 'Decision Hub',
      path: '/ops/tasks/decision-hub',
      icon: 'GitBranch',
      description: 'Strategic decisions',
      roles: ['stakeholder', 'admin']
    },
    {
      name: 'Research Center',
      path: '/ops/research/tasks',
      icon: 'Search',
      description: 'Research assignments',
      roles: ['research', 'admin']
    },
    {
      name: 'Agent Execution Logs',
      path: '/ops/agents/execution-logs',
      icon: 'Activity',
      description: 'Agent workflow debugging',
      roles: ['admin', 'developer']
    },
    {
      name: 'Manual Agent Trigger',
      path: '/ops/agents/trigger',
      icon: 'Play',
      description: 'Trigger agent tasks',
      roles: ['admin']
    }
  ];

  const filteredItems = navigationItems.filter(item => 
    item.roles.indexOf(userRole) !== -1
  );

  const isActivePath = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <aside
      className={`fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] bg-white border-r border-border transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-text-secondary capitalize">
                {userRole} Portal
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
            {filteredItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-primary-50 text-primary border border-primary-200 shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
                title={isCollapsed ? item.name : ''}
              >
                <Icon 
                  name={item.icon as any} 
                  size={18} 
                  className={`flex-shrink-0 ${
                    isActivePath(item.path) ? 'text-primary' : 'text-text-muted group-hover:text-text-primary'
                  }`}
                />
                {!isCollapsed && (
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="truncate">{item.name}</div>
                    <div className="text-xs text-text-muted truncate mt-0.5">
                      {item.description}
                    </div>
                  </div>
                )}
                {!isCollapsed && isActivePath(item.path) && (
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Role Info */}
        <div className="border-t border-border p-4">
          {!isCollapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary truncate capitalize">
                  {userRole} User
                </div>
                <div className="text-xs text-text-muted truncate">
                  Operations Portal
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;