import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './components/layouts/AdminLayout';
import ProviderOnboardingReview from './pages/ProviderOnboardingReview';
import DecisionHub from './pages/DecisionHub';
import MyTasks from './pages/MyTasks';
import AgentExecutionLogs from './pages/AgentExecutionLogs';
import CustomerSupport from './pages/CustomerSupport';
import PlatformAnalytics from './pages/PlatformAnalytics';
import ManualAgentTrigger from './pages/ManualAgentTrigger';
import BusinessDeveloper from './pages/BusinessDeveloper';
import MarketingExecutor from './pages/MarketingExecutor';
import HRManager from './pages/HRManager';
import SocialMediaExecutive from './pages/SocialMediaExecutive';
import Developer from './pages/Developer';
import QAEngineer from './pages/QAEngineer';
import DevOps from './pages/DevOps';
import Research from './pages/Research';
import HomePage from './app/page';

function App() {
  // TODO: Get user role from JWT token/auth context
  const userRole = 'admin'; // This should come from authentication

  return (
    <AdminLayout userRole={userRole}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ops/providers/onboarding" element={<ProviderOnboardingReview />} />
        <Route path="/ops/tasks/decision-hub" element={<DecisionHub />} />
        <Route path="/ops/tasks/my-tasks" element={<MyTasks />} />
        <Route path="/ops/agents/execution-logs" element={<AgentExecutionLogs />} />
        <Route path="/ops/support/dashboard" element={<CustomerSupport />} />
        <Route path="/ops/dashboard/analytics" element={<PlatformAnalytics />} />
        <Route path="/ops/agents/trigger" element={<ManualAgentTrigger />} />
        <Route path="/ops/business/developer" element={<BusinessDeveloper />} />
        <Route path="/ops/marketing/executor" element={<MarketingExecutor />} />
        <Route path="/ops/hr/manager" element={<HRManager />} />
        <Route path="/ops/social/executive" element={<SocialMediaExecutive />} />
        <Route path="/ops/dev/tasks" element={<Developer />} />
        <Route path="/ops/qa/tasks" element={<QAEngineer />} />
        <Route path="/ops/devops/tasks" element={<DevOps />} />
        <Route path="/ops/research/tasks" element={<Research />} />
      </Routes>
    </AdminLayout>
  );
}

export default App;