import React, { useEffect, useRef, type ChangeEvent } from 'react';
import { Search } from 'lucide-react';

import useStore from '../stores/UseStore';

interface SearchInputWithDebounceProps {
    onSearch?: (query: string) => void;
}

const SearchInputWithDebounce: React.FC<SearchInputWithDebounceProps> = ({ onSearch }) => {
    const searchTerm = useStore((state) => state.searchTerm);
    const setSearchTerm = useStore((state) => state.setSearchTerm);

    const debounceTimeoutRef = useRef<number | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value); // Update the store immediately

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            if (onSearch) {
                onSearch(value); // Optional: if there's still a need for an immediate callback
            }
        }, 500); // Debounce for 500ms
    };

    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="relative flex items-center max-2-sm bg-white rounded border border-gray-200 focus-within:border-violet-800 focus-within:ring-1 focus-within:ring-violet-800 transition-all duration-200">
            {/* Changed styling for the search icon container */}
            <div className="flex m-1 items-center justify-center p-2 border border-gray-200 bg-gray-50 rounded text-gray-400">
                <Search size={20} />
            </div>
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleInputChange}
                // Removed pl-12 as the icon is no longer absolutely positioned
                className="w-full px-4 py-2 rounded text-lg text-gray-700 focus:outline-none"
                aria-label="Search input"
            />
        </div>
    );
};

export default SearchInputWithDebounce;