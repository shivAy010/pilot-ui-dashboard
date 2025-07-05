import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

interface SocialMediaTask {
  id: string;
  title: string;
  platform: 'youtube' | 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok';
  type: 'post' | 'story' | 'reel' | 'video' | 'carousel' | 'poll';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'scheduled';
  scheduledTime: string;
  createdAt: string;
  content: {
    caption: string;
    hashtags: string[];
    mediaUrls: string[];
    mediaType: 'image' | 'video' | 'carousel';
    description?: string;
    cta?: string;
    targetAudience: string;
    postingInstructions: string[];
  };
}

const SocialMediaExecutive: React.FC = () => {
  const [tasks, setTasks] = useState<SocialMediaTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<SocialMediaTask | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'today' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setTasks([
        {
          id: '1',
          title: 'Cardiology Awareness - Instagram Post',
          platform: 'instagram',
          type: 'post',
          priority: 'high',
          status: 'pending',
          scheduledTime: '2024-07-05T18:00:00Z',
          createdAt: '2024-07-05T10:00:00Z',
          content: {
            caption: '❤️ Take care of your heart today for a healthier tomorrow! Our expert cardiologists are here to help you maintain optimal heart health. Book your consultation now and prioritize your cardiovascular wellness. #HeartHealth #Cardiology #HealthyLiving #SahejCare',
            hashtags: ['#HeartHealth', '#Cardiology', '#HealthyLiving', '#SahejCare', '#HeartCare', '#Wellness', '#Healthcare', '#Prevention'],
            mediaUrls: ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1080&h=1080&fit=crop'],
            mediaType: 'image',
            cta: 'Book your cardiology consultation - Link in bio',
            targetAudience: 'Adults 30-65 interested in heart health',
            postingInstructions: [
              'Post during peak engagement hours (6-8 PM)',
              'Use Instagram feed post format',
              'Add location tag: Mumbai, India',
              'Enable comments and encourage engagement',
              'Cross-post to Facebook page',
              'Track engagement metrics after 24 hours'
            ]
          }
        },
        {
          id: '2',
          title: 'Doctor Success Story - LinkedIn Article',
          platform: 'linkedin',
          type: 'post',
          priority: 'medium',
          status: 'pending',
          scheduledTime: '2024-07-05T14:00:00Z',
          createdAt: '2024-07-04T16:30:00Z',
          content: {
            caption: 'Transforming Healthcare Delivery: Dr. Priya Sharma shares how digital platforms are revolutionizing patient care in tier-2 cities. Her journey from traditional practice to digital-first approach has helped her reach 3x more patients while maintaining quality care. Read her inspiring story below. What challenges do you face in healthcare delivery? Share your thoughts in the comments.',
            hashtags: ['#HealthcareInnovation', '#DigitalHealth', '#DoctorStories', '#SahejSuccess', '#HealthTech', '#PatientCare'],
            mediaUrls: ['https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&h=630&fit=crop'],
            mediaType: 'image',
            description: 'Professional article format with doctor interview quotes and statistics',
            targetAudience: 'Healthcare professionals, medical students, industry leaders',
            postingInstructions: [
              'Use LinkedIn article format for long-form content',
              'Include professional headshot of Dr. Sharma',
              'Tag relevant healthcare industry leaders',
              'Post during business hours (2-4 PM IST)',
              'Engage with comments within first 2 hours',
              'Share in relevant LinkedIn healthcare groups'
            ]
          }
        },
        {
          id: '3',
          title: 'Health Tips - YouTube Short',
          platform: 'youtube',
          type: 'video',
          priority: 'high',
          status: 'in_progress',
          scheduledTime: '2024-07-06T12:00:00Z',
          createdAt: '2024-07-03T11:15:00Z',
          content: {
            caption: '5 Simple Tips for Better Heart Health | Dr. Kumar Explains | #HealthTips #HeartHealth #YouTubeShorts',
            hashtags: ['#HealthTips', '#HeartHealth', '#YouTubeShorts', '#DoctorAdvice', '#Wellness', '#SahejCare'],
            mediaUrls: ['https://sample-video-url.com/heart-health-tips.mp4'],
            mediaType: 'video',
            description: 'Quick 60-second video featuring Dr. Kumar sharing actionable heart health tips with engaging visuals and text overlays',
            cta: 'Subscribe for more health tips! Book consultation: sahej.life',
            targetAudience: 'Health-conscious individuals, age 25-55',
            postingInstructions: [
              'Upload as YouTube Short (vertical format)',
              'Add custom thumbnail with Dr. Kumar',
              'Use trending health hashtags',
              'Enable auto-captions for accessibility',
              'Add end screen promoting subscription',
              'Share link across other social platforms'
            ]
          }
        },
        {
          id: '4',
          title: 'Patient Testimonial - Facebook Story',
          platform: 'facebook',
          type: 'story',
          priority: 'medium',
          status: 'scheduled',
          scheduledTime: '2024-07-05T20:00:00Z',
          createdAt: '2024-07-04T09:45:00Z',
          content: {
            caption: 'Real stories, real impact! 🌟 Hear from our patients about their journey to better health with Sahej Care.',
            hashtags: ['#PatientStories', '#SahejCare', '#Healthcare', '#Testimonial'],
            mediaUrls: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1080&h=1920&fit=crop'],
            mediaType: 'video',
            targetAudience: 'Potential patients and their families',
            postingInstructions: [
              'Post as Facebook Story (24-hour duration)',
              'Use story format with text overlay',
              'Add swipe-up link to testimonials page',
              'Include patient consent confirmation',
              'Cross-post to Instagram Stories',
              'Save as Highlight after 24 hours'
            ]
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

  const downloadMedia = (url: string, filename: string) => {
    // In a real implementation, this would download the file
    console.log(`Downloading ${filename} from ${url}`);
    // For demo, we'll just copy the URL
    copyToClipboard(url, 'media');
  };

  const handleStatusUpdate = (taskId: string, newStatus: SocialMediaTask['status']) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus }
          : task
      )
    );
    setSelectedTask(null);
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
      case 'scheduled': return 'text-info bg-info-50 border-info-200';
      default: return 'text-text-muted bg-surface border-border';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube': return 'Play';
      case 'instagram': return 'Camera';
      case 'facebook': return 'Users';
      case 'twitter': return 'MessageCircle';
      case 'linkedin': return 'Briefcase';
      case 'tiktok': return 'Music';
      default: return 'Share';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'youtube': return 'text-red-600';
      case 'instagram': return 'text-pink-600';
      case 'facebook': return 'text-blue-600';
      case 'twitter': return 'text-sky-600';
      case 'linkedin': return 'text-blue-700';
      case 'tiktok': return 'text-black';
      default: return 'text-text-muted';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const today = new Date().toDateString();
    const taskDate = new Date(task.scheduledTime).toDateString();
    
    switch (filter) {
      case 'pending': return task.status === 'pending';
      case 'today': return taskDate === today;
      case 'completed': return task.status === 'completed';
      default: return true;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading social media tasks...</p>
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
              <Icon name="Share" size={24} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Social Media Command Center</h1>
                <p className="text-text-secondary">Manage content across all platforms</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-error-50 border border-error-200 rounded-lg px-4 py-2">
                <span className="text-error font-medium">{tasks.filter(t => t.priority === 'high' && t.status === 'pending').length} High Priority</span>
              </div>
              <div className="bg-warning-50 border border-warning-200 rounded-lg px-4 py-2">
                <span className="text-warning font-medium">{tasks.filter(t => t.status === 'pending').length} Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { key: 'all', label: 'All Tasks', count: tasks.length },
              { key: 'pending', label: 'Pending', count: tasks.filter(t => t.status === 'pending').length },
              { key: 'today', label: 'Today', count: tasks.filter(t => new Date(t.scheduledTime).toDateString() === new Date().toDateString()).length },
              { key: 'completed', label: 'Completed', count: tasks.filter(t => t.status === 'completed').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  filter === tab.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-muted hover:text-text-secondary hover:border-border'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-border">
          <div className="p-6">
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <Icon name={getPlatformIcon(task.platform)} size={20} className={getPlatformColor(task.platform)} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-text-primary">{task.title}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                            {task.priority.toUpperCase()}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                            {task.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <p className="text-text-secondary mb-3 capitalize">
                          {task.platform} • {task.type} • {task.content.mediaType}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-text-muted">
                          <div className="flex items-center space-x-1">
                            <Icon name="Clock" size={14} />
                            <span>Scheduled: {new Date(task.scheduledTime).toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Users" size={14} />
                            <span>{task.content.targetAudience}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-text-muted" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name={getPlatformIcon(selectedTask.platform)} size={24} className={getPlatformColor(selectedTask.platform)} />
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary">{selectedTask.title}</h2>
                    <p className="text-sm text-text-muted capitalize">
                      {selectedTask.platform} • {selectedTask.type} • Scheduled: {new Date(selectedTask.scheduledTime).toLocaleString()}
                    </p>
                  </div>
                </div>
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Content Details */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-text-primary">Content & Media</h3>
                  
                  {/* Caption */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-text-secondary">Caption</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(selectedTask.content.caption, 'caption')}
                        className="text-primary hover:text-primary"
                      >
                        {copiedField === 'caption' ? (
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
                      {selectedTask.content.caption}
                    </div>
                  </div>

                  {/* Hashtags */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-text-secondary">Hashtags</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(selectedTask.content.hashtags.join(' '), 'hashtags')}
                        className="text-primary hover:text-primary"
                      >
                        {copiedField === 'hashtags' ? (
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
                    <div className="flex flex-wrap gap-2">
                      {selectedTask.content.hashtags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full border border-primary-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Media */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Media Files</label>
                    <div className="space-y-2">
                      {selectedTask.content.mediaUrls.map((url, index) => (
                        <div key={index} className="flex items-center justify-between bg-surface rounded-lg p-3 border border-border">
                          <div className="flex items-center space-x-2">
                            <Icon name={selectedTask.content.mediaType === 'video' ? 'Play' : 'Image'} size={16} className="text-text-muted" />
                            <span className="text-sm text-text-secondary">
                              {selectedTask.content.mediaType} file {index + 1}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => downloadMedia(url, `media-${index + 1}`)}
                            className="text-primary hover:text-primary"
                          >
                            <Icon name="Download" size={14} className="mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  {selectedTask.content.cta && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-text-secondary">Call-to-Action</label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(selectedTask.content.cta || '', 'cta')}
                          className="text-primary hover:text-primary"
                        >
                          {copiedField === 'cta' ? (
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
                        {selectedTask.content.cta}
                      </div>
                    </div>
                  )}
                </div>

                {/* Instructions & Actions */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-text-primary">Posting Instructions</h3>
                  
                  <div className="space-y-3">
                    {selectedTask.content.postingInstructions.map((instruction, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-primary">{index + 1}</span>
                        </div>
                        <p className="text-sm text-text-secondary">{instruction}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Button
                      onClick={() => {
                        const allInstructions = selectedTask.content.postingInstructions
                          .map((instruction, index) => `${index + 1}. ${instruction}`)
                          .join('\n');
                        copyToClipboard(allInstructions, 'instructions');
                      }}
                      iconName="Copy"
                      className="w-full"
                    >
                      {copiedField === 'instructions' ? 'Instructions Copied!' : 'Copy All Instructions'}
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-text-primary mb-3">Update Status</h4>
                    <div className="space-y-2">
                      <Button
                        onClick={() => handleStatusUpdate(selectedTask.id, 'in_progress')}
                        iconName="Play"
                        className="w-full"
                      >
                        Mark as In Progress
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleStatusUpdate(selectedTask.id, 'completed')}
                        iconName="CheckCircle"
                        className="w-full text-success border-success-200 hover:bg-success-50"
                      >
                        Mark as Completed
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleStatusUpdate(selectedTask.id, 'scheduled')}
                        iconName="Calendar"
                        className="w-full text-info border-info-200 hover:bg-info-50"
                      >
                        Mark as Scheduled
                      </Button>
                    </div>
                  </div>

                  {/* Platform-specific tips */}
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-text-primary mb-3">Platform Tips</h4>
                    <div className="text-sm text-text-secondary space-y-1">
                      {selectedTask.platform === 'instagram' && (
                        <>
                          <p>• Best posting times: 6-9 AM, 12-2 PM, 5-7 PM</p>
                          <p>• Use 5-10 relevant hashtags for optimal reach</p>
                          <p>• Stories disappear after 24 hours - save as Highlight</p>
                        </>
                      )}
                      {selectedTask.platform === 'youtube' && (
                        <>
                          <p>• Upload in highest quality available</p>
                          <p>• Custom thumbnails increase click-through rates</p>
                          <p>• Add end screens and cards for engagement</p>
                        </>
                      )}
                      {selectedTask.platform === 'linkedin' && (
                        <>
                          <p>• Professional tone and industry-relevant content</p>
                          <p>• Best posting times: Tuesday-Thursday, 8-10 AM</p>
                          <p>• Tag relevant professionals and companies</p>
                        </>
                      )}
                      {selectedTask.platform === 'facebook' && (
                        <>
                          <p>• Use Facebook Creator Studio for scheduling</p>
                          <p>• Cross-post to Instagram for efficiency</p>
                          <p>• Engage with comments within first 2 hours</p>
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

export default SocialMediaExecutive;