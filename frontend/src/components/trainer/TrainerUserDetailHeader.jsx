import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Arrow from "../../assets/static/whitearrow.png";

//양식만 맞춰놈, 수정필요
const initialItems = [
  { id: 1, label: '운동', path: '/userexercise' },
  { id: 2, label: '프로필', path: '/userprofile' },
  { id: 3, label: '식단', path: '/userdiet' },
  { id: 4, label: '캘린더', path: '/usercalender' },
  { id: 5, label: '운동', path: '/userexercise' },
  { id: 6, label: '프로필', path: '/userprofile' },
  { id: 7, label: '식단', path: '/userdiet' },
  { id: 8, label: '캘린더', path: '/usercalender' },
];

const TrainerUserDetailHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(); //앱을 키자마자 로그인창을 넘기고 바로 창을 표시하는 현상 존재
  //로그인 정보를 받을때에 맞는 헤더를 호출하는 형식으로 해결 가능할 것으로 보임.
  const scrollAmount = 100; // 스크롤 양을 조정할 수 있습니다.

  useEffect(() => {
    // URL 경로에 따른 스크롤 위치 설정
    switch (location.pathname) {
      case '/userdiet':
        if (scrollPosition == 600){
          setScrollPosition(600)
        }
        else{
        setScrollPosition(200); // 원하는 위치로 설정
        }
        break;
      case '/usercalender':
        setScrollPosition(300);
        break;
      case '/userexercise':
        setScrollPosition(400);
        break;
      case '/userprofile':
        setScrollPosition(500);
        break;
    //   default:
    //     setScrollPosition(400);
    //     break;
    }
  }, [location.pathname]);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(prev => prev - scrollAmount);
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(prev => prev + scrollAmount);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      // console.log('스크롤포스', scrollPosition)
      // console.log('스크롤레프트',scrollContainerRef.current.scrollLeft)
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
      if (scrollPosition <= 190) {
        navigate('/userprofile')
        scrollContainerRef.current.scrollLeft = 600;
        setScrollPosition(500);
        navigate('/userpofile')
      }
      else if (scrollPosition >= 700) {
        scrollContainerRef.current.scrollLeft = 140;
        setScrollPosition(300);
        navigate('/usercalender')
      }
      else if (scrollPosition == 200 || scrollPosition ==600){
        navigate('/userdiet')
      }
      else if (scrollPosition == 300){
        navigate('/usercalender')
      }
      else if (scrollPosition == 400){
        navigate('/userexercise')
      }
      else if (scrollPosition == 500){
        navigate('/userprofile')
      }
    }
  }, [scrollPosition]);

  return (
    <div>
      <div className='absolute h-[35px] w-[120px] bg-white z-10 top-0 left-0 right-0 bottom-0 m-auto rounded-full'></div>
      <div className='absolute h-[35px] w-[320px] justify-between flex top-0 left-0 right-0 bottom-0 m-auto items-center'>
        <div className='z-40 cursor-pointer' onClick={handleScrollLeft}>
          <img src={Arrow} alt="왼쪽화살표" className='w-[26px] h-[36px] -scale-x-100' />
        </div>
        <div className='z-40 cursor-pointer' onClick={handleScrollRight}>
          <img src={Arrow} alt="오른쪽화살표" className='w-[26px] h-[36px]' />
        </div>
      </div>
      <div
        className="relative w-[330px] flex gap-5 snap-x snap-mandatory overflow-x-auto bg-yellow-400 h-[40px] rounded-full top-0 left-0 right-0 bottom-0 m-auto justify-items-center items-center"
        ref={scrollContainerRef}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // For Firefox and IE/Edge
      >
        {initialItems.map((item, index) => (
          <div key={index} className="z-20 snap-center shrink-0 first:pl-8 last:pr-8">
            <div className={`w-24 flex justify-center items-center text-[20px] font-bold ${location.pathname === item.path ? 'text-yellow-400' : 'text-white'}`}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerUserDetailHeader;
