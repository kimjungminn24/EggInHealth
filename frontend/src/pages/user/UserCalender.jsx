import React ,{ useEffect, useState }from 'react';
import { useUserInfoStore, useStore,useTimeStore } from '../../store/store.js';
import RenderDays from '../../components/user/Calender/RenderDays.jsx';
import BoxUser from '../../components/trainer/BoxUser';


const UserCalender = () => {
  const userType = useStore(state => state.userType);
  const userId = useUserInfoStore(state => state.userData.id)
  const today = new Date();
  const formatMonth = `${today.getMonth() + 1}`;
  const formatMonthforAPI = formatMonth < 10 ? `0${formatMonth}` : formatMonth
  const formatYear = `${today.getFullYear()}`;
  const userData = useUserInfoStore((state) => state.userData);
  const {selectedDate,setSelectedDate } = useTimeStore()

  return (
    <div>
      {userType == 'TRAINER' ? <BoxUser userData={userData} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>: null}
      <div className="w-[313px] h-[620px] bg-white rounded-[20px] mt-[9px] m-auto overflow-hidden">
        <p className="w-full m-auto text-center py-[6px]">
          <span className="text-xl">{formatMonth} </span>
          <span className="text-sm">{formatYear}</span>
        </p>
        <hr />
        <div className="inline-flex flex-col items-center justify-start h-full w-full">
          <div className="flex flex-row items-center justify-start w-full text-center">
            <p className="h-full text-sm font-medium text-gray-800 w-full">Sun</p>
            <p className="h-full text-sm font-medium text-gray-800 w-full">Mon</p>
            <p className="h-full text-sm font-medium text-gray-800 w-full">Tue</p>
            <p className="h-full text-sm font-medium text-gray-800 w-full">Wed</p>
            <p className="h-full text-sm font-medium text-gray-800 w-full">Thu</p>
            <p className="h-full text-sm font-medium text-gray-800 w-full">Fri</p>
            <p className="h-full text-sm font-medium text-gray-800 w-full">Sat</p>
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <RenderDays id={userId} year={formatYear} month={formatMonthforAPI}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCalender;
