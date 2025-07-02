import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

interface OrganizationNode {
  id: string;
  name: string;
  avatar: string;
  status: string;
  role: string;
  department: string;
  teamSize: number;
  children?: OrganizationNode[];
}

interface OrganizationChartProps {
  organizationData: OrganizationNode[];
  onUserSelect: (node: OrganizationNode) => void;
}

const OrganizationChart: React.FC<OrganizationChartProps> = ({ organizationData, onUserSelect }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderNode = (node: OrganizationNode, level = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="relative">
        <div className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
          level === 0 ? 'bg-primary-50 border-primary-200' :
          level === 1 ? 'bg-accent-50 border-accent-200': 'bg-card border-border hover:border-primary-300'
        }`}>
          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? "ChevronDown" : "ChevronRight"}
              onClick={() => toggleNode(node.id)}
              className="text-text-secondary hover:text-text-primary"
            />
          )}
          {!hasChildren && <div className="w-8"></div>}
          
          <div className="relative">
            <Image
              src={node.avatar}
              alt={node.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
              node.status === 'active' ? 'bg-success' : 
              node.status === 'inactive' ? 'bg-secondary-400' :
              node.status === 'pending' ? 'bg-warning' : 'bg-error'
            }`}></div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-medium text-text-primary truncate">
                {node.name}
              </h4>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                node.role === 'CEO' ? 'bg-primary-100 text-primary-700' :
                node.role === 'Director' ? 'bg-accent-100 text-accent-700' :
                node.role === 'Manager'? 'bg-secondary-100 text-secondary-700' : 'bg-surface text-text-secondary'
              }`}>
                {node.role}
              </span>
            </div>
            <p className="text-xs text-text-secondary truncate">{node.department}</p>
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-xs text-text-muted">{node.teamSize} members</span>
            <Button
              variant="ghost"
              size="sm"
              iconName="User"
              onClick={() => onUserSelect(node)}
              className="text-text-secondary hover:text-text-primary"
            />
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="ml-8 mt-2 space-y-2 animate-fade-in">
            {(node.children ?? []).map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-brand">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* <Icon name="Sitemap" size={20} className="text-primary" /> */}
            <h3 className="text-lg font-semibold text-text-primary">Organization Structure</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
            >
              Export
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Maximize2"
            />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-3">
          {organizationData.map(node => renderNode(node))}
        </div>
      </div>
    </div>
  );
};

export default OrganizationChart;