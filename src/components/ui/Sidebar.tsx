import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '../AppIcon';
import Button from './Button';
import * as LucideIcons from 'lucide-react';

interface NavigationItem {
  name: string;
  path: string;
  icon: string;
  description: string;
}

interface QuickAction {
  name: string;
  icon: string;
  action: string;
}

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const navigationItems: NavigationItem[] = [
    { name: 'Unified Command Dashboard', path: '/unified-command-dashboard', icon: 'LayoutDashboard', description: 'Central operations overview' },
    { name: 'Task Intelligence Center', path: '/task-intelligence-center', icon: 'Brain', description: 'AI-powered task management' },
    { name: 'Analytics Observatory', path: '/analytics-observatory', icon: 'BarChart3', description: 'Performance insights & metrics' },
    { name: 'Team Administration Console', path: '/team-administration-console', icon: 'Users', description: 'Team management & roles' },
    { name: 'Notification Command Center', path: '/notification-command-center', icon: 'Bell', description: 'Alert management system' },
    { name: 'Integration Marketplace', path: '/integration-marketplace', icon: 'Puzzle', description: 'Connect external tools' },
    { name: 'Security Compliance Center', path: '/security-compliance-center', icon: 'Shield', description: 'Security & compliance monitoring' },
  ];

  const quickActions: QuickAction[] = [
    { name: 'Create Task', icon: 'Plus', action: 'create-task' },
    { name: 'Generate Report', icon: 'FileText', action: 'generate-report' },
    { name: 'Team Chat', icon: 'MessageCircle', action: 'team-chat' },
    { name: 'Help Center', icon: 'HelpCircle', action: 'help' },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const isActivePath = (path: string): boolean => {
    return pathname === path;
  };

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMobile}
        className="fixed top-20 left-4 z-50 lg:hidden bg-white shadow-brand border border-border"
        iconName="Menu"
      >
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] bg-white border-r border-border transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:fixed`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></div>
                <span className="text-sm font-medium text-text-secondary">
                  Operations Active
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCollapse}
              className="hidden lg:flex text-text-secondary hover:text-text-primary"
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`group flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-primary-50 text-primary border border-primary-200 shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}
                  title={isCollapsed ? item.name : ''}
                >
                  <Icon 
                    name={item.icon as keyof typeof LucideIcons} 
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

            {/* Quick Actions */}
            {!isCollapsed && (
              <div className="px-3 mt-8">
                <div className="px-3 mb-3">
                  <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Quick Actions
                  </h3>
                </div>
                <div className="space-y-1">
                  {quickActions.map((action) => (
                    <button
                      key={action.action}
                      onClick={() => handleQuickAction(action.action)}
                      className="w-full group flex items-center px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface transition-all duration-200"
                    >
                      <Icon 
                        name={action.icon as keyof typeof LucideIcons} 
                        size={16} 
                        className="flex-shrink-0 text-text-muted group-hover:text-accent"
                      />
                      <span className="ml-3 truncate">{action.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-border p-4">
            {!isCollapsed ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-text-primary truncate">
                      Operations Manager
                    </div>
                    <div className="text-xs text-text-muted truncate">
                      admin@sahejpilot.com
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Settings"
                    className="text-text-secondary hover:text-text-primary"
                  >
                    <span className="sr-only">Settings</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="LogOut"
                    className="text-text-secondary hover:text-error"
                  >
                    <span className="sr-only">Logout</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="User"
                  className="text-text-secondary hover:text-text-primary"
                  title="Profile"
                >
                  <span className="sr-only">Profile</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Settings"
                  className="text-text-secondary hover:text-text-primary"
                  title="Settings"
                >
                  <span className="sr-only">Settings</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="LogOut"
                  className="text-text-secondary hover:text-error"
                  title="Logout"
                >
                  <span className="sr-only">Logout</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;