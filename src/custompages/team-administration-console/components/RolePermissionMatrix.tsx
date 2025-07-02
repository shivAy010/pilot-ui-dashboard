import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Permission, Role } from '../../../types';

interface RolePermissionMatrixProps {
  roles: Role[];
  permissions: Permission[];
  onPermissionChange: (roleId: string, permissionId: string) => void;
  onCreateRole: (roleName: string) => void;
}

const RolePermissionMatrix: React.FC<RolePermissionMatrixProps> = ({ roles, permissions, onPermissionChange, onCreateRole }) => {
  const [selectedRole, setSelectedRole] = useState<string>(roles[0]?.id || '');
  const [isCreatingRole, setIsCreatingRole] = useState<boolean>(false);
  const [newRoleName, setNewRoleName] = useState<string>('');

  const handlePermissionToggle = (roleId: string, permissionId: string) => {
    onPermissionChange(roleId, permissionId);
  };

  const handleCreateRole = () => {
    if (newRoleName.trim()) {
      onCreateRole(newRoleName.trim());
      setNewRoleName('');
      setIsCreatingRole(false);
    }
  };

  const getPermissionIcon = (permission: Permission) => {
    switch (permission.category) {
      case 'User Management':
        return 'Users';
      case 'Content Management':
        return 'FileText';
      case 'Analytics':
        return 'BarChart3';
      case 'Security':
        return 'Shield';
      case 'System':
        return 'Settings';
      default:
        return 'Key';
    }
  };

  const groupedPermissions: Record<string, Permission[]> = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  const selectedRoleData = roles.find(role => role.id === selectedRole);

  return (
    <div className="bg-card border border-border rounded-lg shadow-brand">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Key" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">Role & Permission Matrix</h3>
          </div>
          <Button
            variant="primary"
            size="sm"
            iconName="Plus"
            onClick={() => setIsCreatingRole(true)}
          >
            Create Role
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Role Selection */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-medium text-text-primary mb-3">Roles</h4>
            <div className="space-y-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                    selectedRole === role.id
                      ? 'bg-primary-50 border-primary-200 text-primary' :'bg-surface border-border text-text-secondary hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{role.name}</div>
                      <div className="text-xs text-text-muted">{role.userCount} users</div>
                    </div>
                    <Icon 
                      name="ChevronRight" 
                      size={16} 
                      className={selectedRole === role.id ? 'text-primary' : 'text-text-muted'}
                    />
                  </div>
                </button>
              ))}
              
              {isCreatingRole && (
                <div className="p-3 border border-border rounded-lg bg-surface">
                  <input
                    type="text"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    placeholder="Enter role name"
                    className="w-full px-2 py-1 text-sm border border-border rounded bg-card"
                    autoFocus
                  />
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleCreateRole}
                    >
                      Create
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsCreatingRole(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Permission Matrix */}
          <div className="lg:col-span-3">
            {selectedRoleData && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-text-primary">
                    Permissions for {selectedRoleData.name}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-muted">
                      {selectedRoleData.permissions.length} of {permissions.length} permissions
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                    <div key={category} className="border border-border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Icon 
                          name={getPermissionIcon(categoryPermissions[0])} 
                          size={16} 
                          className="text-primary" 
                        />
                        <h5 className="font-medium text-text-primary">{category}</h5>
                        <span className="text-xs text-text-muted">
                          ({categoryPermissions.length} permissions)
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {categoryPermissions.map((permission) => {
                          const hasPermission = selectedRoleData.permissions.includes(permission.id);
                          return (
                            <div
                              key={permission.id}
                              className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border"
                            >
                              <div className="flex-1">
                                <div className="font-medium text-sm text-text-primary">
                                  {permission.name}
                                </div>
                                <div className="text-xs text-text-muted">
                                  {permission.description}
                                </div>
                              </div>
                              <button
                                onClick={() => handlePermissionToggle(selectedRole, permission.id)}
                                className={`w-10 h-6 rounded-full transition-all duration-200 ${
                                  hasPermission 
                                    ? 'bg-primary' :'bg-secondary-300'
                                }`}
                              >
                                <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                                  hasPermission ? 'translate-x-5' : 'translate-x-1'
                                }`}></div>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePermissionMatrix;