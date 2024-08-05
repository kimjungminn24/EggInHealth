import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useStore } from "../../store/store.js";
import RenderDaysForTrainer from "../../components/user/Calender/RenderDaysForTrainer.jsx";

const TrainerMain = () => {
  const [cookies] = useCookies(['cookie_name']);
  console.log(cookies);
  const { userUpdate } = useStore();

  useEffect(() => {
    const userId = cookies.Id;
    const userType = cookies.Role;
    console.log(cookies.Role, userType);
    userUpdate(userId, userType);
  }, [cookies.Id, cookies.Role, userUpdate]); // userUpdate를 의존성 배열에 추가

  const today = new Date();
  const formatMonth = `${today.getMonth() + 1}`;
  const formatMonthforAPI = formatMonth < 10 ? `0${formatMonth}` : formatMonth
  const formatYear = `${today.getFullYear()}`;

  return (
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
          <RenderDaysForTrainer id={1} year={2024} month={8}/>
        </div>
      </div>
    </div>
  );
};

export default TrainerMain;
