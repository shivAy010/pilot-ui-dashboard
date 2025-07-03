import React, { useState, useEffect } from 'react';
import Icon from '../components/AppIcon';

interface AnalyticsData {
  totalProviders: number;
  activeProviders: number;
  totalPatients: number;
  monthlyLeads: number;
  revenue: number;
  appointmentsToday: number;
  providerGrowth: number;
  patientGrowth: number;
  revenueGrowth: number;
  leadGrowth: number;
}

const PlatformAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setAnalytics({
        totalProviders: 1247,
        activeProviders: 1189,
        totalPatients: 45621,
        monthlyLeads: 2834,
        revenue: 1245789,
        appointmentsToday: 342,
        providerGrowth: 12.5,
        patientGrowth: 18.3,
        revenueGrowth: 22.1,
        leadGrowth: 15.7
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatGrowth = (growth: number) => {
    return `${growth > 0 ? '+' : ''}${growth}%`;
  };

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? 'text-success' : growth < 0 ? 'text-error' : 'text-text-muted';
  };

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? 'TrendingUp' : growth < 0 ? 'TrendingDown' : 'Minus';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <p className="text-text-secondary">Failed to load analytics data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="BarChart3" size={24} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Platform Analytics</h1>
                <p className="text-text-secondary">Monitor key platform metrics and performance indicators</p>
              </div>
            </div>
            <div className="bg-primary-50 border border-primary-200 rounded-lg px-4 py-2">
              <span className="text-primary font-medium">Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Providers */}
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Total Providers</p>
                  <p className="text-2xl font-bold text-text-primary">{formatNumber(analytics.totalProviders)}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <Icon name={getGrowthIcon(analytics.providerGrowth)} size={16} className={getGrowthColor(analytics.providerGrowth)} />
                <span className={`ml-1 text-sm ${getGrowthColor(analytics.providerGrowth)}`}>
                  {formatGrowth(analytics.providerGrowth)} from last month
                </span>
              </div>
            </div>

            {/* Total Patients */}
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Total Patients</p>
                  <p className="text-2xl font-bold text-text-primary">{formatNumber(analytics.totalPatients)}</p>
                </div>
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                  <Icon name="Heart" size={24} className="text-accent" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <Icon name={getGrowthIcon(analytics.patientGrowth)} size={16} className={getGrowthColor(analytics.patientGrowth)} />
                <span className={`ml-1 text-sm ${getGrowthColor(analytics.patientGrowth)}`}>
                  {formatGrowth(analytics.patientGrowth)} from last month
                </span>
              </div>
            </div>

            {/* Monthly Leads */}
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Monthly Leads</p>
                  <p className="text-2xl font-bold text-text-primary">{formatNumber(analytics.monthlyLeads)}</p>
                </div>
                <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center">
                  <Icon name="Target" size={24} className="text-warning" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <Icon name={getGrowthIcon(analytics.leadGrowth)} size={16} className={getGrowthColor(analytics.leadGrowth)} />
                <span className={`ml-1 text-sm ${getGrowthColor(analytics.leadGrowth)}`}>
                  {formatGrowth(analytics.leadGrowth)} from last month
                </span>
              </div>
            </div>

            {/* Revenue */}
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-text-primary">{formatCurrency(analytics.revenue)}</p>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                  <Icon name="DollarSign" size={24} className="text-success" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <Icon name={getGrowthIcon(analytics.revenueGrowth)} size={16} className={getGrowthColor(analytics.revenueGrowth)} />
                <span className={`ml-1 text-sm ${getGrowthColor(analytics.revenueGrowth)}`}>
                  {formatGrowth(analytics.revenueGrowth)} from last month
                </span>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Provider Status */}
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-6">Provider Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-success rounded-full"></div>
                    <span className="text-text-secondary">Active Providers</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-text-primary">{formatNumber(analytics.activeProviders)}</p>
                    <p className="text-sm text-text-muted">
                      {((analytics.activeProviders / analytics.totalProviders) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-warning rounded-full"></div>
                    <span className="text-text-secondary">Inactive Providers</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-text-primary">
                      {formatNumber(analytics.totalProviders - analytics.activeProviders)}
                    </p>
                    <p className="text-sm text-text-muted">
                      {(((analytics.totalProviders - analytics.activeProviders) / analytics.totalProviders) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-6">Today's Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="Calendar" size={20} className="text-primary" />
                    <span className="text-text-secondary">Appointments Today</span>
                  </div>
                  <p className="font-semibold text-text-primary">{formatNumber(analytics.appointmentsToday)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="Clock" size={20} className="text-accent" />
                    <span className="text-text-secondary">Avg. Response Time</span>
                  </div>
                  <p className="font-semibold text-text-primary">2.3 min</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="Star" size={20} className="text-warning" />
                    <span className="text-text-secondary">Avg. Rating</span>
                  </div>
                  <p className="font-semibold text-text-primary">4.8/5.0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="bg-white rounded-lg shadow-sm border border-border p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Performance Trends</h3>
            <div className="h-64 bg-surface rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Icon name="BarChart3" size={48} className="text-text-muted mx-auto mb-4" />
                <p className="text-text-muted">Chart visualization would be implemented here</p>
                <p className="text-sm text-text-muted">Integration with charting library required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformAnalytics;