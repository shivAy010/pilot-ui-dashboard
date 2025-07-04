import React, { useState } from 'react';
import Button from '../ui/Button';
import Icon from '../AppIcon';

interface ProviderVerificationFormProps {
  providerId: string;
  providerName: string;
  onSubmit: (action: 'approve' | 'reject', notes: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProviderVerificationForm: React.FC<ProviderVerificationFormProps> = ({
  providerId,
  providerName,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ notes?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!action) return;
    
    // Validation
    const newErrors: { notes?: string } = {};
    if (!notes.trim()) {
      newErrors.notes = 'Internal notes are required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onSubmit(action, notes.trim());
  };

  const handleActionSelect = (selectedAction: 'approve' | 'reject') => {
    setAction(selectedAction);
    setErrors({});
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon 
                name={action === 'approve' ? 'CheckCircle' : action === 'reject' ? 'XCircle' : 'FileCheck'} 
                size={24} 
                className={
                  action === 'approve' ? 'text-success' : 
                  action === 'reject' ? 'text-error' : 
                  'text-primary'
                }
              />
              <div>
                <h2 className="text-xl font-semibold text-text-primary">
                  Provider Verification
                </h2>
                <p className="text-text-secondary">
                  Review application for {providerName}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onCancel}
              className="text-text-muted hover:text-text-primary"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Action Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Verification Decision *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleActionSelect('approve')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  action === 'approve'
                    ? 'border-success bg-success-50 text-success'
                    : 'border-border hover:border-success-200 hover:bg-success-50'
                }`}
                disabled={isLoading}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="CheckCircle" size={20} />
                  <span className="font-medium">Approve Application</span>
                </div>
                <p className="text-xs mt-1 opacity-75">
                  Provider meets all requirements
                </p>
              </button>
              
              <button
                type="button"
                onClick={() => handleActionSelect('reject')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  action === 'reject'
                    ? 'border-error bg-error-50 text-error'
                    : 'border-border hover:border-error-200 hover:bg-error-50'
                }`}
                disabled={isLoading}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="XCircle" size={20} />
                  <span className="font-medium">Reject Application</span>
                </div>
                <p className="text-xs mt-1 opacity-75">
                  Provider does not meet requirements
                </p>
              </button>
            </div>
          </div>

          {/* Internal Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-text-primary mb-2">
              Internal Notes *
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
                errors.notes ? 'border-error' : 'border-border'
              }`}
              placeholder={
                action === 'approve' 
                  ? 'Document verification details, credentials checked, etc...'
                  : action === 'reject'
                  ? 'Specify reasons for rejection, missing documents, etc...'
                  : 'Add your verification notes here...'
              }
              disabled={isLoading}
            />
            {errors.notes && (
              <p className="mt-1 text-sm text-error">{errors.notes}</p>
            )}
            <p className="mt-1 text-xs text-text-muted">
              These notes are for internal use only and will not be shared with the provider.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="text-text-secondary hover:text-text-primary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={action === 'approve' ? 'primary' : action === 'reject' ? 'outline' : 'outline'}
              disabled={!action || isLoading}
              iconName={isLoading ? 'Loader' : action === 'approve' ? 'CheckCircle' : 'XCircle'}
              className={
                action === 'reject' 
                  ? 'text-error hover:text-error border-error-200 hover:bg-error-50' 
                  : ''
              }
            >
              {isLoading 
                ? 'Processing...' 
                : action === 'approve' 
                ? 'Approve Provider' 
                : action === 'reject'
                ? 'Reject Application'
                : 'Select Action'
              }
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProviderVerificationForm;