import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  stage: 'form_filled' | 'documents_submitted' | 'call_scheduled' | 'call_completed' | 'verified' | 'denied' | 'onboarded';
  registrationDate: string;
  lastCallDate?: string;
  callStatus?: 'pending' | 'completed' | 'no_response' | 'rescheduled';
  notes: string;
  denialReason?: string;
  experience: number;
  location: string;
}

const BusinessDeveloper: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending_call' | 'follow_up' | 'denied'>('all');
  const [callNote, setCallNote] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setDoctors([
        {
          id: '1',
          name: 'Dr. Rajesh Kumar',
          email: 'rajesh.kumar@gmail.com',
          phone: '+91-9876543210',
          specialization: 'Cardiology',
          stage: 'call_scheduled',
          registrationDate: '2024-07-01T10:00:00Z',
          lastCallDate: '2024-07-02T14:30:00Z',
          callStatus: 'pending',
          notes: 'Initial contact made. Interested in joining platform.',
          experience: 8,
          location: 'Mumbai'
        },
        {
          id: '2',
          name: 'Dr. Priya Sharma',
          email: 'priya.sharma@hospital.com',
          phone: '+91-9876543211',
          specialization: 'Pediatrics',
          stage: 'documents_submitted',
          registrationDate: '2024-06-28T09:15:00Z',
          callStatus: 'completed',
          notes: 'Documents verified. Ready for onboarding call.',
          experience: 12,
          location: 'Delhi'
        },
        {
          id: '3',
          name: 'Dr. Amit Patel',
          email: 'amit.patel@clinic.in',
          phone: '+91-9876543212',
          specialization: 'Orthopedics',
          stage: 'denied',
          registrationDate: '2024-06-25T16:20:00Z',
          lastCallDate: '2024-06-30T11:00:00Z',
          callStatus: 'completed',
          notes: 'Not interested in digital platform.',
          denialReason: 'Prefers traditional practice methods',
          experience: 15,
          location: 'Ahmedabad'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'form_filled': return 'text-warning bg-warning-50 border-warning-200';
      case 'documents_submitted': return 'text-primary bg-primary-50 border-primary-200';
      case 'call_scheduled': return 'text-info bg-info-50 border-info-200';
      case 'call_completed': return 'text-success bg-success-50 border-success-200';
      case 'verified': return 'text-success bg-success-50 border-success-200';
      case 'denied': return 'text-error bg-error-50 border-error-200';
      case 'onboarded': return 'text-success bg-success-50 border-success-200';
      default: return 'text-text-muted bg-surface border-border';
    }
  };

  const getStageLabel = (stage: string) => {
    return stage.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleStatusUpdate = (doctorId: string, newStage: Doctor['stage'], notes?: string) => {
    setDoctors(prev => 
      prev.map(doctor => 
        doctor.id === doctorId 
          ? { ...doctor, stage: newStage, notes: notes || doctor.notes, lastCallDate: new Date().toISOString() }
          : doctor
      )
    );
    setSelectedDoctor(null);
    setCallNote('');
  };

  const filteredDoctors = doctors.filter(doctor => {
    switch (filter) {
      case 'pending_call': return ['form_filled', 'documents_submitted', 'call_scheduled'].includes(doctor.stage);
      case 'follow_up': return doctor.stage === 'call_completed';
      case 'denied': return doctor.stage === 'denied';
      default: return true;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading doctor pipeline...</p>
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
              <Icon name="Briefcase" size={20} className="text-primary sm:w-6 sm:h-6" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary">Business Development CRM</h1>
                <p className="text-sm sm:text-base text-text-secondary">Manage doctor onboarding pipeline</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="bg-warning-50 border border-warning-200 rounded-lg px-3 sm:px-4 py-2 w-full sm:w-auto">
                <span className="text-warning font-medium text-sm">{doctors.filter(d => ['form_filled', 'documents_submitted', 'call_scheduled'].includes(d.stage)).length} Pending Calls</span>
              </div>
              <div className="bg-success-50 border border-success-200 rounded-lg px-3 sm:px-4 py-2 w-full sm:w-auto">
                <span className="text-success font-medium text-sm">{doctors.filter(d => d.stage === 'onboarded').length} Onboarded</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 sm:space-x-8 overflow-x-auto">
            {[
              { key: 'all', label: 'All Doctors', count: doctors.length },
              { key: 'pending_call', label: 'Pending Calls', count: doctors.filter(d => ['form_filled', 'documents_submitted', 'call_scheduled'].includes(d.stage)).length },
              { key: 'follow_up', label: 'Follow Up', count: doctors.filter(d => d.stage === 'call_completed').length },
              { key: 'denied', label: 'Denied', count: doctors.filter(d => d.stage === 'denied').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="bg-white rounded-lg shadow-sm border border-border">
          <div className="p-4 sm:p-6">
            {filteredDoctors.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <Icon name="UserCheck" size={40} className="text-text-muted mx-auto mb-4 sm:w-12 sm:h-12" />
                <h3 className="text-base sm:text-lg font-medium text-text-primary mb-2">No doctors found</h3>
                <p className="text-sm sm:text-base text-text-secondary">No doctors match the current filter.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="border border-border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer active:bg-gray-50"
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon name="UserCheck" size={16} className="text-primary sm:w-5 sm:h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                            <h3 className="font-semibold text-text-primary truncate">{doctor.name}</h3>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border w-fit ${getStageColor(doctor.stage)}`}>
                              {getStageLabel(doctor.stage)}
                            </span>
                          </div>
                          <p className="text-text-secondary mb-3 text-sm sm:text-base">{doctor.specialization} • {doctor.experience} years experience</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm text-text-muted">
                            <div className="flex items-center space-x-1">
                              <Icon name="Mail" size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                              <span className="truncate">{doctor.email}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="Phone" size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                              <span className="truncate">{doctor.phone}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="MapPin" size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                              <span>{doctor.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="Calendar" size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                              <span>{new Date(doctor.registrationDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Icon name="ChevronRight" size={16} className="text-text-muted flex-shrink-0 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Doctor Detail Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-text-primary">Doctor Details & CRM</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setSelectedDoctor(null)}
                  className="text-text-muted hover:text-text-primary"
                />
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Doctor Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Doctor Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Name</label>
                        <p className="text-text-primary">{selectedDoctor.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Specialization</label>
                        <p className="text-text-primary">{selectedDoctor.specialization}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Experience</label>
                        <p className="text-text-primary">{selectedDoctor.experience} years</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Location</label>
                        <p className="text-text-primary">{selectedDoctor.location}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Contact</label>
                        <p className="text-text-primary">{selectedDoctor.email}</p>
                        <p className="text-text-primary">{selectedDoctor.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary">Current Stage</label>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStageColor(selectedDoctor.stage)}`}>
                          {getStageLabel(selectedDoctor.stage)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CRM Actions */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">CRM Actions</h3>
                    
                    {/* Call Notes */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Current Notes
                      </label>
                      <div className="bg-surface rounded-lg p-3 text-text-secondary text-sm">
                        {selectedDoctor.notes || 'No notes available'}
                      </div>
                    </div>

                    {/* Add Call Note */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Add Call Note
                      </label>
                      <textarea
                        value={callNote}
                        onChange={(e) => setCallNote(e.target.value)}
                        placeholder="Enter call notes, discussion points, next steps..."
                        className="w-full h-24 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      {selectedDoctor.stage !== 'denied' && selectedDoctor.stage !== 'onboarded' && (
                        <>
                          <Button
                            onClick={() => handleStatusUpdate(selectedDoctor.id, 'call_completed', callNote)}
                            disabled={!callNote.trim()}
                            iconName="Phone"
                            className="w-full"
                          >
                            Mark Call as Completed
                          </Button>
                          
                          <Button
                            variant="outline"
                            onClick={() => handleStatusUpdate(selectedDoctor.id, 'call_scheduled', callNote)}
                            iconName="Calendar"
                            className="w-full"
                          >
                            Schedule Follow-up Call
                          </Button>
                          
                          <Button
                            variant="outline"
                            onClick={() => handleStatusUpdate(selectedDoctor.id, 'verified', callNote)}
                            iconName="CheckCircle"
                            className="w-full text-success border-success-200 hover:bg-success-50"
                          >
                            Mark as Verified
                          </Button>
                          
                          <Button
                            variant="outline"
                            onClick={() => handleStatusUpdate(selectedDoctor.id, 'denied', callNote)}
                            iconName="XCircle"
                            className="w-full text-error border-error-200 hover:bg-error-50"
                          >
                            Mark as Denied
                          </Button>
                        </>
                      )}
                      
                      {selectedDoctor.stage === 'verified' && (
                        <Button
                          onClick={() => handleStatusUpdate(selectedDoctor.id, 'onboarded', callNote)}
                          iconName="UserCheck"
                          className="w-full text-success border-success-200 hover:bg-success-50"
                        >
                          Complete Onboarding
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-text-primary">Registration submitted</p>
                      <p className="text-xs text-text-muted">{new Date(selectedDoctor.registrationDate).toLocaleString()}</p>
                    </div>
                  </div>
                  {selectedDoctor.lastCallDate && (
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-text-primary">Last call completed</p>
                        <p className="text-xs text-text-muted">{new Date(selectedDoctor.lastCallDate).toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessDeveloper;