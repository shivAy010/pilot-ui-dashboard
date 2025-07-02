import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface UserPermission {
  id: number;
  user: string;
  name: string;
  role: string;
  department: string;
  permissions: string[];
  lastAccess: Date;
  riskScore: number;
  status: 'active' | 'inactive' | 'suspended' | string;
  overPrivileged: boolean;
}

interface RolePermission {
  id: number;
  role: string;
  users: number;
  permissions: string[];
  lastReview: string;
  riskLevel: 'low' | 'medium' | 'high' | string;
  needsReview: boolean;
}

const PermissionAudit: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'users' | 'roles'>('users');
  const [lastAccessDates, setLastAccessDates] = useState<string[]>([]);
  const [lastReviewDates, setLastReviewDates] = useState<string[]>([]);

  const userPermissions: UserPermission[] = [
    {
      id: 1,
      user: "john.doe@sahejpilot.com",
      name: "John Doe",
      role: "Operations Manager",
      department: "Operations",
      permissions: ["read:all", "write:reports", "admin:team"],
      lastAccess: new Date(Date.now() - 3600000),
      riskScore: 85,
      status: "active",
      overPrivileged: true
    },
    {
      id: 2,
      user: "sarah.wilson@sahejpilot.com",
      name: "Sarah Wilson",
      role: "HR Specialist",
      department: "Human Resources",
      permissions: ["read:hr", "write:hr", "admin:users"],
      lastAccess: new Date(Date.now() - 7200000),
      riskScore: 45,
      status: "active",
      overPrivileged: false
    },
    {
      id: 3,
      user: "mike.johnson@sahejpilot.com",
      name: "Mike Johnson",
      role: "Data Analyst",
      department: "Analytics",
      permissions: ["read:analytics", "write:reports", "admin:dashboard"],
      lastAccess: new Date(Date.now() - 86400000),
      riskScore: 92,
      status: "inactive",
      overPrivileged: true
    },
    {
      id: 4,
      user: "admin@sahejpilot.com",
      name: "System Administrator",
      role: "System Admin",
      department: "IT",
      permissions: ["admin:all", "write:all", "read:all", "delete:all"],
      lastAccess: new Date(Date.now() - 1800000),
      riskScore: 98,
      status: "active",
      overPrivileged: false
    }
  ];

  const rolePermissions: RolePermission[] = [
    {
      id: 1,
      role: "Operations Manager",
      users: 3,
      permissions: ["read:all", "write:reports", "admin:team", "delete:reports"],
      lastReview: "2024-01-15",
      riskLevel: "medium",
      needsReview: true
    },
    {
      id: 2,
      role: "HR Specialist",
      users: 2,
      permissions: ["read:hr", "write:hr", "admin:users"],
      lastReview: "2024-01-20",
      riskLevel: "low",
      needsReview: false
    },
    {
      id: 3,
      role: "Data Analyst",
      users: 5,
      permissions: ["read:analytics", "write:reports", "admin:dashboard"],
      lastReview: "2023-12-10",
      riskLevel: "high",
      needsReview: true
    },
    {
      id: 4,
      role: "System Admin",
      users: 1,
      permissions: ["admin:all", "write:all", "read:all", "delete:all"],
      lastReview: "2024-01-25",
      riskLevel: "high",
      needsReview: false
    }
  ];

  useEffect(() => {
    setLastAccessDates(userPermissions.map(user => user.lastAccess ? new Date(user.lastAccess).toLocaleDateString() : ''));
    setLastReviewDates(rolePermissions.map(role => role.lastReview ? new Date(role.lastReview).toLocaleDateString() : ''));
  }, []);

  const getRiskColor = (score: number) => {
    if (score >= 90) return 'text-error';
    if (score >= 70) return 'text-warning';
    return 'text-success';
  };

  const getRiskLevelColor = (level: RolePermission['riskLevel']) => {
    switch (level) {
      case 'high': return 'text-error bg-error-50 border-error-200';
      case 'medium': return 'text-warning bg-warning-50 border-warning-200';
      case 'low': return 'text-success bg-success-50 border-success-200';
      default: return 'text-text-secondary bg-secondary-50 border-secondary-200';
    }
  };

  const getStatusColor = (status: UserPermission['status']) => {
    switch (status) {
      case 'active': return 'text-success bg-success-50';
      case 'inactive': return 'text-error bg-error-50';
      case 'suspended': return 'text-warning bg-warning-50';
      default: return 'text-text-secondary bg-secondary-50';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="UserCheck" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-text-primary">Permission Audit</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="AlertTriangle">
            Review Flagged
          </Button>
          <Button variant="primary" size="sm" iconName="Download">
            Export Audit
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-surface rounded-lg p-1">
        <button
          onClick={() => setSelectedTab('users')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedTab === 'users' ?'bg-white text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          User Permissions
        </button>
        <button
          onClick={() => setSelectedTab('roles')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedTab === 'roles' ?'bg-white text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          Role Permissions
        </button>
      </div>

      {/* User Permissions Tab */}
      {selectedTab === 'users' && (
        <div className="space-y-4">
          {userPermissions.map((user, idx) => (
            <div key={user.id} className="border border-border rounded-lg p-4 hover:bg-surface transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium text-text-primary">
                        {user.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status.toUpperCase()}
                      </span>
                      {user.overPrivileged && (
                        <span className="px-2 py-1 bg-warning-50 text-warning text-xs rounded-full border border-warning-200">
                          OVER-PRIVILEGED
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-text-secondary mb-2">
                      <div>
                        <span className="font-medium">Email:</span> {user.user}
                      </div>
                      <div>
                        <span className="font-medium">Role:</span> {user.role}
                      </div>
                      <div>
                        <span className="font-medium">Department:</span> {user.department}
                      </div>
                      <div>
                        <span className="font-medium">Last Access:</span> {lastAccessDates[idx]}
                      </div>
                    </div>
                    <div className="mb-2">
                      <span className="text-sm font-medium text-text-secondary">Permissions:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.permissions.map((permission, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-accent-50 text-accent text-xs rounded-md border border-accent-200"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-text-secondary">Risk Score:</span>
                        <span className={`font-bold ${getRiskColor(user.riskScore)}`}>
                          {user.riskScore}/100
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="sm" iconName="Edit">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                    <span className="sr-only">More actions</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Role Permissions Tab */}
      {selectedTab === 'roles' && (
        <div className="space-y-4">
          {rolePermissions.map((role, idx) => (
            <div key={role.id} className="border border-border rounded-lg p-4 hover:bg-surface transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    <Icon name="Shield" size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium text-text-primary">
                        {role.role}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(role.riskLevel)}`}>
                        {role.riskLevel.toUpperCase()} RISK
                      </span>
                      {role.needsReview && (
                        <span className="px-2 py-1 bg-warning-50 text-warning text-xs rounded-full border border-warning-200">
                          NEEDS REVIEW
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-text-secondary mb-2">
                      <div>
                        <span className="font-medium">Users:</span> {role.users}
                      </div>
                      <div>
                        <span className="font-medium">Last Review:</span> {lastReviewDates[idx]}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-text-secondary">Permissions:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {role.permissions.map((permission, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-accent-50 text-accent text-xs rounded-md border border-accent-200"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="sm" iconName="Users">
                    View Users
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Edit">
                    Edit Role
                  </Button>
                  <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                    <span className="sr-only">More actions</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PermissionAudit;