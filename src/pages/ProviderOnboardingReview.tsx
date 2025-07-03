import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  submittedAt: string;
  status: 'kyc_in_review';
  documents: {
    license: string;
    certificate: string;
    identification: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

const ProviderOnboardingReview: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setProviders([
        {
          id: '1',
          name: 'Dr. Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+1-555-0123',
          specialization: 'Cardiology',
          submittedAt: '2024-07-01T10:30:00Z',
          status: 'kyc_in_review',
          documents: {
            license: 'medical_license_001.pdf',
            certificate: 'board_certification.pdf',
            identification: 'drivers_license.pdf'
          },
          address: {
            street: '123 Medical Center Blvd',
            city: 'New York',
            state: 'NY',
            zipCode: '10001'
          }
        },
        {
          id: '2',
          name: 'Dr. Michael Chen',
          email: 'michael.chen@email.com',
          phone: '+1-555-0124',
          specialization: 'Pediatrics',
          submittedAt: '2024-07-02T14:15:00Z',
          status: 'kyc_in_review',
          documents: {
            license: 'medical_license_002.pdf',
            certificate: 'pediatric_certification.pdf',
            identification: 'passport.pdf'
          },
          address: {
            street: '456 Children\'s Hospital Way',
            city: 'Los Angeles',
            state: 'CA',
            zipCode: '90210'
          }
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleProviderClick = (provider: Provider) => {
    setSelectedProvider(provider);
  };

  const handleCloseModal = () => {
    setSelectedProvider(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading provider applications...</p>
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
              <Icon name="UserCheck" size={24} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Provider Onboarding Review</h1>
                <p className="text-text-secondary">Review and approve pending provider applications</p>
              </div>
            </div>
            <div className="bg-primary-50 border border-primary-200 rounded-lg px-4 py-2">
              <span className="text-primary font-medium">{providers.length} Pending Reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-border">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-6">Pending Applications</h2>
            
            {providers.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">All caught up!</h3>
                <p className="text-text-secondary">No pending provider applications to review.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {providers.map((provider) => (
                  <div
                    key={provider.id}
                    className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleProviderClick(provider)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          <Icon name="User" size={20} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-text-primary">{provider.name}</h3>
                          <p className="text-sm text-text-secondary">{provider.specialization}</p>
                          <p className="text-sm text-text-muted">{provider.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-text-muted">
                          Submitted {new Date(provider.submittedAt).toLocaleDateString()}
                        </p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning-50 text-warning border border-warning-200">
                          In Review
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Provider Detail Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-text-primary">Provider Application Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={handleCloseModal}
                  className="text-text-muted hover:text-text-primary"
                />
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Provider Information */}
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-4">Provider Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-text-muted">Full Name</label>
                      <p className="font-medium text-text-primary">{selectedProvider.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-text-muted">Email</label>
                      <p className="font-medium text-text-primary">{selectedProvider.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-text-muted">Phone</label>
                      <p className="font-medium text-text-primary">{selectedProvider.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-text-muted">Specialization</label>
                      <p className="font-medium text-text-primary">{selectedProvider.specialization}</p>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-4">Address</h3>
                  <div className="space-y-2">
                    <p className="text-text-primary">{selectedProvider.address.street}</p>
                    <p className="text-text-primary">
                      {selectedProvider.address.city}, {selectedProvider.address.state} {selectedProvider.address.zipCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-text-primary mb-4">Submitted Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="FileText" size={16} className="text-primary" />
                      <span className="text-sm font-medium text-text-primary">Medical License</span>
                    </div>
                    <p className="text-sm text-text-muted">{selectedProvider.documents.license}</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Award" size={16} className="text-primary" />
                      <span className="text-sm font-medium text-text-primary">Board Certification</span>
                    </div>
                    <p className="text-sm text-text-muted">{selectedProvider.documents.certificate}</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="CreditCard" size={16} className="text-primary" />
                      <span className="text-sm font-medium text-text-primary">Identification</span>
                    </div>
                    <p className="text-sm text-text-muted">{selectedProvider.documents.identification}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex items-center justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={handleCloseModal}
                  className="text-text-secondary hover:text-text-primary"
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  iconName="XCircle"
                  className="text-error hover:text-error border-error-200 hover:bg-error-50"
                >
                  Reject
                </Button>
                <Button
                  variant="primary"
                  iconName="CheckCircle"
                >
                  Approve Application
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderOnboardingReview;