'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import RoleCard from './RoleCard';
import WelcomeHeader from './WelcomeHeader';
import { Role, User } from '../../types';

const RoleSelectionGateway = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [user] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Available roles with their configurations
  const availableRoles: Role[] = [
    {
      id: 'ads_executive',
      name: 'Ads/Campaign Executive',
      title: 'Ads/Campaign Executive',
      description: 'Manage advertising campaigns, monitor performance metrics, and optimize marketing strategies',
      icon: 'Megaphone',
      color: 'primary',
      pendingTasks: 12,
      activeProjects: 8,
      route: '/unified-command-dashboard?role=ads_executive',
      permissions: []
    },
    {
      id: 'hr',
      name: 'Human Resources',
      title: 'Human Resources',
      description: 'Handle recruitment, employee management, performance tracking, and organizational development',
      icon: 'Users',
      color: 'secondary',
      pendingTasks: 7,
      activeProjects: 5,
      route: '/team-administration-console?role=hr',
      permissions: []
    },
    {
      id: 'social_media',
      name: 'Social Media Manager',
      title: 'Social Media Manager',
      description: 'Create content strategies, manage social platforms, and analyze engagement metrics',
      icon: 'Share2',
      color: 'accent',
      pendingTasks: 15,
      activeProjects: 12,
      route: '/unified-command-dashboard?role=social_media',
      permissions: []
    },
    {
      id: 'developer',
      name: 'Software Developer',
      title: 'Software Developer',
      description: 'Build applications, implement features, maintain code quality, and collaborate on technical solutions',
      icon: 'Code',
      color: 'primary',
      pendingTasks: 23,
      activeProjects: 6,
      route: '/task-intelligence-center?role=developer',
      permissions: []
    },
    {
      id: 'qa',
      name: 'Quality Assurance',
      title: 'Quality Assurance',
      description: 'Test applications, ensure quality standards, identify bugs, and validate system functionality',
      icon: 'CheckCircle',
      color: 'success',
      pendingTasks: 18,
      activeProjects: 9,
      route: '/task-intelligence-center?role=qa',
      permissions: []
    },
    {
      id: 'devops',
      name: 'DevOps Engineer',
      title: 'DevOps Engineer',
      description: 'Manage infrastructure, deployment pipelines, system monitoring, and operational excellence',
      icon: 'Server',
      color: 'warning',
      pendingTasks: 11,
      activeProjects: 4,
      route: '/integration-marketplace?role=devops',
      permissions: []
    },
    {
      id: 'admin',
      name: 'System Administrator',
      title: 'System Administrator',
      description: 'Oversee system operations, manage user access, configure settings, and ensure security compliance',
      icon: 'Shield',
      color: 'destructive',
      pendingTasks: 6,
      activeProjects: 3,
      route: '/team-administration-console?role=admin',
      permissions: []
    },
    {
      id: 'customer_support',
      name: 'Customer Support',
      title: 'Customer Support',
      description: 'Assist customers, resolve issues, manage support tickets, and maintain client satisfaction',
      icon: 'Headphones',
      color: 'secondary',
      pendingTasks: 32,
      activeProjects: 7,
      route: '/notification-command-center?role=customer_support',
      permissions: []
    },
    {
      id: 'stakeholder',
      name: 'Stakeholder',
      title: 'Stakeholder',
      description: 'Monitor business metrics, review performance reports, and oversee strategic initiatives',
      icon: 'BarChart3',
      color: 'accent',
      pendingTasks: 4,
      activeProjects: 15,
      route: '/analytics-observatory?role=stakeholder',
      permissions: []
    }
  ];

  // Filter roles based on user permissions
  const userRoles = availableRoles;

  const handleRoleSelection = async (role: Role) => {
    setLoading(true);
    setSelectedRole(role);
    
    try {
      // Mock role configuration - in real app this would configure backend session
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store role in localStorage for persistence
      localStorage.setItem('selectedRole', JSON.stringify(role));
      localStorage.setItem('user', JSON.stringify(user));
      
      // Navigate to role-specific dashboard
      router.push(role.route ?? '/');
    } catch (error) {
      console.error('Failed to configure role:', error);
      setSelectedRole(null);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
      </div>

      <div className="relative z-10">
          {/* Role Selection Screen */}
          <div className="min-h-screen">
            <WelcomeHeader 
              user={user}
            />
            
            <main className="container py-12">
              <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    Select Your Role
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Choose your operational role to access your personalized dashboard with tailored features, 
                    tools, and insights specific to your responsibilities.
                  </p>
                </div>

                {/* System Status Indicator */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">System Status: All Operations Normal</span>
                  </div>
                </div>

                {/* Role Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {userRoles.map((role) => (
                    <RoleCard
                      key={role.id}
                      role={role}
                      onSelect={handleRoleSelection}
                      isSelected={selectedRole?.id === role.id}
                      isLoading={loading && selectedRole?.id === role.id}
                    />
                  ))}
                </div>

                {/* Quick Stats Section */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    System Overview
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {userRoles.reduce((sum, role) => sum + (role.pendingTasks ?? 0), 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Pending Tasks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent mb-1">
                        {userRoles.reduce((sum, role) => sum + (role.activeProjects ?? 0), 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Active Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary mb-1">
                        {userRoles.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Available Roles</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">99.8%</div>
                      <div className="text-sm text-muted-foreground">System Uptime</div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>

      </div>
    </div>
  );
};

export default RoleSelectionGateway;