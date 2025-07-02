import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { OperationData, User } from '../../../types';
import * as LucideIcons from 'lucide-react';

interface BulkOperationsProps {
  selectedUsers: User[];
  onBulkAction: (operationId: string | null, operationData: OperationData, selectedUsers: User[]) => void;
  onClearSelection: () => void;
}

const BulkOperations: React.FC<BulkOperationsProps> = ({ selectedUsers, onBulkAction, onClearSelection }) => {
  const [activeOperation, setActiveOperation] = useState<string | null>(null);
  const [operationData, setOperationData] = useState<OperationData>({
    role: '',
    department: '',
    status: '',
    permissions: [],
    message: ''
  });

  const operations = [
    {
      id: 'role-update',
      name: 'Update Roles',
      icon: 'UserCheck',
      description: 'Change roles for selected users',
      color: 'text-primary bg-primary-50 border-primary-200'
    },
    {
      id: 'department-transfer',
      name: 'Transfer Department',
      icon: 'Building',
      description: 'Move users to different department',
      color: 'text-accent bg-accent-50 border-accent-200'
    },
    {
      id: 'status-change',
      name: 'Change Status',
      icon: 'ToggleLeft',
      description: 'Activate, deactivate, or suspend users',
      color: 'text-warning bg-warning-50 border-warning-200'
    },
    {
      id: 'permission-update',
      name: 'Update Permissions',
      icon: 'Key',
      description: 'Modify access permissions',
      color: 'text-secondary bg-secondary-50 border-secondary-200'
    },
    {
      id: 'send-notification',
      name: 'Send Notification',
      icon: 'Mail',
      description: 'Send message to selected users',
      color: 'text-success bg-success-50 border-success-200'
    },
    {
      id: 'export-data',
      name: 'Export Data',
      icon: 'Download',
      description: 'Export user data to CSV/Excel',
      color: 'text-text-secondary bg-surface border-border'
    }
  ];

  const roles = ['Admin', 'Manager', 'Specialist', 'Viewer'];
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
  const statuses = ['active', 'inactive', 'suspended', 'pending'];

  const handleOperationSelect = (operationId: string) => {
    setActiveOperation(operationId);
    setOperationData({
      role: '',
      department: '',
      status: '',
      permissions: [],
      message: ''
    });
  };

  const handleExecute = () => {
    onBulkAction(activeOperation, operationData, selectedUsers);
    setActiveOperation(null);
    setOperationData({
      role: '',
      department: '',
      status: '',
      permissions: [],
      message: ''
    });
  };

  const renderOperationForm = () => {
    switch (activeOperation) {
      case 'role-update':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Select New Role
              </label>
              <select
                value={operationData.role}
                onChange={(e) => setOperationData(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md bg-card text-text-primary"
              >
                <option value="">Choose a role</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'department-transfer':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Select Target Department
              </label>
              <select
                value={operationData.department}
                onChange={(e) => setOperationData(prev => ({ ...prev, department: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md bg-card text-text-primary"
              >
                <option value="">Choose a department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'status-change':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Select New Status
              </label>
              <div className="grid grid-cols-2 gap-3">
                {statuses.map(status => (
                  <div
                    key={status}
                    onClick={() => setOperationData(prev => ({ ...prev, status }))}
                    className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                      operationData.status === status
                        ? 'border-primary bg-primary-50' :'border-border hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        status === 'active' ? 'bg-success' :
                        status === 'inactive' ? 'bg-secondary-400' :
                        status === 'suspended' ? 'bg-error' : 'bg-warning'
                      }`}></div>
                      <span className="font-medium text-text-primary capitalize">{status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'send-notification':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Message
              </label>
              <textarea
                value={operationData.message}
                onChange={(e) => setOperationData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Enter your message..."
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md bg-card text-text-primary resize-none"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (selectedUsers.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-brand p-8 text-center">
        <Icon name="Users" size={48} className="text-text-muted mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">No Users Selected</h3>
        <p className="text-text-secondary">
          Select users from the list to perform bulk operations
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-brand">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Users" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">
              Bulk Operations ({selectedUsers.length} users selected)
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClearSelection}
            className="text-text-secondary hover:text-text-primary"
          >
            Clear Selection
          </Button>
        </div>
      </div>

      <div className="p-6">
        {!activeOperation ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {operations.map((operation) => (
              <div
                key={operation.id}
                onClick={() => handleOperationSelect(operation.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-brand ${operation.color}`}
              >
                <div className="flex items-start space-x-3">
                  <Icon name={operation.icon as keyof typeof LucideIcons} size={20} />
                  <div>
                    <h4 className="font-medium mb-1">{operation.name}</h4>
                    <p className="text-sm opacity-80">{operation.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowLeft"
                onClick={() => setActiveOperation(null)}
                className="text-text-secondary hover:text-text-primary"
              />
              <h4 className="text-lg font-medium text-text-primary">
                {operations.find(op => op.id === activeOperation)?.name}
              </h4>
            </div>

            <div className="bg-surface border border-border rounded-lg p-4">
              <h5 className="font-medium text-text-primary mb-2">Selected Users</h5>
              <div className="flex flex-wrap gap-2">
                {selectedUsers.slice(0, 10).map((user) => (
                  <span
                    key={user.id}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary"
                  >
                    {user.name}
                  </span>
                ))}
                {selectedUsers.length > 10 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-700">
                    +{selectedUsers.length - 10} more
                  </span>
                )}
              </div>
            </div>

            {renderOperationForm()}

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="text-sm text-text-muted">
                This action will affect {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''}
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => setActiveOperation(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleExecute}
                  iconName="Check"
                  disabled={
                    (activeOperation === 'role-update' && !operationData.role) ||
                    (activeOperation === 'department-transfer' && !operationData.department) ||
                    (activeOperation === 'status-change' && !operationData.status) ||
                    (activeOperation === 'send-notification' && !operationData.message.trim())
                  }
                >
                  Execute Operation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkOperations;