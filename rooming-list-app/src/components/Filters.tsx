import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

// Main App component
const Filters = () => {
    // State to manage the visibility of the filter dropdown
    const [isOpen, setIsOpen] = useState(false);
    // State to manage the selected filter options
    const [filters, setFilters] = useState({
        active: false,
        closed: true, // 'Closed' is pre-selected based on the image
        canceled: false,
    });

    // Function to toggle the filter dropdown visibility
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Function to handle checkbox changes
    const handleCheckboxChange = (event: any) => {
        const { name, checked } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: checked,
        }));
    };

    // Function to handle the save action
    const handleSave = () => {
        console.log('Filters saved:', filters);
        setIsOpen(false); // Close the dropdown after saving
    };

    return (
        <div className="relative">
            {/* Filters button */}
            <button
                onClick={toggleDropdown}
                className="flex items-center px-6 py-3 bg-white text-purple-700 font-semibold rounded border border-purple-300 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
            >
                Filters
<SlidersHorizontal />
            </button>

            {/* Filter dropdown content */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-xl shadow-lg p-5 z-10 border border-gray-200">
                    <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4 tracking-wider">
                        RFP STATUS
                    </h3>
                    <div className="space-y-3">
                        {/* Active checkbox */}
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="active"
                                checked={filters.active}
                                onChange={handleCheckboxChange}
                                className="form-checkbox h-5 w-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500 transition duration-150 ease-in-out"
                            />
                            <span className="ml-3 text-gray-800 text-lg font-medium">Active</span>
                        </label>

                        {/* Closed checkbox */}
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="closed"
                                checked={filters.closed}
                                onChange={handleCheckboxChange}
                                className="form-checkbox h-5 w-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500 transition duration-150 ease-in-out"
                            />
                            <span className="ml-3 text-gray-800 text-lg font-medium">Closed</span>
                        </label>

                        {/* Canceled checkbox */}
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="canceled"
                                checked={filters.canceled}
                                onChange={handleCheckboxChange}
                                className="form-checkbox h-5 w-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500 transition duration-150 ease-in-out"
                            />
                            <span className="ml-3 text-gray-800 text-lg font-medium">Canceled</span>
                        </label>
                    </div>

                    {/* Save button */}
                    <button
                        onClick={handleSave}
                        className="mt-6 w-full bg-purple-700 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default Filters;
