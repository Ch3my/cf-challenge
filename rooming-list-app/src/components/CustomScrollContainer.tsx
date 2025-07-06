import React, { useRef, useEffect, useState } from 'react';

// Define the props for the CustomScrollContainer component
interface CustomScrollContainerProps {
  children: React.ReactNode; // The content to be wrapped by the scrollable container
  className?: string; // Optional className for additional styling on the container
}

const CustomScrollContainer: React.FC<CustomScrollContainerProps> = ({ children, className }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(0);
  const [thumbLeft, setThumbLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; initialThumbLeft: number } | null>(null);

  // Function to update scrollbar thumb position and size
  const updateScrollThumb = () => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
      setScrollWidth(scrollWidth);
      setClientWidth(clientWidth);

      // Only calculate thumb properties if scrolling is needed
      if (scrollWidth > clientWidth) {
        const fixedThumbWidth = 300; // The desired fixed thumb width
        setThumbWidth(fixedThumbWidth);

        // Calculate the maximum left position the thumb can reach
        const maxThumbLeft = Math.max(0, clientWidth - fixedThumbWidth);

        const scrollableDistance = scrollWidth - clientWidth;
        let calculatedThumbLeft = 0;

        if (scrollableDistance > 0) {
          calculatedThumbLeft = (scrollLeft / scrollableDistance) * maxThumbLeft;
        }

        setThumbLeft(calculatedThumbLeft);
      }
    }
  };

  // Effect to update scrollbar on mount and content changes
  useEffect(() => {
    updateScrollThumb();
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', updateScrollThumb);
      const resizeObserver = new ResizeObserver(updateScrollThumb);
      resizeObserver.observe(currentRef);
      if (currentRef.firstElementChild) {
        resizeObserver.observe(currentRef.firstElementChild);
      }

      return () => {
        if (currentRef) {
            currentRef.removeEventListener('scroll', updateScrollThumb);
        }
        resizeObserver.disconnect();
      };
    }
  }, [children]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      initialThumbLeft: thumbLeft,
    };
    document.body.style.userSelect = 'none';
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'auto'; // Disable smooth scrolling during drag
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragStartRef.current || !scrollRef.current) return;

      const { scrollWidth, clientWidth } = scrollRef.current;
      const maxThumbLeft = Math.max(0, clientWidth - thumbWidth);
      const scrollableDistance = scrollWidth - clientWidth;

      const dx = e.clientX - dragStartRef.current.startX;
      let newThumbLeft = dragStartRef.current.initialThumbLeft + dx;

      newThumbLeft = Math.max(0, Math.min(newThumbLeft, maxThumbLeft));

      if (scrollableDistance > 0 && maxThumbLeft > 0) {
        const newScrollLeft = (newThumbLeft / maxThumbLeft) * scrollableDistance;
        scrollRef.current.scrollLeft = newScrollLeft;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
      if (scrollRef.current) {
        scrollRef.current.style.scrollBehavior = 'smooth'; // Re-enable smooth scrolling
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, thumbWidth, thumbLeft]);

  // Determine if the scrollbar should be shown
  const showScrollbar = scrollWidth > clientWidth;

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Scrollable content area */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide py-2 gap-4"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
        }}
      >
        {children}
      </div>

      {/* Custom scrollbar track and thumb - Conditionally rendered */}
      {showScrollbar && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-full my-2">
          <div
            onMouseDown={handleMouseDown}
            className="absolute top-1/2 -translate-y-1/2 bg-gray-300 rounded-md h-4 flex justify-around items-center cursor-pointer"
            style={{
              width: `${thumbWidth}px`,
              left: `${thumbLeft}px`,
              transition: isDragging ? 'none' : 'left 0.1s ease-out',
            }}
          >
            {/* These are the three "holes" */}
            <div className="w-1 h-2 bg-gray-100 rounded"></div> {/* Hole 1 */}
            <div className="w-1 h-2 bg-gray-100 rounded"></div> {/* Hole 2 */}
            <div className="w-1 h-2 bg-gray-100 rounded"></div> {/* Hole 3 */}
          </div>
        </div>
      )}

      {/* Tailwind CSS for hiding scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CustomScrollContainer;