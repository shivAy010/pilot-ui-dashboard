import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import * as LucideIcons from 'lucide-react';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
}

interface RoleAccess {
  role: string;
  permissions: string[];
  accessLevel: string;
}

interface AccountSetup {
  username: string;
  temporaryPassword: string;
  requirePasswordChange: boolean;
  sendWelcomeEmail: boolean;
}

interface FormData {
  personalInfo: PersonalInfo;
  roleAccess: RoleAccess;
  accountSetup: AccountSetup;
}

// interface Step {
//   id: number;
//   name: string;
//   icon: string;
// }

interface UserOnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (formData: FormData) => void;
}

const UserOnboardingFlow: React.FC<UserOnboardingFlowProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      position: ''
    },
    roleAccess: {
      role: '',
      permissions: [],
      accessLevel: 'standard'
    },
    accountSetup: {
      username: '',
      temporaryPassword: '',
      requirePasswordChange: true,
      sendWelcomeEmail: true
    }
  });

  const steps = [
    { id: 1, name: 'Personal Information', icon: 'User' },
    { id: 2, name: 'Role & Access', icon: 'Key' },
    { id: 3, name: 'Account Setup', icon: 'Settings' },
    { id: 4, name: 'Review & Complete', icon: 'CheckCircle' }
  ];

  const departments = [
    'Engineering', 'Marketing', 'Sales', 'Human Resources', 
    'Finance', 'Operations', 'Customer Support', 'Design'
  ];

  const roles = [
    { id: 'admin', name: 'Administrator', description: 'Full system access' },
    { id: 'manager', name: 'Manager', description: 'Team management access' },
    { id: 'specialist', name: 'Specialist', description: 'Department-specific access' },
    { id: 'viewer', name: 'Viewer', description: 'Read-only access' }
  ];

  const handleInputChange = (section: keyof FormData, field: string, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(formData);
    onClose();
    setCurrentStep(1);
    setFormData({
      personalInfo: {
        firstName: '', lastName: '', email: '', phone: '', department: '', position: ''
      },
      roleAccess: {
        role: '', permissions: [], accessLevel: 'standard'
      },
      accountSetup: {
        username: '', temporaryPassword: '', requirePasswordChange: true, sendWelcomeEmail: true
      }
    });
  };

  if (!isOpen) return null;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  First Name *
                </label>
                <Input
                  type="text"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Last Name *
                </label>
                <Input
                  type="text"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                value={formData.personalInfo.email}
                onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                value={formData.personalInfo.phone}
                onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Department *
                </label>
                <select
                  value={formData.personalInfo.department}
                  onChange={(e) => handleInputChange('personalInfo', 'department', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-card text-text-primary"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Position *
                </label>
                <Input
                  type="text"
                  value={formData.personalInfo.position}
                  onChange={(e) => handleInputChange('personalInfo', 'position', e.target.value)}
                  placeholder="Enter position/title"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Select Role *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roles.map(role => (
                  <div
                    key={role.id}
                    onClick={() => handleInputChange('roleAccess', 'role', role.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      formData.roleAccess.role === role.id
                        ? 'border-primary bg-primary-50' :'border-border hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        formData.roleAccess.role === role.id
                          ? 'border-primary bg-primary' :'border-secondary-300'
                      }`}>
                        {formData.roleAccess.role === role.id && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{role.name}</div>
                        <div className="text-sm text-text-muted">{role.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Access Level
              </label>
              <div className="space-y-2">
                {['standard', 'elevated', 'restricted'].map(level => (
                  <div
                    key={level}
                    onClick={() => handleInputChange('roleAccess', 'accessLevel', level)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                      formData.roleAccess.accessLevel === level
                        ? 'border-primary bg-primary-50' :'border-border hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        formData.roleAccess.accessLevel === level
                          ? 'border-primary bg-primary' :'border-secondary-300'
                      }`}></div>
                      <span className="font-medium text-text-primary capitalize">{level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Username *
              </label>
              <Input
                type="text"
                value={formData.accountSetup.username}
                onChange={(e) => handleInputChange('accountSetup', 'username', e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Temporary Password *
              </label>
              <Input
                type="password"
                value={formData.accountSetup.temporaryPassword}
                onChange={(e) => handleInputChange('accountSetup', 'temporaryPassword', e.target.value)}
                placeholder="Enter temporary password"
                required
              />
              <p className="text-xs text-text-muted mt-1">
                User will be required to change this password on first login
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="requirePasswordChange"
                  checked={formData.accountSetup.requirePasswordChange}
                  onChange={(e) => handleInputChange('accountSetup', 'requirePasswordChange', e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded"
                />
                <label htmlFor="requirePasswordChange" className="text-sm text-text-primary">
                  Require password change on first login
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="sendWelcomeEmail"
                  checked={formData.accountSetup.sendWelcomeEmail}
                  onChange={(e) => handleInputChange('accountSetup', 'sendWelcomeEmail', e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded"
                />
                <label htmlFor="sendWelcomeEmail" className="text-sm text-text-primary">
                  Send welcome email with login instructions
                </label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-surface border border-border rounded-lg p-4">
              <h4 className="font-medium text-text-primary mb-3">Personal Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-muted">Name:</span>
                  <span className="ml-2 text-text-primary">
                    {formData.personalInfo.firstName} {formData.personalInfo.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted">Email:</span>
                  <span className="ml-2 text-text-primary">{formData.personalInfo.email}</span>
                </div>
                <div>
                  <span className="text-text-muted">Department:</span>
                  <span className="ml-2 text-text-primary">{formData.personalInfo.department}</span>
                </div>
                <div>
                  <span className="text-text-muted">Position:</span>
                  <span className="ml-2 text-text-primary">{formData.personalInfo.position}</span>
                </div>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4">
              <h4 className="font-medium text-text-primary mb-3">Role & Access</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-muted">Role:</span>
                  <span className="ml-2 text-text-primary capitalize">{formData.roleAccess.role}</span>
                </div>
                <div>
                  <span className="text-text-muted">Access Level:</span>
                  <span className="ml-2 text-text-primary capitalize">{formData.roleAccess.accessLevel}</span>
                </div>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-lg p-4">
              <h4 className="font-medium text-text-primary mb-3">Account Setup</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-text-muted">Username:</span>
                  <span className="ml-2 text-text-primary">{formData.accountSetup.username}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={formData.accountSetup.requirePasswordChange ? "Check" : "X"} 
                    size={16} 
                    className={formData.accountSetup.requirePasswordChange ? "text-success" : "text-error"}
                  />
                  <span className="text-text-secondary">Require password change on first login</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={formData.accountSetup.sendWelcomeEmail ? "Check" : "X"} 
                    size={16} 
                    className={formData.accountSetup.sendWelcomeEmail ? "text-success" : "text-error"}
                  />
                  <span className="text-text-secondary">Send welcome email</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Add New User</h2>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary"
            />
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mt-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'bg-primary border-primary text-white' :'border-secondary-300 text-text-muted'
                }`}>
                  {currentStep > step.id ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step.icon as keyof typeof LucideIcons} size={16} />
                  )}
                </div>
                <span className={`ml-2 text-sm ${
                  currentStep >= step.id ? 'text-text-primary' : 'text-text-muted'
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-px mx-4 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-secondary-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-96">
          {renderStepContent()}
        </div>

        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              iconName="ChevronLeft"
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={onClose}
              >
                Cancel
              </Button>
              {currentStep < 4 ? (
                <Button
                  variant="primary"
                  onClick={handleNext}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleComplete}
                  iconName="Check"
                >
                  Complete Setup
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOnboardingFlow;