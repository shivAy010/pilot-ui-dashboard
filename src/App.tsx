import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProviderOnboardingReview from './pages/ProviderOnboardingReview';
import DecisionHub from './pages/DecisionHub';
import MyTasks from './pages/MyTasks';
import AgentExecutionLogs from './pages/AgentExecutionLogs';
import CustomerSupport from './pages/CustomerSupport';
import PlatformAnalytics from './pages/PlatformAnalytics';
import ManualAgentTrigger from './pages/ManualAgentTrigger';
import HomePage from './app/page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ops/providers/onboarding" element={<ProviderOnboardingReview />} />
      <Route path="/ops/tasks/decision-hub" element={<DecisionHub />} />
      <Route path="/ops/tasks/my-tasks" element={<MyTasks />} />
      <Route path="/ops/agents/execution-logs" element={<AgentExecutionLogs />} />
      <Route path="/ops/support/dashboard" element={<CustomerSupport />} />
      <Route path="/ops/dashboard/analytics" element={<PlatformAnalytics />} />
      <Route path="/ops/agents/trigger" element={<ManualAgentTrigger />} />
    </Routes>
  );
}

export default App;