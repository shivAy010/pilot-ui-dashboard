import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Filters) => void;
}

interface Filters {
  dateRange: string;
  departments: string[];
  metrics: string[];
  status: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onClose, onApplyFilters }) => {
  const [filters, setFilters] = useState<Filters>({
    dateRange: '30d',
    departments: [],
    metrics: [],
    status: 'all'
  });

  const dateRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const departments = [
    { id: 'marketing', name: 'Marketing', color: 'bg-blue-100 text-blue-800' },
    { id: 'sales', name: 'Sales', color: 'bg-green-100 text-green-800' },
    { id: 'hr', name: 'Human Resources', color: 'bg-purple-100 text-purple-800' },
    { id: 'engineering', name: 'Engineering', color: 'bg-orange-100 text-orange-800' },
    { id: 'finance', name: 'Finance', color: 'bg-red-100 text-red-800' },
    { id: 'operations', name: 'Operations', color: 'bg-cyan-100 text-cyan-800' }
  ];

  const metricTypes = [
    { id: 'performance', name: 'Performance Metrics' },
    { id: 'financial', name: 'Financial Metrics' },
    { id: 'engagement', name: 'Engagement Metrics' },
    { id: 'productivity', name: 'Productivity Metrics' },
    { id: 'quality', name: 'Quality Metrics' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active Only' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' }
  ];

  const toggleDepartment = (deptId: string) => {
    setFilters(prev => ({
      ...prev,
      departments: prev.departments.includes(deptId)
        ? prev.departments.filter(id => id !== deptId)
        : [...prev.departments, deptId]
    }));
  };

  const toggleMetric = (metricId: string) => {
    setFilters(prev => ({
      ...prev,
      metrics: prev.metrics.includes(metricId)
        ? prev.metrics.filter(id => id !== metricId)
        : [...prev.metrics, metricId]
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      dateRange: '30d',
      departments: [],
      metrics: [],
      status: 'all'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end">
      <div className="bg-card border-l border-border h-full w-96 overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Advanced Filters</h2>
            <p className="text-sm text-text-muted">Customize your analytics view</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} iconName="X">
            <span className="sr-only">Close</span>
          </Button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Date Range
            </label>
            <div className="space-y-2">
              {dateRanges.map((range) => (
                <label
                  key={range.value}
                  className="flex items-center space-x-3 p-2 hover:bg-surface rounded-md cursor-pointer"
                >
                  <Input
                    type="checkbox"
                    checked={filters.dateRange === range.value}
                    onChange={() => setFilters(prev => ({ ...prev, dateRange: range.value }))}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-text-primary">{range.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Departments */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Departments ({filters.departments.length} selected)
            </label>
            <div className="space-y-2">
              {departments.map((dept) => (
                <label
                  key={dept.id}
                  className="flex items-center space-x-3 p-2 hover:bg-surface rounded-md cursor-pointer"
                >
                  <Input
                    type="checkbox"
                    checked={filters.departments.includes(dept.id)}
                    onChange={() => toggleDepartment(dept.id)}
                    className="w-4 h-4"
                  />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${dept.color}`}>
                    {dept.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Metric Types */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Metric Types ({filters.metrics.length} selected)
            </label>
            <div className="space-y-2">
              {metricTypes.map((metric) => (
                <label
                  key={metric.id}
                  className="flex items-center space-x-3 p-2 hover:bg-surface rounded-md cursor-pointer"
                >
                  <Input
                    type="checkbox"
                    checked={filters.metrics.includes(metric.id)}
                    onChange={() => toggleMetric(metric.id)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-text-primary">{metric.name}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Status Filter
            </label>
            <div className="space-y-2">
              {statusOptions.map((status) => (
                <label
                  key={status.value}
                  className="flex items-center space-x-3 p-2 hover:bg-surface rounded-md cursor-pointer"
                >
                  <Input
                    type="checkbox"
                    checked={filters.status === status.value}
                    onChange={() => setFilters(prev => ({ ...prev, status: status.value }))}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-text-primary">{status.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button variant="ghost" onClick={handleReset} iconName="RotateCcw">
            Reset
          </Button>
          <div className="flex space-x-3">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleApply} iconName="Check">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;