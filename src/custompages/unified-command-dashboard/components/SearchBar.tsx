import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import * as LucideIcons from 'lucide-react';

interface Suggestion {
  type: string;
  title: string;
  icon: string;
  category: string;
}

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const mockSuggestions = [
    { type: 'task', title: 'Review Q4 Marketing Campaign', icon: 'CheckSquare', category: 'Tasks' },
    { type: 'report', title: 'Monthly Performance Report', icon: 'FileText', category: 'Reports' },
    { type: 'team', title: 'Development Team', icon: 'Users', category: 'Teams' },
    { type: 'integration', title: 'Slack Integration Setup', icon: 'Puzzle', category: 'Integrations' },
    { type: 'user', title: 'Sarah Johnson - Project Manager', icon: 'User', category: 'People' },
    { type: 'dashboard', title: 'Analytics Observatory', icon: 'BarChart3', category: 'Pages' },
    { type: 'notification', title: 'Security Alert - Login Attempt', icon: 'Bell', category: 'Notifications' },
    { type: 'document', title: 'API Documentation v2.1', icon: 'Book', category: 'Documents' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockSuggestions.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setIsOpen(false);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSearchQuery(suggestion.title);
    setIsOpen(false);
    console.log('Selected suggestion:', suggestion);
  };

  const getTypeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      task: 'text-primary',
      report: 'text-accent',
      team: 'text-secondary',
      integration: 'text-warning',
      user: 'text-success',
      dashboard: 'text-info',
      notification: 'text-error',
      document: 'text-muted'
    };
    return colorMap[type] || 'text-text-muted';
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted" 
          />
          <Input
            type="search"
            placeholder="Search tasks, reports, teams, or ask AI for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3 text-sm bg-surface border-border focus:border-primary focus:ring-2 focus:ring-primary-200 rounded-lg"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-mono text-text-muted bg-card border border-border rounded">
              ⌘K
            </kbd>
            <Icon 
              name="Sparkles" 
              size={16} 
              className="text-accent" 
            />
          </div>
        </div>
      </form>

      {/* Search Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-brand-lg z-50 animate-fade-in">
          <div className="p-2">
            <div className="text-xs font-medium text-text-muted px-3 py-2 border-b border-border mb-2">
              Suggestions
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-surface rounded-md transition-colors duration-150"
              >
                <div className={`w-8 h-8 rounded-lg bg-surface flex items-center justify-center ${getTypeColor(suggestion.type)}`}>
                  <Icon name={suggestion.icon as keyof typeof LucideIcons} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-text-primary truncate">
                    {suggestion.title}
                  </div>
                  <div className="text-xs text-text-muted">
                    {suggestion.category}
                  </div>
                </div>
                <Icon name="ArrowUpRight" size={14} className="text-text-muted" />
              </button>
            ))}
          </div>
          
          <div className="border-t border-border p-3">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>Press Enter to search</span>
              <div className="flex items-center space-x-2">
                <kbd className="px-2 py-1 bg-surface border border-border rounded text-xs">↑</kbd>
                <kbd className="px-2 py-1 bg-surface border border-border rounded text-xs">↓</kbd>
                <span>to navigate</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;