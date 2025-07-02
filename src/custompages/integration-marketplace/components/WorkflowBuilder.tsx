import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import * as LucideIcons from 'lucide-react';
import { WorkflowBuilderProps, WorkflowStep, Trigger, Action } from '../../../types';

const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({ onSaveWorkflow, onTestWorkflow }) => {
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
  const [selectedTrigger, setSelectedTrigger] = useState<Trigger | null>(null);
  const [workflowName, setWorkflowName] = useState<string>('');

  const triggers: Trigger[] = [
    { id: 'email', name: 'New Email', icon: 'Mail', description: 'Trigger when new email arrives' },
    { id: 'form', name: 'Form Submission', icon: 'FileText', description: 'Trigger on form completion' },
    { id: 'schedule', name: 'Schedule', icon: 'Clock', description: 'Time-based trigger' },
    { id: 'webhook', name: 'Webhook', icon: 'Zap', description: 'External API trigger' },
  ];

  const actions: Action[] = [
    { id: 'send-email', name: 'Send Email', icon: 'Send', description: 'Send notification email' },
    { id: 'create-task', name: 'Create Task', icon: 'Plus', description: 'Create new task' },
    { id: 'update-crm', name: 'Update CRM', icon: 'Database', description: 'Update customer record' },
    { id: 'slack-notify', name: 'Slack Notification', icon: 'MessageSquare', description: 'Send Slack message' },
  ];

  const addStep = (action: Action) => {
    const newStep: WorkflowStep = {
      id: Date.now(),
      name: action.name,
      icon: action.icon,
      description: action.description,
      config: {}
    };
    setWorkflowSteps([...workflowSteps, newStep]);
  };

  const removeStep = (stepId: number) => {
    setWorkflowSteps(workflowSteps.filter(step => step.id !== stepId));
  };

  const moveStep = (stepId: number, direction: 'up' | 'down') => {
    const currentIndex = workflowSteps.findIndex(step => step.id === stepId);
    if (
      (direction === 'up' && currentIndex > 0) ||
      (direction === 'down' && currentIndex < workflowSteps.length - 1)
    ) {
      const newSteps = [...workflowSteps];
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      [newSteps[currentIndex], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[currentIndex]];
      setWorkflowSteps(newSteps);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Workflow Builder</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Play"
            onClick={() => onTestWorkflow({ name: workflowName, trigger: selectedTrigger, steps: workflowSteps })}
            disabled={!selectedTrigger || workflowSteps.length === 0}
          >
            Test
          </Button>
          <Button
            variant="primary"
            size="sm"
            iconName="Save"
            onClick={() => onSaveWorkflow({ name: workflowName, trigger: selectedTrigger, steps: workflowSteps })}
            disabled={!workflowName || !selectedTrigger || workflowSteps.length === 0}
          >
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow Configuration */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Workflow Name
            </label>
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              placeholder="Enter workflow name..."
              className="w-full px-3 py-2 border border-border rounded-md bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Trigger Selection */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-text-primary mb-4">1. Select Trigger</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {triggers.map((trigger) => (
                <button
                  key={trigger.id}
                  onClick={() => setSelectedTrigger(trigger)}
                  className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                    selectedTrigger?.id === trigger.id
                      ? 'border-primary-200 bg-primary-50' :'border-border hover:border-primary-200 hover:bg-surface'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name={trigger.icon as keyof typeof LucideIcons} size={20} className="text-primary" />
                    <span className="font-medium text-text-primary">{trigger.name}</span>
                  </div>
                  <p className="text-sm text-text-secondary">{trigger.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Workflow Steps */}
          <div>
            <h4 className="text-md font-semibold text-text-primary mb-4">2. Build Workflow</h4>
            
            {selectedTrigger && (
              <div className="mb-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name={selectedTrigger.icon as keyof typeof LucideIcons} size={16} className="text-white" />
                  </div>
                  <div>
                    <span className="font-medium text-primary">Trigger: {selectedTrigger.name}</span>
                    <p className="text-sm text-text-secondary">{selectedTrigger.description}</p>
                  </div>
                </div>
              </div>
            )}

            {workflowSteps.length > 0 && (
              <div className="space-y-3 mb-4">
                {workflowSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center space-x-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{index + 1}</span>
                      </div>
                      {index < workflowSteps.length - 1 && (
                        <div className="w-px h-8 bg-border mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 p-4 border border-border rounded-lg bg-card">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon name={step.icon as keyof typeof LucideIcons} size={18} className="text-accent" />
                          <div>
                            <span className="font-medium text-text-primary">{step.name}</span>
                            <p className="text-sm text-text-secondary">{step.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="ChevronUp"
                            onClick={() => moveStep(step.id, 'up')}
                            disabled={index === 0}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="ChevronDown"
                            onClick={() => moveStep(step.id, 'down')}
                            disabled={index === workflowSteps.length - 1}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="Trash2"
                            onClick={() => removeStep(step.id)}
                            className="text-error hover:text-error"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {workflowSteps.length === 0 && selectedTrigger && (
              <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                <Icon name="Plus" size={32} className="text-text-muted mx-auto mb-2" />
                <p className="text-text-muted">Add your first action to start building the workflow</p>
              </div>
            )}
          </div>
        </div>

        {/* Available Actions */}
        <div>
          <h4 className="text-md font-semibold text-text-primary mb-4">Available Actions</h4>
          <div className="space-y-3">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => addStep(action)}
                className="w-full p-3 border border-border rounded-lg text-left hover:border-primary-200 hover:bg-surface transition-all duration-200"
                disabled={!selectedTrigger}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={action.icon as keyof typeof LucideIcons} size={18} className="text-accent" />
                  <div>
                    <span className="font-medium text-text-primary block">{action.name}</span>
                    <span className="text-sm text-text-secondary">{action.description}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-surface rounded-lg">
            <h5 className="text-sm font-medium text-text-primary mb-2">Workflow Tips</h5>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Start with a trigger event</li>
              <li>• Add actions in logical order</li>
              <li>• Test before saving</li>
              <li>• Use conditions for complex flows</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;