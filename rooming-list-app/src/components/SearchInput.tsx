import React, { useEffect, useState, memo } from 'react';
import { Search } from 'lucide-react';

import useStore from '../stores/UseStore';

interface SearchInputWithDebounceProps {
    onSearch?: (query: string) => void;
}

const SearchInputWithDebounce: React.FC<SearchInputWithDebounceProps> = memo(({ onSearch }) => {
    const globalSearchTerm = useStore((state) => state.searchTerm);
    const setGlobalSearchTerm = useStore((state) => state.setSearchTerm);
    
    // Local state for the input to provide a responsive UI
    const [localSearchTerm, setLocalSearchTerm] = useState(globalSearchTerm);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchTerm(event.target.value);
    };

    useEffect(() => {
        // Update local state if global state changes from elsewhere
        setLocalSearchTerm(globalSearchTerm);
    }, [globalSearchTerm]);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            // Update the global store only after the debounce period
            setGlobalSearchTerm(localSearchTerm);
            if (onSearch) {
                onSearch(localSearchTerm);
            }
        }, 500); // Debounce for 500ms

        return () => {
            clearTimeout(debounceTimeout);
        };
    }, [localSearchTerm, setGlobalSearchTerm, onSearch]);

    return (
        <div className="relative flex items-center max-2-sm bg-white rounded border border-gray-200 focus-within:border-violet-800 focus-within:ring-1 focus-within:ring-violet-800 transition-all duration-200">
            <div className="flex m-1 items-center justify-center p-2 border border-gray-200 bg-gray-50 rounded text-gray-400">
                <Search size={20} />
            </div>
            <input
                type="text"
                placeholder="Search"
                value={localSearchTerm}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded text-lg text-gray-700 focus:outline-none"
                aria-label="Search input"
            />
        </div>
    );
});

export default SearchInputWithDebounce;