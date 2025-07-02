import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

interface PriorityChannels {
  email: boolean;
  push: boolean;
  slack: boolean;
}

interface Settings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  slackIntegration: boolean;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  priorities: {
    critical: PriorityChannels;
    high: PriorityChannels;
    medium: PriorityChannels;
    low: PriorityChannels;
  };
  categories: {
    task: boolean;
    approval: boolean;
    system: boolean;
    communication: boolean;
    security: boolean;
  };
}

interface NotificationSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState<Settings>({
    emailNotifications: true,
    pushNotifications: true,
    slackIntegration: false,
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    },
    priorities: {
      critical: { email: true, push: true, slack: true },
      high: { email: true, push: true, slack: false },
      medium: { email: false, push: true, slack: false },
      low: { email: false, push: false, slack: false }
    },
    categories: {
      task: true,
      approval: true,
      system: false,
      communication: true,
      security: true
    }
  });

  const handleToggle = (path: string, value: boolean | string) => {
    setSettings((prev: Settings) => {
      const newSettings = { ...prev };
      const keys = path.split('.');
      let current: Record<string, unknown> = newSettings;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] as Record<string, unknown>;
      }
      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Notification Settings</h2>
            <p className="text-sm text-text-muted mt-1">
              Customize how and when you receive notifications
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary"
          />
        </div>

        <div className="p-6 space-y-8">
          {/* General Settings */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">General Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-text-primary">Email Notifications</label>
                  <p className="text-xs text-text-muted">Receive notifications via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleToggle('emailNotifications', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-text-primary">Push Notifications</label>
                  <p className="text-xs text-text-muted">Receive browser push notifications</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) => handleToggle('pushNotifications', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-text-primary">Slack Integration</label>
                  <p className="text-xs text-text-muted">Send notifications to Slack channels</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.slackIntegration}
                  onChange={(e) => handleToggle('slackIntegration', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
              </div>
            </div>
          </div>

          {/* Quiet Hours */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Quiet Hours</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-text-primary">Enable Quiet Hours</label>
                  <p className="text-xs text-text-muted">Suppress non-critical notifications during specified hours</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.quietHours.enabled}
                  onChange={(e) => handleToggle('quietHours.enabled', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
              </div>
              
              {settings.quietHours.enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Start Time</label>
                    <Input
                      type="time"
                      value={settings.quietHours.start}
                      onChange={(e) => handleToggle('quietHours.start', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">End Time</label>
                    <Input
                      type="time"
                      value={settings.quietHours.end}
                      onChange={(e) => handleToggle('quietHours.end', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Priority Settings */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Priority Settings</h3>
            <div className="space-y-4">
              {Object.entries(settings.priorities).map(([priority, channels]) => (
                <div key={priority} className="border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className={`w-3 h-3 rounded-full ${
                      priority === 'critical' ? 'bg-error' :
                      priority === 'high' ? 'bg-warning' :
                      priority === 'medium'? 'bg-primary' : 'bg-secondary'
                    }`}></div>
                    <span className="text-sm font-medium text-text-primary capitalize">{priority}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={channels.email}
                        onChange={(e) => handleToggle(`priorities.${priority}.email`, e.target.checked)}
                        className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                      />
                      <span className="text-sm text-text-secondary">Email</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={channels.push}
                        onChange={(e) => handleToggle(`priorities.${priority}.push`, e.target.checked)}
                        className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                      />
                      <span className="text-sm text-text-secondary">Push</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={channels.slack}
                        onChange={(e) => handleToggle(`priorities.${priority}.slack`, e.target.checked)}
                        className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                      />
                      <span className="text-sm text-text-secondary">Slack</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Settings */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Category Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(settings.categories).map(([category, enabled]) => (
                <div key={category} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name={
                      category === 'task' ? 'CheckSquare' :
                      category === 'approval' ? 'UserCheck' :
                      category === 'system' ? 'Settings' :
                      category === 'communication'? 'MessageCircle' : 'Shield'
                    } size={16} className="text-text-muted" />
                    <span className="text-sm font-medium text-text-primary capitalize">{category}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => handleToggle(`categories.${category}`, e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onClose}>
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;