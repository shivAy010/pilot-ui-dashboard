import React from 'react';
import Icon from '../../../components/AppIcon';
import * as LucideIcons from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  integrationCounts: Record<string, number>;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onCategoryChange, integrationCounts }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-primary-50 text-primary border border-primary-200' :'hover:bg-surface text-text-secondary hover:text-text-primary'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon 
                name={category.icon as keyof typeof LucideIcons} 
                size={18} 
                className={selectedCategory === category.id ? 'text-primary' : 'text-text-muted'}
              />
              <span className="font-medium">{category.name}</span>
            </div>
            <span className={`text-sm px-2 py-1 rounded-full ${
              selectedCategory === category.id
                ? 'bg-primary-100 text-primary' :'bg-surface text-text-muted'
            }`}>
              {integrationCounts[category.id] || 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;