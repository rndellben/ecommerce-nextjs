import { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
        placeholder="Search products..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
          dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </form>
  );
}