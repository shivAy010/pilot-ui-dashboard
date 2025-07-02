'use client'
import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

interface SupportTicket {
  id: string;
  ticketNumber: string;
  userEmail: string;
  userName: string;
  subject: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  category: 'technical' | 'billing' | 'account' | 'provider' | 'general';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

const CustomerSupport: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'open' | 'in_progress' | 'resolved'>('all');

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setTickets([
        {
          id: '1',
          ticketNumber: 'SUP-2024-001',
          userEmail: 'patient@example.com',
          userName: 'John Smith',
          subject: 'Unable to book appointment',
          description: 'I am unable to book an appointment with Dr. Johnson. The system shows an error when I try to select a time slot.',
          priority: 'high',
          status: 'open',
          category: 'technical',
          createdAt: '2024-07-02T09:30:00Z',
          updatedAt: '2024-07-02T09:30:00Z'
        },
        {
          id: '2',
          ticketNumber: 'SUP-2024-002',
          userEmail: 'provider@clinic.com',
          userName: 'Dr. Sarah Wilson',
          subject: 'Payment processing issue',
          description: 'My last three payments have not been processed correctly. The amount showing in my dashboard does not match my records.',
          priority: 'medium',
          status: 'in_progress',
          category: 'billing',
          createdAt: '2024-07-01T14:15:00Z',
          updatedAt: '2024-07-02T10:00:00Z',
          assignedTo: 'Support Agent 1'
        },
        {
          id: '3',
          ticketNumber: 'SUP-2024-003',
          userEmail: 'user@domain.com',
          userName: 'Maria Garcia',
          subject: 'Account verification problem',
          description: 'I submitted my verification documents three days ago but my account is still showing as unverified.',
          priority: 'medium',
          status: 'resolved',
          category: 'account',
          createdAt: '2024-06-30T11:20:00Z',
          updatedAt: '2024-07-01T16:45:00Z',
          assignedTo: 'Support Agent 2'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

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
      case 'open': return 'text-error bg-error-50 border-error-200';
      case 'in_progress': return 'text-primary bg-primary-50 border-primary-200';
      case 'resolved': return 'text-success bg-success-50 border-success-200';
      case 'closed': return 'text-text-muted bg-surface border-border';
      default: return 'text-text-muted bg-surface border-border';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return 'Settings';
      case 'billing': return 'CreditCard';
      case 'account': return 'User';
      case 'provider': return 'UserCheck';
      case 'general': return 'MessageCircle';
      default: return 'HelpCircle';
    }
  };

  const filteredTickets = filter === 'all' ? tickets : tickets.filter(ticket => ticket.status === filter);

  const handleTicketClick = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
  };

  const handleStatusUpdate = (ticketId: string, newStatus: SupportTicket['status']) => {
    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString() }
          : ticket
      )
    );
    setSelectedTicket(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading support tickets...</p>
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
              <Icon name="Headphones" size={24} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Customer Support Dashboard</h1>
                <p className="text-text-secondary">Manage and resolve customer support tickets</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-error-50 border border-error-200 rounded-lg px-4 py-2">
                <span className="text-error font-medium">{tickets.filter(t => t.status === 'open').length} Open</span>
              </div>
              <div className="bg-primary-50 border border-primary-200 rounded-lg px-4 py-2">
                <span className="text-primary font-medium">{tickets.filter(t => t.status === 'in_progress').length} In Progress</span>
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
              { key: 'all', label: 'All Tickets', count: tickets.length },
              { key: 'open', label: 'Open', count: tickets.filter(t => t.status === 'open').length },
              { key: 'in_progress', label: 'In Progress', count: tickets.filter(t => t.status === 'in_progress').length },
              { key: 'resolved', label: 'Resolved', count: tickets.filter(t => t.status === 'resolved').length }
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
            {filteredTickets.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No tickets found</h3>
                <p className="text-text-secondary">No support tickets match the current filter.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleTicketClick(ticket)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          <Icon name={getCategoryIcon(ticket.category)} size={20} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-text-primary">{ticket.subject}</h3>
                            <span className="text-sm text-text-muted">#{ticket.ticketNumber}</span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                              {ticket.status.replace('_', ' ').charAt(0).toUpperCase() + ticket.status.replace('_', ' ').slice(1)}
                            </span>
                          </div>
                          <p className="text-text-secondary mb-3 line-clamp-2">{ticket.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-text-muted">
                            <div className="flex items-center space-x-1">
                              <Icon name="User" size={14} />
                              <span>{ticket.userName}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="Mail" size={14} />
                              <span>{ticket.userEmail}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="Calendar" size={14} />
                              <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                            </div>
                            {ticket.assignedTo && (
                              <div className="flex items-center space-x-1">
                                <Icon name="UserCheck" size={14} />
                                <span>{ticket.assignedTo}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-text-muted" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-text-primary">Ticket Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setSelectedTicket(null)}
                  className="text-text-muted hover:text-text-primary"
                />
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-semibold text-text-primary">{selectedTicket.subject}</h3>
                    <span className="text-text-muted">#{selectedTicket.ticketNumber}</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority.charAt(0).toUpperCase() + selectedTicket.priority.slice(1)} Priority
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedTicket.status)}`}>
                      {selectedTicket.status.replace('_', ' ').charAt(0).toUpperCase() + selectedTicket.status.replace('_', ' ').slice(1)}
                    </span>
                  </div>
                  <div className="bg-surface rounded-lg p-4">
                    <p className="text-text-secondary">{selectedTicket.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Customer Information</h4>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="text-text-muted">Name:</span> {selectedTicket.userName}</p>
                      <p className="text-sm"><span className="text-text-muted">Email:</span> {selectedTicket.userEmail}</p>
                      <p className="text-sm"><span className="text-text-muted">Category:</span> {selectedTicket.category.charAt(0).toUpperCase() + selectedTicket.category.slice(1)}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-3">Ticket Information</h4>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="text-text-muted">Created:</span> {new Date(selectedTicket.createdAt).toLocaleString()}</p>
                      <p className="text-sm"><span className="text-text-muted">Updated:</span> {new Date(selectedTicket.updatedAt).toLocaleString()}</p>
                      {selectedTicket.assignedTo && (
                        <p className="text-sm"><span className="text-text-muted">Assigned to:</span> {selectedTicket.assignedTo}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTicket(null)}
                    className="text-text-secondary hover:text-text-primary"
                  >
                    Close
                  </Button>
                  {selectedTicket.status === 'open' && (
                    <Button
                      variant="outline"
                      iconName="Play"
                      onClick={() => handleStatusUpdate(selectedTicket.id, 'in_progress')}
                      className="text-primary hover:text-primary border-primary-200 hover:bg-primary-50"
                    >
                      Start Working
                    </Button>
                  )}
                  {selectedTicket.status === 'in_progress' && (
                    <Button
                      variant="primary"
                      iconName="CheckCircle"
                      onClick={() => handleStatusUpdate(selectedTicket.id, 'resolved')}
                    >
                      Mark Resolved
                    </Button>
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

export default CustomerSupport;