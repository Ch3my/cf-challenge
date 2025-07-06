import { SlidersHorizontal } from 'lucide-react';
import { useState, useCallback, memo } from 'react';
import useStore from '../stores/UseStore';
import useOutsideClick from '../hooks/useOutsideClick';

// Main App component
const Filters: React.FC = memo(() => {
    // State to manage the visibility of the filter dropdown
    const [isOpen, setIsOpen] = useState(false);
    // Get filters and setFilters from the store
    const activeFilters = useStore((state) => state.activeFilters);
    const setFilters = useStore((state) => state.setFilters);

    // Function to toggle the filter dropdown visibility
    const toggleDropdown = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    // Function to handle checkbox changes
    const handleCheckboxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setFilters({
            ...activeFilters,
            [name]: checked,
        });
    }, [activeFilters, setFilters]);

    // Function to handle the save action
    const handleSave = useCallback(() => {
        setIsOpen(false); // Close the dropdown after saving
    }, []);

    const ref = useOutsideClick(() => {
        setIsOpen(false);
    });

    return (
        <div className="relative" ref={ref}>
            {/* Filters button */}
            <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 font-semibold rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
            >
                Filters
                <SlidersHorizontal color='#00c2a6' />
            </button>

            {/* Filter dropdown content */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-xl shadow-lg p-5 z-10 border border-gray-200">
                    <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4 tracking-wider">
                        RFP STATUS
                    </h3>
                    <div className="space-y-2">
                        {/* Active checkbox */}
                        <label className="flex items-center cursor-pointer gap-2">
                            <input
                                type="checkbox"
                                name="active"
                                checked={activeFilters.active}
                                onChange={handleCheckboxChange}
                                className="form-checkbox h-5 w-5 rounded border border-gray-300 checked:bg-[#00c2a6] text-white transition duration-150 ease-in-out appearance-none relative"
                            />
                            <span className="text-gray-800 text-lg font-medium">Active</span>
                        </label>

                        {/* Closed checkbox */}
                        <label className="flex items-center cursor-pointer gap-2">
                            <input
                                type="checkbox"
                                name="closed"
                                checked={activeFilters.closed}
                                onChange={handleCheckboxChange}
                                className="form-checkbox h-5 w-5 rounded border border-gray-300 checked:bg-[#00c2a6] text-white transition duration-150 ease-in-out appearance-none relative"
                            />
                            <span className="text-gray-800 text-lg font-medium">Closed</span>
                        </label>

                        {/* Canceled checkbox */}
                        <label className="flex items-center cursor-pointer gap-2">
                            <input
                                type="checkbox"
                                name="canceled"
                                checked={activeFilters.canceled}
                                onChange={handleCheckboxChange}
                                className="form-checkbox h-5 w-5 rounded border border-gray-300 checked:bg-[#00c2a6] text-white transition duration-150 ease-in-out appearance-none relative"
                            />
                            <span className="text-gray-800 text-lg font-medium">Canceled</span>
                        </label>
                    </div>

                    {/* Save button */}
                    <button
                        onClick={handleSave}
                        className="mt-6 w-full bg-[#4323ff] hover:bg-[#3719e5] text-white font-semibold py-3 rounded-xl shadow-md focus:outline-none focus:ring-2 transition duration-200 ease-in-out"
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
});

export default Filters;
