import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Task } from '../../../types';
import TaskCard from './TaskCard';

// interface Column {
//   id: string;
//   title: string;
//   color: string;
//   count: number;
// }

interface TasksByStatus {
  [key: string]: Task[];
}

interface KanbanBoardProps {
  tasks: Task[];
  onTaskMove: (taskId: Task['id'], newStatus: string) => void;
  onTaskClick: (task: Task) => void;
  onStatusChange: (taskId: Task['id'], newStatus: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskMove, onTaskClick, onStatusChange }) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const columns = [
    { id: 'pending', title: 'Pending', color: 'border-warning-200 bg-warning-50', count: 0 },
    { id: 'in progress', title: 'In Progress', color: 'border-primary-200 bg-primary-50', count: 0 },
    { id: 'review', title: 'Review', color: 'border-accent-200 bg-accent-50', count: 0 },
    { id: 'completed', title: 'Completed', color: 'border-success-200 bg-success-50', count: 0 }
  ];

  // Group tasks by status
  const tasksByStatus: TasksByStatus = tasks.reduce((acc: TasksByStatus, task: Task) => {
    const status = task.status;
    if (!acc[status]) acc[status] = [];
    acc[status].push(task);
    return acc;
  }, {});

  // Update column counts
  columns.forEach(column => {
    column.count = tasksByStatus[column.id]?.length || 0;
  });

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status.toLowerCase() !== newStatus) {
      onTaskMove(draggedTask.id, newStatus);
    }
    setDraggedTask(null);
  };

  const getColumnIcon = (columnId: string) => {
    switch (columnId) {
      case 'pending':
        return 'Clock';
      case 'in progress':
        return 'Play';
      case 'review':
        return 'Eye';
      case 'completed':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-white border border-border rounded-lg shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Columns" size={20} className="text-text-muted" />
            <h3 className="text-lg font-semibold text-text-primary">Kanban Board</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Settings"
              className="text-text-muted hover:text-text-primary"
            >
              Configure
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreHorizontal"
              className="text-text-muted hover:text-text-primary"
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <div
              key={column.id}
              className={`border-2 border-dashed rounded-lg p-4 min-h-[600px] transition-all duration-200 ${column.color}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name={getColumnIcon(column.id)} size={16} className="text-text-muted" />
                  <h4 className="font-medium text-text-primary">{column.title}</h4>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white text-text-muted border border-border">
                  {column.count}
                </span>
              </div>

              <div className="space-y-3">
                {tasksByStatus[column.id]?.map((task: Task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    className="cursor-move hover:scale-105 transition-transform duration-200"
                  >
                    <TaskCard
                      task={task}
                      viewMode="kanban"
                      onTaskClick={onTaskClick}
                      onStatusChange={onStatusChange}
                    />
                  </div>
                ))}

                {(!tasksByStatus[column.id] || tasksByStatus[column.id].length === 0) && (
                  <div className="text-center py-8">
                    <Icon name="Plus" size={24} className="text-text-muted mx-auto mb-2" />
                    <p className="text-sm text-text-muted">No tasks in {column.title.toLowerCase()}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-text-muted hover:text-text-primary"
                    >
                      Add Task
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drag Indicator */}
      {draggedTask && (
        <div className="fixed top-4 right-4 bg-primary text-white px-3 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          <div className="flex items-center space-x-2">
            <Icon name="Move" size={16} />
            <span className="text-sm">Moving: {draggedTask.title}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;