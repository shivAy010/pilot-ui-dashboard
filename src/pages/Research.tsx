import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

const Research: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Icon name="Search" size={24} className="text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Research Center</h1>
              <p className="text-text-secondary">Market research and analysis tasks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;