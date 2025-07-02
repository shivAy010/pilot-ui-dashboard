'use client'
import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TaskCard from './components/TaskCard';
import TaskFilters from './components/TaskFilters';
import KanbanBoard from './components/KanbanBoard';
import TaskCalendar from './components/TaskCalendar';
import AIInsights from './components/AIInsights';
import TaskStats from './components/TaskStats';
import { Task } from '../../types';
import * as LucideIcons from 'lucide-react';

interface Filters {
  search: string;
  priority: string;
  status: string;
  department: string;
  project: string;
  assignee: string;
  overdue?: boolean;
  hasAttachments?: boolean;
  aiSuggested?: boolean;
}

const TaskIntelligenceCenter: React.FC = () => {
  const [viewMode, setViewMode] = useState<string>('list');
  const [filters, setFilters] = useState<Filters>({
    search: '',
    priority: 'All',
    status: 'All',
    department: 'All',
    project: 'All',
    assignee: 'All'
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAIInsights, setShowAIInsights] = useState<boolean>(true);

  // Mock task data
  const mockTasks: Task[] = [
    {
      id: 1,
      title: "Redesign User Dashboard Interface",
      description: "Create a modern, intuitive dashboard interface that improves user experience and reduces cognitive load. Focus on data visualization and quick actions.",
      status: "In Progress",
      priority: "High",
      progress: 65,
      deadline: "2024-12-20",
      createdAt: "2024-12-01",
      project: "Website Redesign",
      department: "Design",
      assignees: [
        { name: "Sarah Johnson", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
        { name: "Mike Chen", avatar: "https://randomuser.me/api/portraits/men/2.jpg" }
      ],
      attachments: 3,
      comments: 8,
      aiInsights: [
        "Consider implementing progressive disclosure for complex features",
        "User testing shows 23% improvement in task completion with current design"
      ]
    },
    {
      id: 2,
      title: "Implement API Authentication System",
      description: "Develop secure JWT-based authentication with role-based access control and session management.",
      status: "Pending",
      priority: "High",
      progress: 0,
      deadline: "2024-12-18",
      createdAt: "2024-12-05",
      project: "Mobile App",
      department: "Development",
      assignees: [
        { name: "David Kim", avatar: "https://randomuser.me/api/portraits/men/3.jpg" }
      ],
      attachments: 1,
      comments: 3,
      aiInsights: [
        "Similar authentication tasks typically take 5-7 days",
        "Consider using OAuth 2.0 for third-party integrations"
      ]
    },
    {
      id: 3,
      title: "Content Strategy for Q1 Campaign",
      description: "Develop comprehensive content strategy including blog posts, social media content, and email campaigns for the first quarter.",
      status: "Completed",
      priority: "Medium",
      progress: 100,
      deadline: "2024-12-15",
      createdAt: "2024-11-20",
      project: "Marketing Campaign",
      department: "Marketing",
      assignees: [
        { name: "Emily Rodriguez", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
        { name: "Alex Thompson", avatar: "https://randomuser.me/api/portraits/men/5.jpg" }
      ],
      attachments: 5,
      comments: 12,
      aiInsights: [
        "Content performed 34% better than previous campaigns",
        "Recommend similar approach for Q2 planning"
      ]
    },
    {
      id: 4,
      title: "Database Performance Optimization",
      description: "Analyze and optimize database queries to improve application response times and reduce server load.",
      status: "Blocked",
      priority: "High",
      progress: 30,
      deadline: "2024-12-22",
      createdAt: "2024-12-03",
      project: "System Upgrade",
      department: "Development",
      assignees: [
        { name: "Mike Chen", avatar: "https://randomuser.me/api/portraits/men/2.jpg" }
      ],
      attachments: 2,
      comments: 6,
      aiInsights: [
        "Waiting for database administrator approval",
        "Consider implementing caching layer as interim solution"
      ]
    },
    {
      id: 5,
      title: "User Onboarding Flow Design",
      description: "Create intuitive onboarding experience that guides new users through key features and reduces time to value.",
      status: "In Progress",
      priority: "Medium",
      progress: 45,
      deadline: "2024-12-25",
      createdAt: "2024-12-02",
      project: "Product Launch",
      department: "Design",
      assignees: [
        { name: "Sarah Johnson", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
        { name: "Emily Rodriguez", avatar: "https://randomuser.me/api/portraits/women/4.jpg" }
      ],
      attachments: 4,
      comments: 9,
      aiInsights: [
        "A/B testing shows 18% improvement in user activation",
        "Consider adding interactive tutorials for complex features"
      ]
    },
    {
      id: 6,
      title: "Security Audit and Compliance Review",
      description: "Conduct comprehensive security audit to ensure compliance with industry standards and identify potential vulnerabilities.",
      status: "Pending",
      priority: "High",
      progress: 0,
      deadline: "2024-12-30",
      createdAt: "2024-12-06",
      project: "Security Compliance",
      department: "Operations",
      assignees: [
        { name: "David Kim", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
        { name: "Alex Thompson", avatar: "https://randomuser.me/api/portraits/men/5.jpg" }
      ],
      attachments: 0,
      comments: 2,
      aiInsights: [
        "Schedule during low-traffic hours to minimize impact",
        "Previous audits identified 3 critical areas for focus"
      ]
    }
  ];

  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(mockTasks);

  // Filter tasks based on current filters
  useEffect(() => {
    let filtered = tasks;

    if (filters.search) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.priority !== 'All') {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    if (filters.status !== 'All') {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    if (filters.department !== 'All') {
      filtered = filtered.filter(task => task.department === filters.department);
    }

    if (filters.project !== 'All') {
      filtered = filtered.filter(task => task.project === filters.project);
    }

    if (filters.assignee !== 'All' && filters.assignee !== 'me' && filters.assignee !== 'unassigned') {
      filtered = filtered.filter(task =>
        task.assignees.some(assignee => assignee.name.toLowerCase().includes(filters.assignee))
      );
    }

    if (filters.overdue) {
      filtered = filtered.filter(task =>
        new Date(task.deadline) < new Date() && task.status !== 'Completed'
      );
    }

    if (filters.hasAttachments) {
      filtered = filtered.filter(task => task.attachments > 0);
    }

    setFilteredTasks(filtered);
  }, [tasks, filters]);

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      priority: 'All',
      status: 'All',
      department: 'All',
      project: 'All',
      assignee: 'All',
      overdue: false,
      hasAttachments: false,
      aiSuggested: false
    });
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleTaskMove = (taskId: string | number, newStatus: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1) }
          : task
      )
    );
  };

  const handleStatusChange = (taskId: string | number, newStatus: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleApplyRecommendation = () => {
    console.log('Applying recommendation:');
    // Implementation would depend on the specific recommendation type
  };

  const handleDateSelect = (date: Date) => {
    console.log('Selected date:', date);
  };

  const viewModes = [
    { id: 'list', label: 'List View', icon: 'List' },
    { id: 'kanban', label: 'Kanban Board', icon: 'Columns' },
    { id: 'calendar', label: 'Calendar View', icon: 'Calendar' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Icon name="Brain" size={24} className="text-accent" />
                <div>
                  <h1 className="text-2xl font-bold text-text-primary">Task Intelligence Center</h1>
                  <p className="text-text-secondary">AI-powered task management and workflow optimization</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Plus"
                className="text-text-secondary hover:text-text-primary"
              >
                New Task
              </Button>
              <Button
                variant="primary"
                iconName="Zap"
                onClick={() => setShowAIInsights(!showAIInsights)}
              >
                {showAIInsights ? 'Hide' : 'Show'} AI Insights
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Task Statistics */}
          <TaskStats tasks={tasks} />

          {/* AI Insights */}
          {showAIInsights && (
            <AIInsights
              tasks={tasks}
              onApplyRecommendation={handleApplyRecommendation}
            />
          )}

          {/* Filters */}
          <TaskFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />

          {/* View Mode Selector */}
          <div className="bg-white border border-border rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Icon name="Layout" size={20} className="text-text-muted" />
                <h3 className="text-lg font-semibold text-text-primary">Task Views</h3>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary border border-primary-200">
                  {filteredTasks.length} tasks
                </span>
              </div>
              
              <div className="flex items-center border border-border rounded-lg">
                {viewModes.map(mode => (
                  <Button
                    key={mode.id}
                    variant={viewMode === mode.id ? 'primary' : 'ghost'}
                    size="sm"
                    iconName={mode.icon as keyof typeof LucideIcons}
                    onClick={() => setViewMode(mode.id)}
                    className={`${
                      mode.id === 'list' ? 'rounded-r-none border-r border-border' :
                      mode.id === 'kanban'? 'rounded-none border-r border-border' : 'rounded-l-none'
                    }`}
                  >
                    {mode.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Task Content */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onTaskClick={handleTaskClick}
                      onStatusChange={handleStatusChange}
                      viewMode="card"
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-text-primary mb-2">No tasks found</h3>
                    <p className="text-text-secondary mb-4">
                      Try adjusting your filters or create a new task to get started.
                    </p>
                    <Button variant="primary" iconName="Plus">
                      Create New Task
                    </Button>
                  </div>
                )}
              </div>
            )}

            {viewMode === 'kanban' && (
              <KanbanBoard
                tasks={filteredTasks}
                onTaskMove={handleTaskMove}
                onTaskClick={handleTaskClick}
                onStatusChange={handleStatusChange}
              />
            )}

            {viewMode === 'calendar' && (
              <TaskCalendar
                tasks={filteredTasks}
                onTaskClick={handleTaskClick}
                onDateSelect={handleDateSelect}
              />
            )}
          </div>
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-text-primary">Task Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setSelectedTask(null)}
                  className="text-text-muted hover:text-text-primary"
                />
              </div>
            </div>
            
            <div className="p-6">
              <TaskCard
                task={selectedTask}
                onTaskClick={() => {}}
                onStatusChange={handleStatusChange}
                viewMode="card"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskIntelligenceCenter;