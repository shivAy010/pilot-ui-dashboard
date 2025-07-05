import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

interface JobRole {
  id: string;
  title: string;
  department: string;
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'interviewing' | 'offer_extended' | 'closed' | 'on_hold';
  location: string;
  experience: string;
  type: 'full_time' | 'part_time' | 'contract' | 'internship';
  createdAt: string;
  deadlineDate: string;
  description: {
    overview: string;
    responsibilities: string[];
    requirements: string[];
    skills: string[];
    benefits: string[];
    salary: string;
    workMode: string;
  };
  applicants: number;
}

const HRManager: React.FC = () => {
  const [jobRoles, setJobRoles] = useState<JobRole[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobRole | null>(null);
  const [filter, setFilter] = useState<'all' | 'open' | 'urgent' | 'closed'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setJobRoles([
        {
          id: '1',
          title: 'Senior Frontend Developer',
          department: 'Engineering',
          priority: 'high',
          status: 'open',
          location: 'Mumbai',
          experience: '3-5 years',
          type: 'full_time',
          createdAt: '2024-07-01T10:00:00Z',
          deadlineDate: '2024-07-15T23:59:59Z',
          applicants: 12,
          description: {
            overview: 'Join our dynamic engineering team to build cutting-edge healthcare solutions. Work on user-facing features that directly impact patient care and doctor efficiency.',
            responsibilities: [
              'Develop and maintain React-based web applications',
              'Collaborate with UX/UI designers to implement pixel-perfect designs',
              'Optimize application performance and user experience',
              'Write clean, maintainable, and well-tested code',
              'Participate in code reviews and technical discussions',
              'Mentor junior developers and contribute to team growth'
            ],
            requirements: [
              "Bachelor's degree in Computer Science or related field",
              '3-5 years of experience in frontend development',
              'Strong proficiency in React, TypeScript, and modern JavaScript',
              'Experience with state management libraries (Redux, Zustand)',
              'Knowledge of RESTful APIs and GraphQL',
              'Familiarity with testing frameworks (Jest, React Testing Library)',
              'Understanding of responsive design and cross-browser compatibility'
            ],
            skills: [
              'React.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3',
              'Tailwind CSS', 'Redux', 'Next.js', 'Git', 'Webpack'
            ],
            benefits: [
              'Competitive salary with performance bonuses',
              'Health insurance for employee and family',
              'Flexible work hours and remote work options',
              'Learning and development budget',
              'Stock options',
              'Annual team retreats'
            ],
            salary: '₹12-18 LPA',
            workMode: 'Hybrid (3 days office, 2 days remote)'
          }
        },
        {
          id: '2',
          title: 'Digital Marketing Specialist',
          department: 'Marketing',
          priority: 'high',
          status: 'interviewing',
          location: 'Delhi',
          experience: '2-4 years',
          type: 'full_time',
          createdAt: '2024-06-28T14:30:00Z',
          deadlineDate: '2024-07-10T23:59:59Z',
          applicants: 8,
          description: {
            overview: 'Drive our digital marketing initiatives to expand our healthcare platform reach. Create and execute campaigns that connect patients with quality healthcare providers.',
            responsibilities: [
              'Plan and execute digital marketing campaigns across Google Ads, Meta, and other platforms',
              'Analyze campaign performance and optimize for better ROI',
              'Create compelling ad copy and marketing content',
              'Manage social media presence and engagement',
              'Collaborate with design team for creative assets',
              'Track and report on key marketing metrics'
            ],
            requirements: [
              "Bachelor's degree in Marketing, Communications, or related field",
              '2-4 years of digital marketing experience',
              'Proficiency in Google Ads, Meta Ads Manager',
              'Experience with analytics tools (Google Analytics, Facebook Analytics)',
              'Strong copywriting and content creation skills',
              'Knowledge of healthcare marketing regulations',
              'Data-driven approach to marketing optimization'
            ],
            skills: [
              'Google Ads', 'Meta Ads', 'Google Analytics', 'SEO', 'SEM',
              'Content Marketing', 'Social Media Marketing', 'Email Marketing'
            ],
            benefits: [
              'Competitive salary with performance incentives',
              'Health and wellness benefits',
              'Professional development opportunities',
              'Flexible working arrangements',
              'Marketing tools and software access',
              'Team building activities'
            ],
            salary: '₹6-10 LPA',
            workMode: 'Office-based with occasional remote work'
          }
        },
        {
          id: '3',
          title: 'Customer Support Representative',
          department: 'Customer Success',
          priority: 'medium',
          status: 'open',
          location: 'Bangalore',
          experience: '1-3 years',
          type: 'full_time',
          createdAt: '2024-06-25T09:15:00Z',
          deadlineDate: '2024-07-20T23:59:59Z',
          applicants: 15,
          description: {
            overview: 'Be the voice of our company and help patients and healthcare providers have the best experience with our platform. Provide exceptional support and build lasting relationships.',
            responsibilities: [
              'Handle customer inquiries via chat, email, and phone',
              'Resolve technical issues and provide platform guidance',
              'Escalate complex issues to appropriate teams',
              'Maintain detailed records of customer interactions',
              'Contribute to knowledge base and FAQ updates',
              'Participate in product feedback sessions'
            ],
            requirements: [
              'Excellent communication skills in English and Hindi',
              '1-3 years of customer support experience',
              'Problem-solving mindset and patience',
              'Basic understanding of web applications',
              'Ability to work in shifts including weekends',
              'Empathy and customer-first attitude'
            ],
            skills: [
              'Customer Service', 'Communication', 'Problem Solving',
              'CRM Software', 'Ticketing Systems', 'Multi-tasking'
            ],
            benefits: [
              'Competitive salary with shift allowances',
              'Health insurance coverage',
              'Paid time off and sick leave',
              'Career growth opportunities',
              'Training and certification programs',
              'Employee assistance programs'
            ],
            salary: '₹3-5 LPA',
            workMode: 'Office-based (24/7 support coverage)'
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

  const handleStatusUpdate = (jobId: string, newStatus: JobRole['status']) => {
    setJobRoles(prev => 
      prev.map(job => 
        job.id === jobId 
          ? { ...job, status: newStatus }
          : job
      )
    );
    setSelectedJob(null);
  };

  const generateFullJobDescription = (job: JobRole) => {
    return `
# ${job.title}
**Department:** ${job.department}
**Location:** ${job.location}
**Experience:** ${job.experience}
**Type:** ${job.type.replace('_', ' ').toUpperCase()}
**Salary:** ${job.description.salary}
**Work Mode:** ${job.description.workMode}

## About the Role
${job.description.overview}

## Key Responsibilities
${job.description.responsibilities.map(r => `• ${r}`).join('\n')}

## Requirements
${job.description.requirements.map(r => `• ${r}`).join('\n')}

## Required Skills
${job.description.skills.join(' • ')}

## Benefits & Perks
${job.description.benefits.map(b => `• ${b}`).join('\n')}

## How to Apply
Send your resume and cover letter to careers@sahej.life with subject line "${job.title} - ${job.location}"

---
*Sahej Healthcare - Connecting Patients with Quality Care*
`.trim();
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
      case 'open': return 'text-success bg-success-50 border-success-200';
      case 'interviewing': return 'text-primary bg-primary-50 border-primary-200';
      case 'offer_extended': return 'text-info bg-info-50 border-info-200';
      case 'closed': return 'text-text-muted bg-surface border-border';
      case 'on_hold': return 'text-warning bg-warning-50 border-warning-200';
      default: return 'text-text-muted bg-surface border-border';
    }
  };

  const filteredJobs = jobRoles.filter(job => {
    switch (filter) {
      case 'open': return job.status === 'open';
      case 'urgent': return job.priority === 'high' && ['open', 'interviewing'].includes(job.status);
      case 'closed': return job.status === 'closed';
      default: return true;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading job roles...</p>
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
              <Icon name="Users" size={24} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-text-primary">HR Management Center</h1>
                <p className="text-text-secondary">Manage job roles and hiring pipeline</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-error-50 border border-error-200 rounded-lg px-4 py-2">
                <span className="text-error font-medium">{jobRoles.filter(j => j.priority === 'high' && ['open', 'interviewing'].includes(j.status)).length} Urgent</span>
              </div>
              <div className="bg-success-50 border border-success-200 rounded-lg px-4 py-2">
                <span className="text-success font-medium">{jobRoles.filter(j => j.status === 'open').length} Open Roles</span>
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
              { key: 'all', label: 'All Roles', count: jobRoles.length },
              { key: 'open', label: 'Open', count: jobRoles.filter(j => j.status === 'open').length },
              { key: 'urgent', label: 'Urgent', count: jobRoles.filter(j => j.priority === 'high' && ['open', 'interviewing'].includes(j.status)).length },
              { key: 'closed', label: 'Closed', count: jobRoles.filter(j => j.status === 'closed').length }
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
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <Icon name="Briefcase" size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-text-primary">{job.title}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(job.priority)}`}>
                            {job.priority.toUpperCase()}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(job.status)}`}>
                            {job.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <p className="text-text-secondary mb-3">{job.department} • {job.experience} • {job.description.salary}</p>
                        <div className="flex items-center space-x-6 text-sm text-text-muted">
                          <div className="flex items-center space-x-1">
                            <Icon name="MapPin" size={14} />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Users" size={14} />
                            <span>{job.applicants} applicants</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Calendar" size={14} />
                            <span>Deadline: {new Date(job.deadlineDate).toLocaleDateString()}</span>
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

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">{selectedJob.title}</h2>
                  <p className="text-sm text-text-muted">{selectedJob.department} • {selectedJob.location}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setSelectedJob(null)}
                  className="text-text-muted hover:text-text-primary"
                />
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Job Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Job Overview</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Experience</label>
                          <p className="text-text-primary">{selectedJob.experience}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Type</label>
                          <p className="text-text-primary">{selectedJob.type.replace('_', ' ').toUpperCase()}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Salary</label>
                          <p className="text-text-primary">{selectedJob.description.salary}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Work Mode</label>
                          <p className="text-text-primary">{selectedJob.description.workMode}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Description</label>
                        <p className="text-text-primary">{selectedJob.description.overview}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-text-secondary">Key Skills</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedJob.description.skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full border border-primary-200">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions & Copy */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Job Posting Actions</h3>
                    
                    <div className="space-y-4">
                      <Button
                        onClick={() => copyToClipboard(generateFullJobDescription(selectedJob), 'full')}
                        iconName="Copy"
                        className="w-full"
                      >
                        {copiedField === 'full' ? 'Full Job Description Copied!' : 'Copy Full Job Description'}
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => copyToClipboard(selectedJob.title, 'title')}
                        iconName="Copy"
                        className="w-full"
                      >
                        {copiedField === 'title' ? 'Title Copied!' : 'Copy Job Title'}
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => copyToClipboard(selectedJob.description.skills.join(', '), 'skills')}
                        iconName="Copy"
                        className="w-full"
                      >
                        {copiedField === 'skills' ? 'Skills Copied!' : 'Copy Required Skills'}
                      </Button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="text-sm font-medium text-text-primary mb-3">Update Status</h4>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          onClick={() => handleStatusUpdate(selectedJob.id, 'interviewing')}
                          className="w-full text-primary border-primary-200 hover:bg-primary-50"
                        >
                          Move to Interviewing
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleStatusUpdate(selectedJob.id, 'offer_extended')}
                          className="w-full text-info border-info-200 hover:bg-info-50"
                        >
                          Offer Extended
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleStatusUpdate(selectedJob.id, 'closed')}
                          className="w-full text-success border-success-200 hover:bg-success-50"
                        >
                          Close Position
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleStatusUpdate(selectedJob.id, 'on_hold')}
                          className="w-full text-warning border-warning-200 hover:bg-warning-50"
                        >
                          Put on Hold
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Preview */}
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Job Posting Preview</h3>
                <div className="bg-surface rounded-lg p-4 text-sm font-mono text-text-secondary max-h-60 overflow-y-auto">
                  <pre className="whitespace-pre-wrap">{generateFullJobDescription(selectedJob)}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRManager;