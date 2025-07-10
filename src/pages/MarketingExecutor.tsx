import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

interface Campaign {
  id: string;
  title: string;
  platform: 'google' | 'meta';
  type: 'create' | 'pause' | 'resume' | 'stop' | 'update';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'feedback_required';
  createdAt: string;
  instructions: {
    campaignName: string;
    budget: string;
    targetAudience: string;
    keywords?: string[];
    adCopy: string;
    landingPage: string;
    location: string;
    demographics: string;
    schedule: string;
    bidStrategy: string;
    extensions?: string[];
  };
  feedback?: string;
}

const MarketingExecutor: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setCampaigns([
        {
          id: '1',
          title: 'Mumbai Cardiology Campaign - Google Ads',
          platform: 'google',
          type: 'create',
          priority: 'high',
          status: 'pending',
          createdAt: '2024-07-05T10:00:00Z',
          instructions: {
            campaignName: 'Mumbai_Cardiology_Q3_2024',
            budget: '₹15,000 per day',
            targetAudience: 'Adults 30-65 in Mumbai with heart conditions',
            keywords: ['cardiologist mumbai', 'heart doctor', 'cardiac specialist', 'chest pain doctor'],
            adCopy: 'Expert Cardiologists in Mumbai | Book Online Consultation | 24/7 Available | Trusted by 10,000+ Patients',
            landingPage: 'https://sahej.life/cardiology-mumbai',
            location: 'Mumbai, Navi Mumbai, Thane',
            demographics: 'Age: 30-65, Income: Middle to High class',
            schedule: 'All days, 6 AM to 11 PM',
            bidStrategy: 'Target CPA: ₹500',
            extensions: ['Call Extension', 'Location Extension', 'Sitelink Extension']
          }
        },
        {
          id: '2',
          title: 'Delhi Pediatrics - Meta Ads',
          platform: 'meta',
          type: 'pause',
          priority: 'medium',
          status: 'feedback_required',
          createdAt: '2024-07-04T14:30:00Z',
          instructions: {
            campaignName: 'Delhi_Pediatrics_Summer_2024',
            budget: '₹8,000 per day',
            targetAudience: 'Parents with children 0-12 years in Delhi NCR',
            adCopy: 'Best Pediatricians in Delhi | Child Specialists | Online & Offline Consultations | Vaccination Services',
            landingPage: 'https://sahej.life/pediatrics-delhi',
            location: 'Delhi NCR',
            demographics: 'Parents aged 25-45',
            schedule: 'All days, 7 AM to 9 PM',
            bidStrategy: 'Cost per Click optimization'
          }
        },
        {
          id: '3',
          title: 'Bangalore General Medicine - Google Ads',
          platform: 'google',
          type: 'resume',
          priority: 'medium',
          status: 'pending',
          createdAt: '2024-07-03T09:15:00Z',
          instructions: {
            campaignName: 'Bangalore_GeneralMedicine_Relaunch',
            budget: '₹12,000 per day',
            targetAudience: 'Adults seeking general medical consultation',
            keywords: ['general doctor bangalore', 'physician near me', 'medical consultation'],
            adCopy: 'Trusted General Physicians in Bangalore | Same Day Appointments | Experienced Doctors',
            landingPage: 'https://sahej.life/general-medicine-bangalore',
            location: 'Bangalore, Whitefield, Electronic City',
            demographics: 'Age: 18-70, All income groups',
            schedule: 'Monday to Saturday, 8 AM to 8 PM',
            bidStrategy: 'Maximize Clicks'
          }
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleStatusUpdate = (campaignId: string, newStatus: Campaign['status'], feedbackText?: string) => {
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, status: newStatus, feedback: feedbackText }
          : campaign
      )
    );
    setSelectedCampaign(null);
    setFeedback('');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-error bg-error-50 border-error-200';
      case 'medium': return 'text-warning bg-warning-50 border-warning-200';
      case 'low': return 'text-success bg-success-50 border-success-200';
      default: return 'text-text-muted bg-surface border-border';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-warning bg-warning-50 border-warning-200';
      case 'in_progress': return 'text-primary bg-primary-50 border-primary-200';
      case 'completed': return 'text-success bg-success-50 border-success-200';
      case 'feedback_required': return 'text-error bg-error-50 border-error-200';
      default: return 'text-text-muted bg-surface border-border';
    }
  };

  const getPlatformIcon = (platform: string) => {
    return platform === 'google' ? 'Search' : 'Users';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading campaign instructions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <Icon name="Target" size={20} className="text-primary sm:w-6 sm:h-6" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary">Marketing Campaign Center</h1>
                <p className="text-sm sm:text-base text-text-secondary">Copy-paste ready campaign instructions</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="bg-error-50 border border-error-200 rounded-lg px-3 sm:px-4 py-2 w-full sm:w-auto">
                <span className="text-error font-medium text-sm">{campaigns.filter(c => c.status === 'feedback_required').length} Need Feedback</span>
              </div>
              <div className="bg-warning-50 border border-warning-200 rounded-lg px-3 sm:px-4 py-2 w-full sm:w-auto">
                <span className="text-warning font-medium text-sm">{campaigns.filter(c => c.status === 'pending').length} Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="bg-white rounded-lg shadow-sm border border-border">
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="border border-border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer active:bg-gray-50"
                  onClick={() => setSelectedCampaign(campaign)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name={getPlatformIcon(campaign.platform)} size={16} className="text-primary sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col space-y-2 mb-2">
                          <h3 className="font-semibold text-text-primary text-sm sm:text-base break-words">{campaign.title}</h3>
                          <div className="flex flex-wrap gap-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(campaign.priority)}`}>
                              {campaign.priority.toUpperCase()}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(campaign.status)}`}>
                              {campaign.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <p className="text-text-secondary mb-3 text-sm">
                          {campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)} campaign on {campaign.platform.charAt(0).toUpperCase() + campaign.platform.slice(1)}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-text-muted">
                          <div className="flex items-center space-x-1">
                            <Icon name="Calendar" size={12} className="sm:w-3.5 sm:h-3.5" />
                            <span>{new Date(campaign.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Target" size={12} className="sm:w-3.5 sm:h-3.5" />
                            <span className="truncate">{campaign.instructions.budget}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-text-muted flex-shrink-0 sm:w-5 sm:h-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 min-w-0 flex-1 pr-4">
                  <Icon name={getPlatformIcon(selectedCampaign.platform)} size={20} className="text-primary flex-shrink-0 sm:w-6 sm:h-6" />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-text-primary break-words">{selectedCampaign.title}</h2>
                    <p className="text-xs sm:text-sm text-text-muted">
                      {selectedCampaign.type.charAt(0).toUpperCase() + selectedCampaign.type.slice(1)} • {selectedCampaign.platform.charAt(0).toUpperCase() + selectedCampaign.platform.slice(1)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setSelectedCampaign(null)}
                  className="text-text-muted hover:text-text-primary flex-shrink-0"
                />
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
                {/* Campaign Instructions */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-text-primary">Copy-Paste Instructions</h3>
                  
                  {Object.entries(selectedCampaign.instructions).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-text-secondary capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(Array.isArray(value) ? value.join(', ') : value, key)}
                          className="text-primary hover:text-primary"
                        >
                          {copiedField === key ? (
                            <>
                              <Icon name="Check" size={14} className="mr-1" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Icon name="Copy" size={14} className="mr-1" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <div className="bg-surface rounded-lg p-3 text-text-primary text-sm border border-border">
                        {Array.isArray(value) ? value.join(', ') : value}
                      </div>
                    </div>
                  ))}

                  {/* Quick Copy All */}
                  <div className="pt-4 border-t border-border">
                    <Button
                      onClick={() => {
                        const allInstructions = Object.entries(selectedCampaign.instructions)
                          .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').trim()}: ${Array.isArray(value) ? value.join(', ') : value}`)
                          .join('\n\n');
                        copyToClipboard(allInstructions, 'all');
                      }}
                      iconName="Copy"
                      className="w-full"
                    >
                      {copiedField === 'all' ? 'All Instructions Copied!' : 'Copy All Instructions'}
                    </Button>
                  </div>
                </div>

                {/* Actions & Feedback */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-text-primary">Campaign Actions</h3>
                  
                  {selectedCampaign.status === 'feedback_required' && (
                    <div className="bg-error-50 border border-error-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="AlertCircle" size={16} className="text-error" />
                        <span className="text-sm font-medium text-error">Feedback Required</span>
                      </div>
                      <p className="text-sm text-text-secondary">Please provide feedback on the campaign execution.</p>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Execution Feedback
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Describe campaign setup status, any issues encountered, performance observations..."
                      className="w-full h-32 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => handleStatusUpdate(selectedCampaign.id, 'in_progress', feedback)}
                      iconName="Play"
                      className="w-full"
                    >
                      Mark as In Progress
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleStatusUpdate(selectedCampaign.id, 'completed', feedback)}
                      iconName="CheckCircle"
                      className="w-full text-success border-success-200 hover:bg-success-50"
                    >
                      Mark as Completed
                    </Button>
                    
                    {selectedCampaign.status !== 'feedback_required' && (
                      <Button
                        variant="outline"
                        onClick={() => handleStatusUpdate(selectedCampaign.id, 'feedback_required', feedback)}
                        iconName="MessageSquare"
                        className="w-full text-warning border-warning-200 hover:bg-warning-50"
                      >
                        Request Feedback
                      </Button>
                    )}
                  </div>

                  {/* Platform-specific guides */}
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-text-primary mb-3">Quick Setup Guide</h4>
                    <div className="space-y-2 text-sm text-text-secondary">
                      {selectedCampaign.platform === 'google' ? (
                        <>
                          <p>1. Go to Google Ads → Campaigns → New Campaign</p>
                          <p>2. Copy campaign name and paste in Campaign Name field</p>
                          <p>3. Set budget and bid strategy as specified</p>
                          <p>4. Add keywords in Keywords section</p>
                          <p>5. Copy ad copy to Ad section</p>
                          <p>6. Set location and demographic targeting</p>
                        </>
                      ) : (
                        <>
                          <p>1. Go to Meta Ads Manager → Create Campaign</p>
                          <p>2. Choose campaign objective</p>
                          <p>3. Copy campaign name and set budget</p>
                          <p>4. Set audience targeting as specified</p>
                          <p>5. Copy ad copy and upload creative assets</p>
                          <p>6. Set placement and schedule</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingExecutor;