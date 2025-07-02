import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { APIEndpoint, APIManagementProps } from '../../../types';

const APIManagement: React.FC<APIManagementProps> = ({ apiEndpoints, onTestEndpoint, onViewDocs }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null);
  const [testRequest, setTestRequest] = useState<string>('');

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET':
        return 'text-success bg-success-50 border-success-200';
      case 'POST':
        return 'text-primary bg-primary-50 border-primary-200';
      case 'PUT':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'DELETE':
        return 'text-error bg-error-50 border-error-200';
      default:
        return 'text-text-muted bg-surface border-border';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success-50';
      case 'deprecated':
        return 'text-warning bg-warning-50';
      case 'maintenance':
        return 'text-error bg-error-50';
      default:
        return 'text-text-muted bg-surface';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">API Management</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="ExternalLink"
          onClick={() => onViewDocs()}
        >
          View Documentation
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Endpoints List */}
        <div>
          <h4 className="text-md font-semibold text-text-primary mb-4">Available Endpoints</h4>
          <div className="space-y-3">
            {apiEndpoints.map((endpoint) => (
              <div
                key={endpoint.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedEndpoint?.id === endpoint.id
                    ? 'border-primary-200 bg-primary-50' :'border-border hover:border-primary-200 hover:bg-surface'
                }`}
                onClick={() => setSelectedEndpoint(endpoint)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getMethodColor(endpoint.method)}`}>
                      {endpoint.method.toUpperCase()}
                    </span>
                    <span className="text-sm font-mono text-text-primary">{endpoint.path}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(endpoint.status)}`}>
                    {endpoint.status}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-2">{endpoint.description}</p>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>Rate limit: {endpoint.rateLimit}</span>
                  <span>Last used: {endpoint.lastUsed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Testing */}
        <div>
          <h4 className="text-md font-semibold text-text-primary mb-4">API Testing</h4>
          {selectedEndpoint ? (
            <div className="space-y-4">
              <div className="p-4 bg-surface rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getMethodColor(selectedEndpoint.method)}`}>
                    {selectedEndpoint.method.toUpperCase()}
                  </span>
                  <span className="text-sm font-mono text-text-primary">{selectedEndpoint.path}</span>
                </div>
                <p className="text-sm text-text-secondary">{selectedEndpoint.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Request Body (JSON)
                </label>
                <textarea
                  value={testRequest}
                  onChange={(e) => setTestRequest(e.target.value)}
                  placeholder="Enter JSON request body..."
                  className="w-full h-32 px-3 py-2 border border-border rounded-md bg-card text-text-primary font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  iconName="Play"
                  onClick={() => onTestEndpoint(selectedEndpoint, testRequest)}
                  className="flex-1"
                >
                  Test Endpoint
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Copy"
                >
                  Copy cURL
                </Button>
              </div>

              <div className="p-4 bg-surface rounded-lg">
                <h5 className="text-sm font-medium text-text-primary mb-2">Parameters</h5>
                <div className="space-y-2">
                  {selectedEndpoint.parameters?.map((param, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="font-mono text-text-primary">{param.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-text-muted">{param.type}</span>
                        {param.required && (
                          <span className="px-1 py-0.5 bg-error-50 text-error text-xs rounded">
                            Required
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-surface rounded-lg">
                <h5 className="text-sm font-medium text-text-primary mb-2">Usage Statistics</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-text-muted">Requests Today</span>
                    <div className="text-lg font-semibold text-text-primary">{selectedEndpoint.requestsToday}</div>
                  </div>
                  <div>
                    <span className="text-xs text-text-muted">Success Rate</span>
                    <div className="text-lg font-semibold text-success">{selectedEndpoint.successRate}%</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Icon name="Code" size={48} className="text-text-muted mb-4" />
              <h5 className="text-lg font-medium text-text-primary mb-2">Select an Endpoint</h5>
              <p className="text-sm text-text-muted">
                Choose an endpoint from the list to test and view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default APIManagement;