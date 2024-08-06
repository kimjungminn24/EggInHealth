import React, { useState, useEffect } from "react";
import { GetMembers } from "../../../api/Calender";

const RenderDaysForTrainer = ({ year, month }) => {
    const today = new Date();
    const [selectedDay, setSelectedDay] = useState(null);
    const [ memDate, setMemDate] = useState([])

    // 날짜관련 코드
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const daysInMonth = getDaysInMonth(today.getFullYear(), today.getMonth());
    //날짜받아서 하이라이트하는 버튼
    const handleChangeDate = (dayCount) => {
        setSelectedDay(dayCount);
        console.log(dayCount);
        return dayCount;
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const promise = []

                promise.push(GetMembers(year,month))

                const results = await Promise.all(promise)
                const memberMap = {}
                results.forEach((result, index)=>{
                    memberMap[index+1]=result
                })
            }
            catch(error){
                console.log('에러',year,month)
            }
        }
    })

    const days = [];
    let dayCount = 1;

    for (let week = 0; week < 6; week++) {
        const weekDays = [];
        for (let day = 0; day < 7; day++) {
            if ((week === 0 && day < firstDayOfMonth) || dayCount > daysInMonth) {
                weekDays.push(
                    <div key={`${week}-${day}`} className="flex-1 flex flex-col items-center justify-center h-[33px] mt-[4px]">
                        <p className="text-sm font-medium text-gray-800"></p>
                    </div>
                );
            } else {
                const formatdayCount = dayCount < 10 ? `0${dayCount}` : dayCount;
                weekDays.push(
                    <button
                        onClick={() => handleChangeDate(formatdayCount)}
                        key={`${week}-${day}`}
                        className={`flex-1 flex flex-col items-center justify-center h-[33px] mt-[4px] ${
                            selectedDay === formatdayCount ? 'bg-blue-200' : ''
                        }`}
                    >
                        <p className="text-sm font-bold text-gray-800">{formatdayCount}</p>
                        <div className='flex flex-row gap-1 w-full'>
                        </div>
                    </button>
                );
                dayCount++;
            }
        }
        days.push(
            <div key={week} className="flex items-center justify-start w-full">
                {weekDays}
            </div>
        );
    }

    return days;
};

export default RenderDaysForTrainer;
