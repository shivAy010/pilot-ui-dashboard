import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '../AppIcon';
import Button from './Button';
import * as LucideIcons from 'lucide-react';

interface NavigationItem {
  name: string;
  path: string;
  icon: string;
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  const navigationItems: NavigationItem[] = [
    { name: 'Unified Command Dashboard', path: '/unified-command-dashboard', icon: 'LayoutDashboard' },
    { name: 'Task Intelligence Center', path: '/task-intelligence-center', icon: 'Brain' },
    { name: 'Analytics Observatory', path: '/analytics-observatory', icon: 'BarChart3' },
    { name: 'Team Administration Console', path: '/team-administration-console', icon: 'Users' },
    { name: 'Notification Command Center', path: '/notification-command-center', icon: 'Bell' },
    { name: 'Integration Marketplace', path: '/integration-marketplace', icon: 'Puzzle' },
    { name: 'Security Compliance Center', path: '/security-compliance-center', icon: 'Shield' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path: string): boolean => {
    return pathname === path;
  };

  const Logo: React.FC = () => (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <rect width="32" height="32" rx="8" fill="currentColor" />
          <path
            d="M8 12L16 8L24 12V20C24 22.2091 22.2091 24 20 24H12C9.79086 24 8 22.2091 8 20V12Z"
            fill="white"
          />
          <circle cx="16" cy="16" r="3" fill="currentColor" />
        </svg>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse-soft"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-text-primary leading-tight">
          Sahej Pilot
        </span>
        <span className="text-xs text-text-secondary font-medium leading-tight">
          Operations
        </span>
      </div>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-brand border-b border-border'
          : 'bg-white border-b border-border'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 transition-transform duration-200 hover:scale-105">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          {/* <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span className="hidden xl:inline">{item.name}</span>
              </Link>
            ))}
          </nav> */}

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              iconName="Search"
              className="text-text-secondary hover:text-text-primary"
            >
              <span className="sr-only">Search</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Bell"
              className="text-text-secondary hover:text-text-primary relative"
            >
              <span className="sr-only">Notifications</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full"></span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Settings"
              className="text-text-secondary hover:text-text-primary"
            >
              <span className="sr-only">Settings</span>
            </Button>
            <div className="w-px h-6 bg-border"></div>
            <Button
              variant="ghost"
              size="sm"
              iconName="User"
              className="text-text-secondary hover:text-text-primary"
            >
              <span className="sr-only">Profile</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-text-secondary hover:text-text-primary"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-border animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Icon name={item.icon as keyof typeof LucideIcons} size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="border-t border-border pt-3 mt-3">
              <div className="flex items-center justify-around">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Search"
                  className="text-text-secondary hover:text-text-primary"
                >
                  Search
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Bell"
                  className="text-text-secondary hover:text-text-primary relative"
                >
                  Notifications
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full"></span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Settings"
                  className="text-text-secondary hover:text-text-primary"
                >
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="User"
                  className="text-text-secondary hover:text-text-primary"
                >
                  Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;