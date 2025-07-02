import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface Threat {
  id: number;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | string;
  source: string;
  target: string;
  timestamp: Date;
  status: 'blocked' | 'quarantined' | 'monitoring' | string;
  description: string;
}

const ThreatMonitoring: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [threatTimestamps, setThreatTimestamps] = useState<string[]>([]);

  const threatData: Threat[] = [
    {
      id: 1,
      type: "Suspicious Login",
      severity: "medium",
      source: "192.168.1.45",
      target: "admin@sahejpilot.com",
      timestamp: new Date(Date.now() - 1800000),
      status: "blocked",
      description: "Multiple failed login attempts from unknown IP"
    },
    {
      id: 2,
      type: "Malware Detection",
      severity: "high",
      source: "Email Gateway",
      target: "hr@sahejpilot.com",
      timestamp: new Date(Date.now() - 3600000),
      status: "quarantined",
      description: "Suspicious attachment detected and quarantined"
    },
    {
      id: 3,
      type: "Data Exfiltration",
      severity: "low",
      source: "Internal Network",
      target: "Database Server",
      timestamp: new Date(Date.now() - 7200000),
      status: "monitoring",
      description: "Unusual data access pattern detected"
    },
    {
      id: 4,
      type: "Phishing Attempt",
      severity: "medium",
      source: "External Email",
      target: "finance@sahejpilot.com",
      timestamp: new Date(Date.now() - 10800000),
      status: "blocked",
      description: "Phishing email blocked by security filters"
    }
  ];

  useEffect(() => {
    setThreatTimestamps(threatData.map(threat => threat.timestamp ? threat.timestamp.toLocaleString() : ''));
  }, []);

  const getSeverityColor = (severity: Threat['severity']) => {
    switch (severity) {
      case 'high': return 'text-error bg-error-50 border-error-200';
      case 'medium': return 'text-warning bg-warning-50 border-warning-200';
      case 'low': return 'text-success bg-success-50 border-success-200';
      default: return 'text-text-secondary bg-secondary-50 border-secondary-200';
    }
  };

  const getStatusColor = (status: Threat['status']) => {
    switch (status) {
      case 'blocked': return 'text-error bg-error-50';
      case 'quarantined': return 'text-warning bg-warning-50';
      case 'monitoring': return 'text-accent bg-accent-50';
      default: return 'text-text-secondary bg-secondary-50';
    }
  };

  const getSeverityIcon = (severity: Threat['severity']) => {
    switch (severity) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'Info';
      default: return 'Shield';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Shield" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-text-primary">Real-time Threat Monitoring</h2>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as '1h' | '24h' | '7d' | '30d')}
            className="px-3 py-1 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <Button variant="ghost" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {threatData.map((threat, idx) => (
          <div key={threat.id} className="border border-border rounded-lg p-4 hover:bg-surface transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`p-2 rounded-lg border ${getSeverityColor(threat.severity)}`}>
                  <Icon name={getSeverityIcon(threat.severity)} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-sm font-medium text-text-primary">
                      {threat.type}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(threat.severity)}`}>
                      {threat.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">
                    {threat.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-text-muted">
                    <span>Source: {threat.source}</span>
                    <span>Target: {threat.target}</span>
                    <span>{threatTimestamps[idx]}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(threat.status)}`}>
                  {threat.status.charAt(0).toUpperCase() + threat.status.slice(1)}
                </span>
                <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                  <span className="sr-only">More actions</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          Showing {threatData.length} threats from the last {timeRange}
        </p>
        <Button variant="outline" size="sm" iconName="ExternalLink">
          View All Threats
        </Button>
      </div>
    </div>
  );
};

export default ThreatMonitoring;