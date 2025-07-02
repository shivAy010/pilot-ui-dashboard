import React from 'react';
import Icon from '../../components/AppIcon';
import { User } from '../../types';

interface WelcomeHeaderProps {
  user: User | null;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ user }) => {
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <header className="bg-card border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between py-4 px-4">
          {/* Left Section - Brand */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Sahej Pilot Operations</h1>
              <p className="text-sm text-muted-foreground">Internal Operations Center</p>
            </div>
          </div>

          {/* Center Section - Time and Date */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>{getCurrentTime()}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Calendar" size={16} />
              <span>{getCurrentDate()}</span>
            </div>
          </div>

          {/* Right Section - User Actions */}
          <div className="flex items-center space-x-4">
            {/* User Info */}
            <div className="hidden sm:flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{user?.name}</div>
                <div className="text-xs text-muted-foreground">{user?.email}</div>
              </div>
            </div>

            {/* System Status */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-700 font-medium">System Online</span>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default WelcomeHeader;