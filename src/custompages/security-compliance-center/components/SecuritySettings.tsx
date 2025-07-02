import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface SecurityPolicy {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  critical: boolean;
  compliance: string[];
}

interface EncryptionStatus {
  component: string;
  status: string;
  method: string;
  lastUpdated: string;
}

interface IncidentResponse {
  id: number;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | string;
  responseTime: string;
  contacts: string[];
  automated: boolean;
}

const SecuritySettings = () => {
  const [mfaEnabled] = useState<boolean>(true);
  // const [passwordPolicy, setPasswordPolicy] = useState<string>('strong');
  // const [sessionTimeout, setSessionTimeout] = useState<string>('30');
  // const [encryptionLevel, setEncryptionLevel] = useState<string>('aes256');
  const [encryptionUpdatedDates, setEncryptionUpdatedDates] = useState<string[]>([]);

  const securityPolicies: SecurityPolicy[] = [
    {
      id: 1,
      name: "Multi-Factor Authentication",
      description: "Require MFA for all user accounts",
      enabled: mfaEnabled,
      critical: true,
      compliance: ["GDPR", "SOC 2", "HIPAA"]
    },
    {
      id: 2,
      name: "Password Complexity",
      description: "Enforce strong password requirements",
      enabled: true,
      critical: true,
      compliance: ["SOC 2", "ISO 27001"]
    },
    {
      id: 3,
      name: "Session Management",
      description: "Automatic session timeout and management",
      enabled: true,
      critical: false,
      compliance: ["GDPR", "HIPAA"]
    },
    {
      id: 4,
      name: "Data Encryption",
      description: "End-to-end encryption for sensitive data",
      enabled: true,
      critical: true,
      compliance: ["GDPR", "SOC 2", "HIPAA", "ISO 27001"]
    },
    {
      id: 5,
      name: "Access Logging",
      description: "Comprehensive audit trail for all access",
      enabled: true,
      critical: false,
      compliance: ["SOC 2", "ISO 27001"]
    },
    {
      id: 6,
      name: "IP Whitelisting",
      description: "Restrict access to approved IP addresses",
      enabled: false,
      critical: false,
      compliance: ["SOC 2"]
    }
  ];

  const encryptionStatus: EncryptionStatus[] = [
    {
      component: "Database",
      status: "encrypted",
      method: "AES-256",
      lastUpdated: "2024-01-15"
    },
    {
      component: "File Storage",
      status: "encrypted",
      method: "AES-256",
      lastUpdated: "2024-01-15"
    },
    {
      component: "API Communications",
      status: "encrypted",
      method: "TLS 1.3",
      lastUpdated: "2024-01-15"
    },
    {
      component: "Backup Systems",
      status: "encrypted",
      method: "AES-256",
      lastUpdated: "2024-01-15"
    },
    {
      component: "Log Files",
      status: "encrypted",
      method: "AES-256",
      lastUpdated: "2024-01-15"
    }
  ];

  const incidentResponse: IncidentResponse[] = [
    {
      id: 1,
      type: "Data Breach",
      severity: "critical",
      responseTime: "< 1 hour",
      contacts: ["security@sahejpilot.com", "legal@sahejpilot.com"],
      automated: true
    },
    {
      id: 2,
      type: "Unauthorized Access",
      severity: "high",
      responseTime: "< 2 hours",
      contacts: ["security@sahejpilot.com", "admin@sahejpilot.com"],
      automated: true
    },
    {
      id: 3,
      type: "Malware Detection",
      severity: "medium",
      responseTime: "< 4 hours",
      contacts: ["it@sahejpilot.com"],
      automated: false
    },
    {
      id: 4,
      type: "System Vulnerability",
      severity: "medium",
      responseTime: "< 24 hours",
      contacts: ["devops@sahejpilot.com"],
      automated: false
    }
  ];

  const getSeverityColor = (severity: IncidentResponse['severity']) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error-50 border-error-200';
      case 'high': return 'text-warning bg-warning-50 border-warning-200';
      case 'medium': return 'text-accent bg-accent-50 border-accent-200';
      case 'low': return 'text-success bg-success-50 border-success-200';
      default: return 'text-text-secondary bg-secondary-50 border-secondary-200';
    }
  };

  useEffect(() => {
    setEncryptionUpdatedDates(encryptionStatus.map(item => new Date(item.lastUpdated).toLocaleDateString()));
  }, []);

  return (
    <div className="space-y-6">
      {/* Security Policies */}
      <div className="bg-white rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="Settings" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-text-primary">Security Policies</h2>
          </div>
          <Button variant="primary" size="sm" iconName="Save">
            Save Changes
          </Button>
        </div>

        <div className="space-y-4">
          {securityPolicies.map((policy) => (
            <div key={policy.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`p-2 rounded-lg ${policy.enabled ? 'bg-success-50' : 'bg-secondary-50'}`}>
                  <Icon 
                    name={policy.enabled ? 'CheckCircle' : 'Circle'} 
                    size={20} 
                    className={policy.enabled ? 'text-success' : 'text-text-muted'}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-sm font-medium text-text-primary">
                      {policy.name}
                    </h3>
                    {policy.critical && (
                      <span className="px-2 py-1 bg-error-50 text-error text-xs rounded-full border border-error-200">
                        CRITICAL
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary mb-2">
                    {policy.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {policy.compliance.map((standard, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-accent-50 text-accent text-xs rounded-md border border-accent-200"
                      >
                        {standard}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={policy.enabled}
                    onChange={() => {}}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <Button variant="ghost" size="sm" iconName="Settings">
                  Configure
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Encryption Status */}
      <div className="bg-white rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="Lock" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-text-primary">Data Encryption Status</h2>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></div>
            <span className="text-sm text-success font-medium">All Systems Encrypted</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {encryptionStatus.map((item, idx) => (
            <div key={idx} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-text-primary">
                  {item.component}
                </h3>
                <Icon name="Shield" size={16} className="text-success" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Status:</span>
                  <span className="text-success font-medium">Encrypted</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Method:</span>
                  <span className="text-text-primary font-medium">{item.method}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Updated:</span>
                  <span className="text-text-muted">{encryptionUpdatedDates[idx]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incident Response */}
      <div className="bg-white rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-text-primary">Incident Response Workflows</h2>
          </div>
          <Button variant="outline" size="sm" iconName="Plus">
            Add Workflow
          </Button>
        </div>

        <div className="space-y-4">
          {incidentResponse.map((incident) => (
            <div key={incident.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-lg border ${getSeverityColor(incident.severity)}`}>
                    <Icon name="AlertTriangle" size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium text-text-primary">
                        {incident.type}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                        {incident.severity.toUpperCase()}
                      </span>
                      {incident.automated && (
                        <span className="px-2 py-1 bg-accent-50 text-accent text-xs rounded-full border border-accent-200">
                          AUTOMATED
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-text-secondary">
                      <div>
                        <span className="font-medium">Response Time:</span> {incident.responseTime}
                      </div>
                      <div>
                        <span className="font-medium">Contacts:</span> {incident.contacts.length} assigned
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm font-medium text-text-secondary">Contact List:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {incident.contacts.map((contact, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-surface text-text-primary text-xs rounded-md"
                          >
                            {contact}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="sm" iconName="Edit">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Play">
                    Test
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;