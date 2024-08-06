import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useStore } from "../../store/store.js";
import RenderDaysForTrainer from "../../components/trainer/Calender/RenderDaysForTrainer.jsx";
import SheduleLogo from '../../assets/static/Property_Schedule.png'
import BtnRegister from "../../components/trainer/BtnRegister.jsx";

const TrainerMain = () => {
  const [cookies] = useCookies(['cookie_name']);
  const { userUpdate } = useStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [mouseStartY, setMouseStartY] = useState(null);

  useEffect(() => {
    const userId = cookies.Id;
    const userType = cookies.Role;
    userUpdate(userId, userType);
  }, [cookies.Id, cookies.Role, userUpdate]);

  const today = new Date();
  const formatMonth = `${today.getMonth() + 1}`;
  const formatMonthforAPI = formatMonth < 10 ? `0${formatMonth}` : formatMonth;
  const formatYear = `${today.getFullYear()}`;

  const handleMouseDown = (e) => {
    setMouseStartY(e.clientY);
  };

  const handleMouseUp = (e) => {
    if (mouseStartY !== null) {
      const mouseEndY = e.clientY;
      if (mouseStartY - mouseEndY > 50) { // Upward drag
        setIsExpanded(true);
      }
      if (mouseStartY - mouseEndY < -50) { // Downward drag
        setIsExpanded(false);
      }
      setMouseStartY(null);
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`transition-all duration-500 ease-in-out ${isExpanded ? 'h-screen' : 'h-auto'} overflow-hidden`}
    >
      <div className={`transition-transform duration-500 ease-in-out ${isExpanded ? 'scale-105' : 'scale-100'}`}>
        <div className="w-[313px] h-[286px] bg-white rounded-[20px] mt-[26px] m-auto overflow-hidden">
          <p className="w-full m-auto text-left py-[6px] pl-[16px]">
            <span className="text-[32px]">{formatMonth}월 </span>
          </p>
          <div className="inline-flex flex-col items-center justify-start h-full w-full">
            <div className="flex flex-row items-center justify-start w-full text-center">
              <p className="h-full text-[10px] font-medium text-gray-400 w-full">일</p>
              <p className="h-full text-[10px] font-medium text-gray-400 w-full">월</p>
              <p className="h-full text-[10px] font-medium text-gray-400 w-full">화</p>
              <p className="h-full text-[10px] font-medium text-gray-400 w-full">수</p>
              <p className="h-full text-[10px] font-medium text-gray-400 w-full">목</p>
              <p className="h-full text-[10px] font-medium text-gray-400 w-full">금</p>
              <p className="h-full text-[10px] font-medium text-gray-400 w-full">토</p>
            </div>
            <div className="flex flex-col items-start justify-start w-full">
              <RenderDaysForTrainer id={1} year={2024} month={8} />
            </div>
          </div>
        </div>
      </div>
      {!isExpanded && (
        <>
          <div className="flex item-center justify-center mt-[26px]">
            <img src={SheduleLogo} alt="" />
          </div>
          <div className="flex item-center justify-center mt-[50px]">
            <BtnRegister />
          </div>
        </>
      )}
    </div>
  );
};

export default TrainerMain;
