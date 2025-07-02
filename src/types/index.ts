// Shared types and interfaces for the entire project

// Role
export interface Role {
  id: string;
  name: string;
  title?: string;
  userCount?: number;
  permissions: string[];
  description?: string;
  icon?: string;
  color?: string;
  pendingTasks?: number;
  activeProjects?: number;
  route?: string;
}

// User
export interface User {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  avatar: string;
  role: string;
  status: string;
  department: string;
  joinDate?: string;
  lastActive?: string;
  tasksCompleted?: number;
  projectsActive?: number;
  performanceScore?: number;
}

// Notification
export interface Notification {
  id: string | number;
  title: string;
  message: string;
  type?: string;
  read?: boolean;
  createdAt?: string;
  sender?: string;
  timestamp?: string | number | Date | undefined;
  priority?: string;
  category?: string;
  isRead?: boolean;
  actionRequired?: boolean;
  actionText?: string;
  archived?: boolean;
}

// Task
export interface Task {
  id: string | number;
  title: string;
  description: string;
  status: string;
  priority: string;
  progress: number;
  deadline: string | Date;
  createdAt?: string | Date;
  project?: string;
  department?: string;
  assignees: Assignee[];
  attachments: number;
  comments: number;
  aiInsights?: string[];
}

export interface Assignee {
  name: string;
  avatar: string;
}

// Permission
export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

// OrganizationNode
export interface OrganizationNode {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  status: string;
  teamSize: number;
  children?: OrganizationNode[];
}

// OperationData (for bulk ops)
export interface OperationData {
  role: string;
  department: string;
  status: string;
  permissions: string[];
  message: string;
}

// For QuickActionCard
export interface QuickAction {
  title: string;
  description: string;
  icon: string;
  color: string;
  stats: QuickActionStats;
  actions?: QuickActionAction[];
}
export interface QuickActionAction {
  label: string;
  icon: string;
  onClick: () => void;
}
export interface QuickActionStats {
  value: string | number;
  label: string;
}


export interface APIParameter {
  name: string;
  type: string;
  required: boolean;
}

export interface APIEndpoint {
  id: string | number;
  method: string;
  path: string;
  status: string;
  description: string;
  rateLimit: string;
  lastUsed: string;
  parameters?: APIParameter[];
  requestsToday?: number;
  successRate?: number;
}

export interface APIManagementProps {
  apiEndpoints: APIEndpoint[];
  onTestEndpoint: (endpoint: APIEndpoint, request: string) => void;
  onViewDocs: () => void;
}


export interface WorkflowStep {
  id: number;
  name: string;
  icon: string;
  description: string;
  config: Record<string, unknown>;
}

export interface Trigger {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Action {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface WorkflowBuilderProps {
  onSaveWorkflow: (workflow: { name: string; trigger: Trigger | null; steps: WorkflowStep[] }) => void;
  onTestWorkflow: (workflow: { name: string; trigger: Trigger | null; steps: WorkflowStep[] }) => void;
}