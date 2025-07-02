import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import * as LucideIcons from 'lucide-react';

interface ReportBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AvailableMetric {
  id: string;
  name: string;
  category: string;
}

interface ReportType {
  value: string;
  label: string;
  icon: string;
}

interface ScheduleOption {
  value: string;
  label: string;
}

const ReportBuilder: React.FC<ReportBuilderProps> = ({ isOpen, onClose }) => {
  const [reportName, setReportName] = useState<string>('');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [reportType, setReportType] = useState<string>('dashboard');
  const [schedule, setSchedule] = useState<string>('manual');

  const availableMetrics: AvailableMetric[] = [
    { id: 'revenue', name: 'Revenue Analytics', category: 'Financial' },
    { id: 'users', name: 'User Engagement', category: 'Marketing' },
    { id: 'performance', name: 'System Performance', category: 'Technical' },
    { id: 'productivity', name: 'Team Productivity', category: 'Operations' },
    { id: 'conversion', name: 'Conversion Rates', category: 'Marketing' },
    { id: 'satisfaction', name: 'Customer Satisfaction', category: 'Support' }
  ];

  const reportTypes: ReportType[] = [
    { value: 'dashboard', label: 'Interactive Dashboard', icon: 'LayoutDashboard' },
    { value: 'pdf', label: 'PDF Report', icon: 'FileText' },
    { value: 'excel', label: 'Excel Spreadsheet', icon: 'Table' },
    { value: 'presentation', label: 'Presentation Slides', icon: 'Presentation' }
  ];

  const scheduleOptions: ScheduleOption[] = [
    { value: 'manual', label: 'Manual Generation' },
    { value: 'daily', label: 'Daily at 9:00 AM' },
    { value: 'weekly', label: 'Weekly on Monday' },
    { value: 'monthly', label: 'Monthly on 1st' }
  ];

  const toggleMetric = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const handleGenerate = () => {
    console.log('Generating report:', {
      name: reportName,
      metrics: selectedMetrics,
      type: reportType,
      schedule
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Create Custom Report</h2>
            <p className="text-sm text-text-muted">Build and schedule automated reports</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} iconName="X">
            <span className="sr-only">Close</span>
          </Button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Report Name */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Report Name
            </label>
            <Input
              type="text"
              placeholder="Enter report name"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              className="w-full"
            />
          </div>
          
          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Report Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {reportTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setReportType(type.value)}
                  className={`p-4 border rounded-lg text-left transition-all ${
                    reportType === type.value
                      ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-300 text-text-secondary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={type.icon as keyof typeof LucideIcons} size={20} />
                    <span className="font-medium">{type.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Metrics Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Select Metrics ({selectedMetrics.length} selected)
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto border border-border rounded-lg p-3">
              {availableMetrics.map((metric) => (
                <label
                  key={metric.id}
                  className="flex items-center space-x-3 p-2 hover:bg-surface rounded-md cursor-pointer"
                >
                  <Input
                    type="checkbox"
                    checked={selectedMetrics.includes(metric.id)}
                    onChange={() => toggleMetric(metric.id)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary">{metric.name}</div>
                    <div className="text-xs text-text-muted">{metric.category}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          {/* Schedule */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Generation Schedule
            </label>
            <div className="space-y-2">
              {scheduleOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-surface cursor-pointer"
                >
                  <Input
                    type="checkbox"
                    checked={schedule === option.value}
                    onChange={() => setSchedule(option.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-text-primary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleGenerate}
            disabled={!reportName || selectedMetrics.length === 0}
            iconName="Play"
          >
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;