import React from 'react';
import Icon from '../../../components/AppIcon';
import * as LucideIcons from 'lucide-react';

interface Team {
  name: string;
  department: string;
  members: number;
  activeTasks: number;
  performance: number;
  icon: string;
}

interface TeamPerformanceProps {
  teams: Team[];
}

const TeamPerformance: React.FC<TeamPerformanceProps> = ({ teams = [] }) => {
  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-success bg-success-50';
    if (score >= 75) return 'text-primary bg-primary-50';
    if (score >= 60) return 'text-warning bg-warning-50';
    return 'text-error bg-error-50';
  };

  const getPerformanceIcon = (score: number) => {
    if (score >= 90) return 'TrendingUp';
    if (score >= 75) return 'ArrowUp';
    if (score >= 60) return 'Minus';
    return 'TrendingDown';
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Team Performance</h3>
          <Icon name="Users" size={20} className="text-text-muted" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {teams.map((team, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-brand transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <Icon name={team.icon as keyof typeof LucideIcons} size={20} className="text-white" />
                  </div>
                  <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${getPerformanceColor(team.performance)}`}>
                    <Icon name={getPerformanceIcon(team.performance)} size={10} />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">{team.name}</h4>
                  <p className="text-xs text-text-muted">{team.department}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-text-secondary">{team.members} members</span>
                    <span className="text-xs text-text-muted">•</span>
                    <span className="text-xs text-text-secondary">{team.activeTasks} active tasks</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg font-semibold text-text-primary">{team.performance}%</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getPerformanceColor(team.performance)}`}>
                    <Icon name={getPerformanceIcon(team.performance)} size={12} />
                  </div>
                </div>
                <div className="w-20 bg-surface rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${team.performance}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-success-50 rounded-lg">
            <div className="text-lg font-semibold text-success">12</div>
            <div className="text-xs text-text-muted">High Performers</div>
          </div>
          <div className="text-center p-3 bg-warning-50 rounded-lg">
            <div className="text-lg font-semibold text-warning">5</div>
            <div className="text-xs text-text-muted">Need Support</div>
          </div>
          <div className="text-center p-3 bg-primary-50 rounded-lg">
            <div className="text-lg font-semibold text-primary">89%</div>
            <div className="text-xs text-text-muted">Avg Performance</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPerformance;