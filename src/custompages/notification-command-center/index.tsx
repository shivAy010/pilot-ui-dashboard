'use client'
import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import NotificationHeader from './components/NotificationHeader';
import NotificationFilters from './components/NotificationFilters';
import NotificationList from './components/NotificationList';
import NotificationSettings from './components/NotificationSettings';
import { Notification } from '../../types';

const NotificationCommandCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activePriority, setActivePriority] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedNotifications, setSelectedNotifications] = useState<(string | number)[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setNotifications([
      {
        id: 3,
        title: "Task Assignment: Security Audit Completion",
        message: "Please complete the quarterly security audit for the customer data management system. Deadline: End of this week.",
        sender: "Michael Chen",
        timestamp: new Date(Date.now() - 3600000),
        priority: "medium",
        category: "task",
        isRead: false,
        actionRequired: true,
        actionText: "Start Audit"
      },
      {
        id: 4,
        title: "Team Communication: Weekly Standup Rescheduled",
        message: "Tomorrow's weekly standup meeting has been moved from 10:00 AM to 2:00 PM due to client presentation conflicts.",
        sender: "Emma Rodriguez",
        timestamp: new Date(Date.now() - 7200000),
        priority: "low",
        category: "communication",
        isRead: true,
        actionRequired: false
      },
      {
        id: 5,
        title: "Security Alert: Unusual Login Activity Detected",
        message: "Multiple failed login attempts detected from IP address 192.168.1.100. Account temporarily locked for security purposes.",
        sender: "Security System",
        timestamp: new Date(Date.now() - 10800000),
        priority: "high",
        category: "security",
        isRead: false,
        actionRequired: true,
        actionText: "Review Activity"
      },
      {
        id: 6,
        title: "System Update: Maintenance Window Scheduled",
        message: "Scheduled maintenance for the primary application server will occur this Saturday from 2:00 AM to 6:00 AM EST.",
        sender: "DevOps Team",
        timestamp: new Date(Date.now() - 14400000),
        priority: "medium",
        category: "system",
        isRead: true,
        actionRequired: false
      }
    ]);
    setIsLoading(false);
  }, []);

  // Filter notifications based on active filters
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification?.sender?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' ||
                         (activeFilter === 'unread' && !notification.isRead) ||
                         (activeFilter === 'actionRequired' && notification.actionRequired) ||
                         (activeFilter === 'archived' && notification.archived);
    
    const matchesPriority = activePriority === 'all' || notification.priority === activePriority;
    const matchesCategory = activeCategory === 'all' || notification.category === activeCategory;
    
    return matchesSearch && matchesFilter && matchesPriority && matchesCategory;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const totalCount = notifications.length;

  const handleSelectNotification = (notificationId: string | number) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId)
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  const handleMarkAsRead = (notificationId: string | number) => {
    console.log('Mark as read:', notificationId);
  };

  const handleArchive = (notificationId: string | number) => {
    console.log('Archive:', notificationId);
  };

  const handleForward = (notificationId: string | number) => {
    console.log('Forward:', notificationId);
  };

  const handleBatchMarkAsRead = () => {
    console.log('Batch mark as read:', selectedNotifications);
    setSelectedNotifications([]);
  };

  const handleBatchArchive = () => {
    console.log('Batch archive:', selectedNotifications);
    setSelectedNotifications([]);
  };

  const handleBatchForward = () => {
    console.log('Batch forward:', selectedNotifications);
    setSelectedNotifications([]);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Header */}
            <NotificationHeader
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCount={selectedNotifications.length}
              onBatchMarkAsRead={handleBatchMarkAsRead}
              onBatchArchive={handleBatchArchive}
              onBatchForward={handleBatchForward}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
            />

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <NotificationFilters
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  activePriority={activePriority}
                  onPriorityChange={setActivePriority}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                  unreadCount={unreadCount}
                  totalCount={totalCount}
                />
              </div>

              {/* Notification List */}
              <div className="lg:col-span-3">
                <NotificationList
                  notifications={filteredNotifications}
                  selectedNotifications={selectedNotifications}
                  onSelectNotification={handleSelectNotification}
                  onSelectAll={handleSelectAll}
                  onMarkAsRead={handleMarkAsRead}
                  onArchive={handleArchive}
                  onForward={handleForward}
                  isLoading={isLoading}
                  hasMore={false}
                  onLoadMore={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      <NotificationSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default NotificationCommandCenter;