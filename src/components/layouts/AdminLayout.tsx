import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../ui/Header';
import AdminSidebar from '../ui/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  userRole?: 'admin' | 'support' | 'stakeholder' | 'executive' | 'dev' | 'verification_officer' | 'support_manager' | 'business_developer' | 'marketing_executor' | 'hr_manager' | 'social_media_executive' | 'developer' | 'qa' | 'devops' | 'research';
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, userRole = 'admin' }) => {
  const location = useLocation();

  // Hide layout on login page
  if (location.pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <AdminSidebar userRole={userRole} />
        <main className="flex-1 ml-0 lg:ml-16 transition-all duration-300">
          <div className="pt-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;