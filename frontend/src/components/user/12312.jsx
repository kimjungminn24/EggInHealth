import React, { useRef, useState, useEffect } from 'react';
import Arrow from "../../assets/static/Property_Arrow.png";

const initialItems = [
  { id: 1, label: '채팅' },
  { id: 2, label: '식단' },
  { id: 3, label: '에그' },
  { id: 4, label: '캘린더' },
  { id: 5, label: '운동' },
  { id: 6, label: '프로필' },
];

const UserHeader = () => {
  const scrollContainerRef = useRef(null);
  const [items, setItems] = useState(initialItems);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollAmount = 100; // 스크롤 양을 조정할 수 있습니다.

  const addItemToStart = () => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems.unshift(prevItems[prevItems.length - 1]);
      newItems.pop();
      return newItems;
    });
  };

  const addItemToEnd = () => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems.push(prevItems[0]);
      newItems.shift();
      return newItems;
    });
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollPos = scrollContainerRef.current.scrollLeft;
      console.log(scrollPos)
      addItemToStart();
      setScrollPosition(scrollPos - scrollAmount);
    }
  };

  const handleScrollRight = () => {
    console.log(scrollContainerRef.current)
    if (scrollContainerRef.current) {
      const scrollPos = scrollContainerRef.current.scrollLeft;
      console.log(scrollPos)
      addItemToEnd();
      setScrollPosition(scrollPos + scrollAmount);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [items]);

  return (
    <div className='relative'>
      <div className='absolute z-30 left-6 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={handleScrollLeft}>
        <img src={Arrow} alt="왼쪽화살표" className='w-[13px] h-[24px] -scale-x-100'/>
      </div>
      <div className='absolute h-[35px] w-[120px] bg-yellow-400 z-10 top-0 left-0 right-0 bottom-0 m-auto rounded-full'></div>
      <div className='absolute z-30 top-1/2 right-6 transform -translate-y-1/2 cursor-pointer' onClick={handleScrollRight}>
        <img src={Arrow} alt="오른쪽화살표" className='w-[13px] h-[24px]'/>
      </div>
      <div 
        className="relative w-[330px] flex gap-5 snap-x overflow-x-auto bg-white h-[40px] rounded-full top-0 left-0 right-0 bottom-0 m-auto justify-items-center items-center"
        ref={scrollContainerRef}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // For Firefox and IE/Edge
      >
        {items.map((item, index) => (
          <div key={index} className="z-20 snap-center shrink-0 first:pl-8 last:pr-8">
              <div className="w-24 flex justify-center items-center text-neutral-400 text-[20px] font-bold">
                  {item.label}
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHeader;
