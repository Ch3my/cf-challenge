import React, { useCallback, memo } from 'react';
import { ArrowUpNarrowWide, ArrowDownWideNarrow } from 'lucide-react';
import useStore from '../stores/UseStore';

const SortControl: React.FC = memo(() => {
    const sortOption = useStore((state) => state.sortOption);
    const setSortOption = useStore((state) => state.setSortOption);

    const toggleSortDirection = useCallback(() => {
        setSortOption({
            key: 'cutOffDate',
            direction: sortOption.direction === 'asc' ? 'desc' : 'asc',
        });
    }, [sortOption, setSortOption]);

    return (
        <button
            onClick={toggleSortDirection}
            className="flex items-center px-6 py-3 bg-white hover:bg-gray-50 rounded border border-gray-200  focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-200 ease-in-out"
        >
            Sort by Cut-off Date
            {sortOption.direction === 'asc' ? (
                <ArrowUpNarrowWide className="ml-2" size={20} />
            ) : (
                <ArrowDownWideNarrow className="ml-2" size={20} />
            )}
        </button>
    );
});

export default SortControl;