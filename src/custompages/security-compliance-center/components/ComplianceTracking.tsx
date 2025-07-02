import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import * as LucideIcons from 'lucide-react';

interface ComplianceStandard {
  id: string;
  name: string;
  fullName: string;
  score: number;
  status: 'compliant' | 'review_required' | 'non_compliant' | string;
  lastAudit: string;
  nextAudit: string;
  requirements: number;
  completed: number;
  pending: number;
  icon: string;
}

interface Audit {
  id: number;
  standard: string;
  type: string;
  date: string;
  auditor: string;
  result: string;
  findings: number;
}

const ComplianceTracking: React.FC = () => {
  const [selectedStandard, setSelectedStandard] = useState<string>('gdpr');
  const [lastAuditDate, setLastAuditDate] = useState<string>('');
  const [nextAuditDate, setNextAuditDate] = useState<string>('');
  const [recentAuditDates, setRecentAuditDates] = useState<string[]>([]);

  const complianceStandards: ComplianceStandard[] = [
    {
      id: 'gdpr',
      name: 'GDPR',
      fullName: 'General Data Protection Regulation',
      score: 96,
      status: 'compliant',
      lastAudit: '2024-01-15',
      nextAudit: '2024-04-15',
      requirements: 42,
      completed: 40,
      pending: 2,
      icon: 'Shield'
    },
    {
      id: 'soc2',
      name: 'SOC 2',
      fullName: 'Service Organization Control 2',
      score: 94,
      status: 'compliant',
      lastAudit: '2024-01-10',
      nextAudit: '2024-07-10',
      requirements: 38,
      completed: 36,
      pending: 2,
      icon: 'FileCheck'
    },
    {
      id: 'hipaa',
      name: 'HIPAA',
      fullName: 'Health Insurance Portability and Accountability Act',
      score: 89,
      status: 'review_required',
      lastAudit: '2023-12-20',
      nextAudit: '2024-03-20',
      requirements: 35,
      completed: 31,
      pending: 4,
      icon: 'Heart'
    },
    {
      id: 'iso27001',
      name: 'ISO 27001',
      fullName: 'Information Security Management',
      score: 92,
      status: 'compliant',
      lastAudit: '2024-01-05',
      nextAudit: '2024-06-05',
      requirements: 114,
      completed: 105,
      pending: 9,
      icon: 'Lock'
    }
  ];

  const getStatusColor = (status: ComplianceStandard['status']) => {
    switch (status) {
      case 'compliant': return 'text-success bg-success-50 border-success-200';
      case 'review_required': return 'text-warning bg-warning-50 border-warning-200';
      case 'non_compliant': return 'text-error bg-error-50 border-error-200';
      default: return 'text-text-secondary bg-secondary-50 border-secondary-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-success';
    if (score >= 85) return 'text-warning';
    return 'text-error';
  };

  const selectedStandardData = complianceStandards.find(s => s.id === selectedStandard);

  const recentAudits: Audit[] = [
    {
      id: 1,
      standard: 'GDPR',
      type: 'Quarterly Review',
      date: '2024-01-15',
      auditor: 'Internal Security Team',
      result: 'Passed',
      findings: 2
    },
    {
      id: 2,
      standard: 'SOC 2',
      type: 'Annual Assessment',
      date: '2024-01-10',
      auditor: 'External Auditor',
      result: 'Passed',
      findings: 1
    },
    {
      id: 3,
      standard: 'ISO 27001',
      type: 'Internal Audit',
      date: '2024-01-05',
      auditor: 'Compliance Team',
      result: 'Passed',
      findings: 3
    }
  ];

  useEffect(() => {
    if (selectedStandardData) {
      setLastAuditDate(new Date(selectedStandardData.lastAudit).toLocaleDateString());
      setNextAuditDate(new Date(selectedStandardData.nextAudit).toLocaleDateString());
    }
    setRecentAuditDates(recentAudits.map(audit => new Date(audit.date).toLocaleDateString()));
  }, [selectedStandard, selectedStandardData]);

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="FileCheck" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-text-primary">Compliance Tracking</h2>
        </div>
        <Button variant="primary" size="sm" iconName="Download">
          Generate Report
        </Button>
      </div>

      {/* Compliance Standards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {complianceStandards.map((standard) => (
          <div
            key={standard.id}
            onClick={() => setSelectedStandard(standard.id)}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedStandard === standard.id
                ? 'border-primary bg-primary-50' :'border-border hover:border-primary-300 hover:bg-surface'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <Icon name={standard.icon as keyof typeof LucideIcons} size={20} className="text-primary" />
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(standard.status)}`}>
                {standard.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <h3 className="font-medium text-text-primary mb-1">{standard.name}</h3>
            <p className="text-xs text-text-muted mb-2">{standard.fullName}</p>
            <div className="flex items-center justify-between">
              <span className={`text-lg font-bold ${getScoreColor(standard.score)}`}>
                {standard.score}%
              </span>
              <span className="text-xs text-text-secondary">
                {standard.completed}/{standard.requirements}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Standard Details */}
      {selectedStandardData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-surface rounded-lg p-4">
            <h3 className="font-medium text-text-primary mb-4">
              {selectedStandardData.fullName} Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-text-secondary">Compliance Score:</span>
                <span className={`font-medium ${getScoreColor(selectedStandardData.score)}`}>
                  {selectedStandardData.score}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-text-secondary">Requirements Met:</span>
                <span className="font-medium text-text-primary">
                  {selectedStandardData.completed}/{selectedStandardData.requirements}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-text-secondary">Pending Items:</span>
                <span className="font-medium text-warning">
                  {selectedStandardData.pending}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-text-secondary">Last Audit:</span>
                <span className="font-medium text-text-primary">
                  {lastAuditDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-text-secondary">Next Audit:</span>
                <span className="font-medium text-text-primary">
                  {nextAuditDate}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-lg p-4">
            <h3 className="font-medium text-text-primary mb-4">Progress Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Completed</span>
                  <span className="text-success font-medium">
                    {Math.round((selectedStandardData.completed / selectedStandardData.requirements) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div
                    className="bg-success h-2 rounded-full"
                    style={{
                      width: `${(selectedStandardData.completed / selectedStandardData.requirements) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">
                    {selectedStandardData.completed}
                  </div>
                  <div className="text-xs text-text-muted">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">
                    {selectedStandardData.pending}
                  </div>
                  <div className="text-xs text-text-muted">Pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Audits */}
      <div>
        <h3 className="font-medium text-text-primary mb-4">Recent Audits</h3>
        <div className="space-y-3">
          {recentAudits.map((audit, idx) => (
            <div key={audit.id} className="flex items-center justify-between p-3 bg-surface rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div>
                  <div className="font-medium text-text-primary text-sm">
                    {audit.standard} - {audit.type}
                  </div>
                  <div className="text-xs text-text-muted">
                    {audit.auditor} • {recentAuditDates[idx]}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-success-50 text-success text-xs rounded-full">
                  {audit.result}
                </span>
                <span className="text-xs text-text-muted">
                  {audit.findings} findings
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceTracking;