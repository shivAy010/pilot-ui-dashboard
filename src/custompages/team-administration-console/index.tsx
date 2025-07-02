'use client'
import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import UserCard from './components/UserCard';
import OrganizationChart from './components/OrganizationChart';
import RolePermissionMatrix from './components/RolePermissionMatrix';
import UserOnboardingFlow from './components/UserOnboardingFlow';
import SecurityMonitoring from './components/SecurityMonitoring';
import BulkOperations from './components/BulkOperations';
import { OperationData, User, OrganizationNode, Role } from '../../types';
import * as LucideIcons from 'lucide-react';

const TeamAdministrationConsole = () => {
  const [activeTab, setActiveTab] = useState<string>('users');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<string>('grid');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data for users
  const [users] = useState<User[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@sahejpilot.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      role: "Admin",
      status: "active",
      department: "Engineering",
      joinDate: "Jan 15, 2023",
      lastActive: "2 hours ago",
      tasksCompleted: 156,
      projectsActive: 8,
      performanceScore: 94
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@sahejpilot.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      role: "Manager",
      status: "active",
      department: "Marketing",
      joinDate: "Mar 22, 2023",
      lastActive: "1 hour ago",
      tasksCompleted: 89,
      projectsActive: 5,
      performanceScore: 87
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@sahejpilot.com",
      phone: "+1 (555) 345-6789",
      location: "Austin, TX",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      role: "Specialist",
      status: "inactive",
      department: "Sales",
      joinDate: "Feb 8, 2023",
      lastActive: "3 days ago",
      tasksCompleted: 67,
      projectsActive: 3,
      performanceScore: 78
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@sahejpilot.com",
      phone: "+1 (555) 456-7890",
      location: "Seattle, WA",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      role: "Specialist",
      status: "pending",
      department: "Engineering",
      joinDate: "Apr 12, 2023",
      lastActive: "5 minutes ago",
      tasksCompleted: 124,
      projectsActive: 6,
      performanceScore: 91
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.thompson@sahejpilot.com",
      phone: "+1 (555) 567-8901",
      location: "Chicago, IL",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      role: "Manager",
      status: "suspended",
      department: "HR",
      joinDate: "Jan 30, 2023",
      lastActive: "1 week ago",
      tasksCompleted: 45,
      projectsActive: 2,
      performanceScore: 65
    },
    {
      id: 6,
      name: "James Wilson",
      email: "james.wilson@sahejpilot.com",
      phone: "+1 (555) 678-9012",
      location: "Boston, MA",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      role: "Admin",
      status: "active",
      department: "Operations",
      joinDate: "Dec 5, 2022",
      lastActive: "30 minutes ago",
      tasksCompleted: 203,
      projectsActive: 12,
      performanceScore: 96
    }
  ]);

  // Mock organization data
  const [organizationData] = useState<OrganizationNode[]>([
    {
      id: 'ceo',
      name: 'Robert Anderson',
      role: 'CEO',
      department: 'Executive',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
      status: 'active',
      teamSize: 45,
      children: [
        {
          id: 'cto',
          name: 'Sarah Johnson',
          role: 'CTO',
          department: 'Engineering',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
          status: 'active',
          teamSize: 15,
          children: [
            {
              id: 'eng-lead',
              name: 'David Kim',
              role: 'Engineering Lead',
              department: 'Engineering',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
              status: 'active',
              teamSize: 8
            }
          ]
        },
        {
          id: 'cmo',
          name: 'Michael Chen',
          role: 'CMO',
          department: 'Marketing',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          status: 'active',
          teamSize: 12,
          children: [
            {
              id: 'marketing-lead',
              name: 'Emily Rodriguez',
              role: 'Marketing Lead',
              department: 'Marketing',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
              status: 'inactive',
              teamSize: 6
            }
          ]
        }
      ]
    }
  ]);

  // Mock roles and permissions data
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'admin',
      name: 'Administrator',
      userCount: 3,
      permissions: ['user-create', 'user-edit', 'user-delete', 'role-manage', 'system-config', 'analytics-view', 'security-manage']
    },
    {
      id: 'manager',
      name: 'Manager',
      userCount: 8,
      permissions: ['user-view', 'user-edit', 'analytics-view', 'team-manage', 'content-create']
    },
    {
      id: 'specialist',
      name: 'Specialist',
      userCount: 15,
      permissions: ['user-view', 'content-create', 'content-edit', 'analytics-view']
    },
    {
      id: 'viewer',
      name: 'Viewer',
      userCount: 5,
      permissions: ['user-view', 'analytics-view']
    }
  ]);

  const [permissions] = useState([
    { id: 'user-create', name: 'Create Users', description: 'Add new users to the system', category: 'User Management' },
    { id: 'user-edit', name: 'Edit Users', description: 'Modify user information', category: 'User Management' },
    { id: 'user-delete', name: 'Delete Users', description: 'Remove users from system', category: 'User Management' },
    { id: 'user-view', name: 'View Users', description: 'Access user profiles', category: 'User Management' },
    { id: 'role-manage', name: 'Manage Roles', description: 'Create and modify user roles', category: 'User Management' },
    { id: 'content-create', name: 'Create Content', description: 'Add new content', category: 'Content Management' },
    { id: 'content-edit', name: 'Edit Content', description: 'Modify existing content', category: 'Content Management' },
    { id: 'analytics-view', name: 'View Analytics', description: 'Access analytics dashboard', category: 'Analytics' },
    { id: 'system-config', name: 'System Configuration', description: 'Modify system settings', category: 'System' },
    { id: 'security-manage', name: 'Security Management', description: 'Manage security settings', category: 'Security' },
    { id: 'team-manage', name: 'Team Management', description: 'Manage team members', category: 'User Management' }
  ]);

  // Mock security data
  const [securityData] = useState({
    activeSessions: 127,
    failedLogins: 23,
    securityAlerts: 5,
    complianceScore: 94,
    activityLog: [
      {
        id: 1,
        title: 'Multiple Failed Login Attempts',
        description: 'User attempted to login 5 times with incorrect credentials from suspicious IP address',
        severity: 'critical',
        status: 'open',
        user: 'unknown@external.com',
        location: 'Moscow, Russia',
        timestamp: '2 minutes ago'
      },
      {
        id: 2,
        title: 'Unusual Access Pattern Detected',
        description: 'User accessed system from new location outside normal hours',
        severity: 'warning',
        status: 'investigating',
        user: 'emily.rodriguez@sahejpilot.com',
        location: 'London, UK',
        timestamp: '15 minutes ago'
      },
      {
        id: 3,
        title: 'Permission Escalation Request',
        description: 'User requested elevated permissions for system administration',
        severity: 'info',
        status: 'resolved',
        user: 'david.kim@sahejpilot.com',
        location: 'Seattle, WA',
        timestamp: '1 hour ago'
      },
      {
        id: 4,
        title: 'Successful Security Audit',
        description: 'Automated security scan completed with no critical issues found',
        severity: 'success',
        status: 'resolved',
        user: 'system',
        location: 'Internal',
        timestamp: '3 hours ago'
      }
    ],
    loginPatterns: [
      {
        id: 1,
        user: 'Sarah Johnson',
        email: 'sarah.johnson@sahejpilot.com',
        loginCount: 45,
        locations: 2,
        devices: 3,
        lastLogin: '2h ago',
        riskLevel: 'low'
      },
      {
        id: 2,
        user: 'Michael Chen',
        email: 'michael.chen@sahejpilot.com',
        loginCount: 32,
        locations: 4,
        devices: 2,
        lastLogin: '1h ago',
        riskLevel: 'medium'
      },
      {
        id: 3,
        user: 'Emily Rodriguez',
        email: 'emily.rodriguez@sahejpilot.com',
        loginCount: 18,
        locations: 6,
        devices: 4,
        lastLogin: '3d ago',
        riskLevel: 'high'
      }
    ]
  });

  const tabs = [
    { id: 'users', name: 'User Management', icon: 'Users' },
    { id: 'organization', name: 'Organization Chart', icon: 'Sitemap' },
    { id: 'roles', name: 'Roles & Permissions', icon: 'Key' },
    { id: 'security', name: 'Security Monitoring', icon: 'Shield' },
    { id: 'bulk', name: 'Bulk Operations', icon: 'Settings' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUserSelect = (user: User) => {
    setSelectedUsers(prev => 
      prev.includes(user) 
        ? prev.filter(u => u !== user)
        : [...prev, user]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers);
    }
  };

  const handleUserEdit = (userId: string | number) => {
    console.log('Edit user:', userId);
  };

  const handleViewProfile = (userId: string | number) => {
    console.log('View profile:', userId);
  };

  const handleUserToggleStatus = (userId: string | number) => {
    console.log('Toggle status for user:', userId);
  };

  const handleUserSelect2 = (user: OrganizationNode) => {
    console.log('Selected user from org chart:', user);
  };

  const handlePermissionChange = (roleId: string, permissionId: string) => {
    setRoles(prev => prev.map(role => {
      if (role.id === roleId) {
        const hasPermission = role.permissions.includes(permissionId);
        return {
          ...role,
          permissions: hasPermission 
            ? role.permissions.filter(p => p !== permissionId)
            : [...role.permissions, permissionId]
        };
      }
      return role;
    }));
  };

  const handleCreateRole = (roleName: string) => {
    const newRole = {
      id: roleName.toLowerCase().replace(/\s+/g, '-'),
      name: roleName,
      userCount: 0,
      permissions: []
    };
    setRoles(prev => [...prev, newRole]);
  };

  const handleOnboardingComplete = () => {
    console.log('New user onboarded:');
  };

  const handleSecurityViewDetails = (activityId: string | number) => {
    console.log('View security details:', activityId);
  };

  const handleSecurityTakeAction = (activityId: string | number) => {
    console.log('Take security action:', activityId);
  };

  const handleBulkAction = (operationId: string | null, operationData: OperationData, selectedUsers: User[]) => {
    console.log('Bulk operation:', operationId, operationData, selectedUsers);
  };

  const handleClearSelection = () => {
    setSelectedUsers([]);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div className="space-y-6">
            {/* User Management Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h2 className="text-2xl font-semibold text-text-primary">User Management</h2>
                <p className="text-text-secondary mt-1">
                  Manage user accounts, roles, and access permissions
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                >
                  Export Users
                </Button>
                <Button
                  variant="primary"
                  iconName="Plus"
                  onClick={() => setIsOnboardingOpen(true)}
                >
                  Add User
                </Button>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
                    <Input
                      type="search"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-card text-text-primary"
                  >
                    <option value="all">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Specialist">Specialist</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-card text-text-primary"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="selectAll"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-primary border-border rounded"
                    />
                    <label htmlFor="selectAll" className="text-sm text-text-secondary">
                      Select All ({filteredUsers.length})
                    </label>
                  </div>
                  <div className="flex items-center space-x-1 border border-border rounded-md">
                    <Button
                      variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                      size="sm"
                      iconName="Grid3X3"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                    />
                    <Button
                      variant={viewMode === 'list' ? 'primary' : 'ghost'}
                      size="sm"
                      iconName="List"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Users Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredUsers.map((user: User) => (
                <div key={user.id} className="relative">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user)}
                    onChange={() => handleUserSelect(user)}
                    className="absolute top-4 left-4 w-4 h-4 text-primary border-border rounded z-10"
                  />
                  <UserCard
                    user={user}
                    onEdit={handleUserEdit}
                    onViewProfile={handleViewProfile}
                    onToggleStatus={handleUserToggleStatus}
                  />
                </div>
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Users" size={48} className="text-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No users found</h3>
                <p className="text-text-secondary">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            )}
          </div>
        );

      case 'organization':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-text-primary">Organization Chart</h2>
              <p className="text-text-secondary mt-1">
                Visualize your team structure and reporting relationships
              </p>
            </div>
            <OrganizationChart
              organizationData={organizationData}
              onUserSelect={handleUserSelect2}
            />
          </div>
        );

      case 'roles':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-text-primary">Roles & Permissions</h2>
              <p className="text-text-secondary mt-1">
                Configure user roles and manage access permissions
              </p>
            </div>
            <RolePermissionMatrix
              roles={roles}
              permissions={permissions}
              onPermissionChange={handlePermissionChange}
              onCreateRole={handleCreateRole}
            />
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-text-primary">Security Monitoring</h2>
              <p className="text-text-secondary mt-1">
                Monitor user activity and security events
              </p>
            </div>
            <SecurityMonitoring
              securityData={securityData}
              onViewDetails={handleSecurityViewDetails}
              onTakeAction={handleSecurityTakeAction}
            />
          </div>
        );

      case 'bulk':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-text-primary">Bulk Operations</h2>
              <p className="text-text-secondary mt-1">
                Perform actions on multiple users simultaneously
              </p>
            </div>
            <BulkOperations
              selectedUsers={selectedUsers}
              onBulkAction={handleBulkAction}
              onClearSelection={handleClearSelection}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Team Administration Console</h1>
              <p className="text-text-secondary">
                Comprehensive user management and organizational oversight
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Total Users</p>
                  <p className="text-2xl font-semibold text-text-primary">{users.length}</p>
                </div>
                <Icon name="Users" size={20} className="text-primary" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Active Users</p>
                  <p className="text-2xl font-semibold text-text-primary">
                    {users.filter(u => u.status === 'active').length}
                  </p>
                </div>
                <Icon name="UserCheck" size={20} className="text-success" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Departments</p>
                  <p className="text-2xl font-semibold text-text-primary">
                    {new Set(users.map(u => u.department)).size}
                  </p>
                </div>
                <Icon name="Building" size={20} className="text-accent" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Roles</p>
                  <p className="text-2xl font-semibold text-text-primary">{roles.length}</p>
                </div>
                <Icon name="Key" size={20} className="text-warning" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-border mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                }`}
              >
                <Icon name={tab.icon as keyof typeof LucideIcons} size={16} />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}

        {/* User Onboarding Modal */}
        <UserOnboardingFlow
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
          onComplete={handleOnboardingComplete}
        />
      </div>
    </div>
  );
};

export default TeamAdministrationConsole;