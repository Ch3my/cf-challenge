
import { useEffect, useRef } from 'react';

// Custom hook to detect clicks outside a specified element
const useOutsideClick = (callback: () => void) => {
    // Create a ref to store the element to watch
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Function to handle clicks
        const handleClick = (event: MouseEvent) => {
            // If the click is outside the referenced element, call the callback
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        // Add event listener for mousedown
        document.addEventListener('mousedown', handleClick);

        // Cleanup function to remove the event listener
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [callback]); // Re-run the effect if the callback changes

    return ref;
};

export default useOutsideClick;
