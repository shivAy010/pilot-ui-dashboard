import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

interface AccessLog {
  id: number;
  user: string;
  userName: string;
  action: string;
  resource: string;
  ipAddress: string;
  location: string;
  device: string;
  timestamp: Date;
  status: 'success' | 'failed' | 'warning' | string;
  riskLevel: 'low' | 'medium' | 'high' | string;
}

const AccessLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'success' | 'failed' | 'warning'>('all');
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'quarter'>('today');
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);

  useEffect(() => {
    setAccessLogs([
      {
        id: 1,
        user: "admin@sahejpilot.com",
        userName: "System Administrator",
        action: "Login",
        resource: "Admin Dashboard",
        ipAddress: "192.168.1.100",
        location: "New York, US",
        device: "Chrome on Windows",
        timestamp: new Date(Date.now() - 300000),
        status: "success",
        riskLevel: "low"
      },
      {
        id: 2,
        user: "john.doe@sahejpilot.com",
        userName: "John Doe",
        action: "File Access",
        resource: "/secure/financial-reports/Q4-2023.pdf",
        ipAddress: "192.168.1.45",
        location: "San Francisco, US",
        device: "Safari on macOS",
        timestamp: new Date(Date.now() - 900000),
        status: "success",
        riskLevel: "medium"
      },
      {
        id: 3,
        user: "unknown",
        userName: "Unknown User",
        action: "Failed Login",
        resource: "Login Portal",
        ipAddress: "203.45.67.89",
        location: "Unknown Location",
        device: "Chrome on Linux",
        timestamp: new Date(Date.now() - 1800000),
        status: "failed",
        riskLevel: "high"
      },
      {
        id: 4,
        user: "sarah.wilson@sahejpilot.com",
        userName: "Sarah Wilson",
        action: "Permission Change",
        resource: "User Management",
        ipAddress: "192.168.1.78",
        location: "Chicago, US",
        device: "Firefox on Windows",
        timestamp: new Date(Date.now() - 3600000),
        status: "success",
        riskLevel: "medium"
      }
    ]);
  }, []);

  const getStatusColor = (status: AccessLog['status']) => {
    switch (status) {
      case 'success': return 'text-success bg-success-50';
      case 'failed': return 'text-error bg-error-50';
      case 'warning': return 'text-warning bg-warning-50';
      default: return 'text-text-secondary bg-secondary-50';
    }
  };

  const getRiskColor = (risk: AccessLog['riskLevel']) => {
    switch (risk) {
      case 'high': return 'text-error bg-error-50 border-error-200';
      case 'medium': return 'text-warning bg-warning-50 border-warning-200';
      case 'low': return 'text-success bg-success-50 border-success-200';
      default: return 'text-text-secondary bg-secondary-50 border-secondary-200';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'login': return 'LogIn';
      case 'logout': return 'LogOut';
      case 'file access': return 'FileText';
      case 'permission change': return 'Settings';
      case 'data export': return 'Download';
      case 'failed login': return 'AlertTriangle';
      default: return 'Activity';
    }
  };

  const filteredLogs = accessLogs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm);

    const matchesFilter = filterType === 'all' || log.status === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Activity" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-text-primary">Access Logs</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Filter">
            Advanced Filter
          </Button>
          <Button variant="primary" size="sm" iconName="Download">
            Export Logs
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Input
          type="search"
          placeholder="Search logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as 'all' | 'success' | 'failed' | 'warning')}
          className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Status</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
          <option value="warning">Warning</option>
        </select>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value as 'today' | 'week' | 'month' | 'quarter')}
          className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
        </select>
        <Button variant="ghost" size="sm" iconName="RefreshCw" className="w-full">
          Refresh
        </Button>
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto">
        <div className="space-y-3">
          {filteredLogs.map((log) => (
            <div key={log.id} className="border border-border rounded-lg p-4 hover:bg-surface transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-lg ${getStatusColor(log.status)}`}>
                    <Icon name={getActionIcon(log.action)} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium text-text-primary">
                        {log.action}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                        {log.status.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(log.riskLevel)}`}>
                        {log.riskLevel.toUpperCase()} RISK
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-text-secondary">
                      <div>
                        <span className="font-medium">User:</span> {log.userName} ({log.user})
                      </div>
                      <div>
                        <span className="font-medium">Resource:</span> {log.resource}
                      </div>
                      <div>
                        <span className="font-medium">IP Address:</span> {log.ipAddress}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {log.location}
                      </div>
                      <div>
                        <span className="font-medium">Device:</span> {log.device}
                      </div>
                      <div>
                        <span className="font-medium">Time:</span> {log.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="sm" iconName="Eye">
                    Details
                  </Button>
                  <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                    <span className="sr-only">More actions</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          Showing {filteredLogs.length} of {accessLogs.length} access logs
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="ChevronLeft" disabled>
            Previous
          </Button>
          <span className="px-3 py-1 bg-primary text-white rounded-md text-sm">1</span>
          <Button variant="outline" size="sm" iconName="ChevronRight">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessLogs;