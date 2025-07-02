import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

interface TaskFiltersState {
  search: string;
  priority: string;
  status: string;
  department: string;
  project: string;
  assignee: string;
  startDate?: string;
  endDate?: string;
  minProgress?: string;
  maxProgress?: string;
  overdue?: boolean;
  hasAttachments?: boolean;
  aiSuggested?: boolean;
}

interface TaskFiltersProps {
  filters: TaskFiltersState;
  onFiltersChange: (filters: TaskFiltersState) => void;
  onClearFilters: () => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const priorityOptions = ['All', 'High', 'Medium', 'Low'];
  const statusOptions = ['All', 'Pending', 'In Progress', 'Completed', 'Blocked'];
  const departmentOptions = ['All', 'Marketing', 'Development', 'Design', 'Sales', 'HR', 'Operations'];
  const projectOptions = ['All', 'Website Redesign', 'Mobile App', 'Marketing Campaign', 'Product Launch', 'System Upgrade'];

  const handleFilterChange = (key: string, value: string | boolean) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.priority !== 'All') count++;
    if (filters.status !== 'All') count++;
    if (filters.department !== 'All') count++;
    if (filters.project !== 'All') count++;
    if (filters.assignee !== 'All') count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-white border border-border rounded-lg shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Filter" size={20} className="text-text-muted" />
            <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
            {activeFiltersCount > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary border border-primary-200">
                {activeFiltersCount} active
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-text-muted hover:text-text-primary"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-text-muted hover:text-text-primary"
            />
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
            <Input
              type="search"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Priority</label>
            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {priorityOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Department</label>
            <select
              value={filters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {departmentOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Project</label>
            <select
              value={filters.project}
              onChange={(e) => handleFilterChange('project', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {projectOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="border-t border-border pt-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Due Date Range</label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="date"
                    value={filters.startDate || ''}
                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                    className="flex-1"
                  />
                  <span className="text-text-muted">to</span>
                  <Input
                    type="date"
                    value={filters.endDate || ''}
                    onChange={(e) => handleFilterChange('endDate', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Progress Range</label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Min %"
                    value={filters.minProgress || ''}
                    onChange={(e) => handleFilterChange('minProgress', e.target.value)}
                    className="flex-1"
                  />
                  <span className="text-text-muted">to</span>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Max %"
                    value={filters.maxProgress || ''}
                    onChange={(e) => handleFilterChange('maxProgress', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Assignee</label>
                <select
                  value={filters.assignee}
                  onChange={(e) => handleFilterChange('assignee', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="All">All Assignees</option>
                  <option value="me">Assigned to Me</option>
                  <option value="unassigned">Unassigned</option>
                  <option value="sarah">Sarah Johnson</option>
                  <option value="mike">Mike Chen</option>
                  <option value="emily">Emily Rodriguez</option>
                  <option value="david">David Kim</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.overdue || false}
                  onChange={(e) => handleFilterChange('overdue', e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary-500"
                />
                <span className="text-sm text-text-secondary">Show overdue tasks only</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.hasAttachments || false}
                  onChange={(e) => handleFilterChange('hasAttachments', e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary-500"
                />
                <span className="text-sm text-text-secondary">Has attachments</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.aiSuggested || false}
                  onChange={(e) => handleFilterChange('aiSuggested', e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary-500"
                />
                <span className="text-sm text-text-secondary">AI suggested priority</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskFilters;