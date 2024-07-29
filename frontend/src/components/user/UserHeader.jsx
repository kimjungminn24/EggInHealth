import React, { useRef, useState, useEffect } from 'react';

const items = [
  { id: 1, label: '채팅' },
  { id: 2, label: '식단' },
  { id: 3, label: '에그' },
  { id: 4, label: '캘린더' },
  { id: 5, label: '운동' },
  { id: 6, label: '프로필' },
];

const UserHeader = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 3; // The multiplier controls the scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 3; // The multiplier controls the scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      if (scrollContainer.scrollLeft === 0) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2;
      } else if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = scrollContainer.scrollLeft - scrollContainer.scrollWidth / 2;
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    scrollContainer.addEventListener('mousedown', handleMouseDown);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('mouseup', handleMouseUp);
    scrollContainer.addEventListener('mousemove', handleMouseMove);

    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('touchmove', handleTouchMove);
    scrollContainer.addEventListener('touchend', handleTouchEnd);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      scrollContainer.removeEventListener('mousedown', handleMouseDown);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      scrollContainer.removeEventListener('mouseup', handleMouseUp);
      scrollContainer.removeEventListener('mousemove', handleMouseMove);

      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchmove', handleTouchMove);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, startX, scrollLeft]);

  return (
    <div 
      className="relative w-full flex gap-6 snap-x overflow-x-auto bg-white h-20"
      ref={scrollContainerRef}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // For Firefox and IE/Edge
    >
      {/* <style jsx>{`
        .scroll-container::-webkit-scrollbar {
          display: none; // For Chrome, Safari, and Opera
        }
      `}</style> */}
      {[...items, ...items].map((item, index) => (
        <div key={index} className="snap-center shrink-0 first:pl-8 last:pr-8">
            <div className="w-24 flex justify-center items-center text-neutral-400 text-xl">
                {item.label}
            </div>
        </div>
      ))}
    </div>
  );
};

export default UserHeader;
