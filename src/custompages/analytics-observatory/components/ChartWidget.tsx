import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface Chart {
  id: number;
  title: string;
  description: string;
  type: 'bar' | 'line' | 'pie' | string;
  data: ChartData[];
  insights?: string;
}

interface ChartWidgetProps {
  chart: Chart;
}

const ChartWidget: React.FC<ChartWidgetProps> = ({ chart }) => {
  const [timeRange, setTimeRange] = useState<string>('7d');

  const timeRanges = [
    { value: '24h', label: '24H' },
    { value: '7d', label: '7D' },
    { value: '30d', label: '30D' },
    { value: '90d', label: '90D' }
  ];

  const renderChart = () => {
    switch (chart.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar dataKey="value" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#0EA5E9" 
                strokeWidth={2}
                dot={{ fill: '#0EA5E9', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#0EA5E9' }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chart.data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {chart.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div className="h-[300px] flex items-center justify-center text-text-muted">Chart type not supported</div>;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">{chart.title}</h3>
          <p className="text-sm text-text-muted">{chart.description}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-surface rounded-lg p-1">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  timeRange === range.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          
          <Button variant="ghost" size="sm" iconName="Download">
            <span className="sr-only">Download chart</span>
          </Button>
          
          <Button variant="ghost" size="sm" iconName="MoreVertical">
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </div>
      
      <div className="relative">
        {renderChart()}
      </div>
      
      {chart.insights && (
        <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-primary mb-1">AI Insight</h4>
              <p className="text-sm text-text-secondary">{chart.insights}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartWidget;