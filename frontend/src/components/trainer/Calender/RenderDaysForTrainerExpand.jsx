import React, { useEffect, useState } from "react";
import { checkPtPlan } from "../../../api/trainer";

const RenderDaysForTrainerExpand = ({ year, month,userId }) => {
    const [exerDate, setExerDate] = useState({})
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
    const today =new Date(now.getTime()+ kstOffset);

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const daysInMonth = getDaysInMonth(today.getFullYear(), today.getMonth());

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const Datepromises = []; // 운동날짜배열
    
                for (let day = 1; day <= daysInMonth; day++) {
                    Datepromises.push(checkPtPlan(year, month, day,userId));
                }
    
                const Dateresults = await Promise.all(Datepromises);
    
                const updatedExerDate = []; // 상태를 직접 변경하지 않고 복사본을 생성하여 작업
    
                Dateresults.forEach((result, index) => {
                    if (result) { // result가 유효한지 확인
                        updatedExerDate[index+1] = result.map(item=>item.startTime); // 배열의 올바른 인덱스에 데이터 할당
                    }
                });
                setExerDate(updatedExerDate); // 최종 업데이트된 배열로 상태 갱신
            } catch (error) {
                console.log('에러:', error);
            }
        };
    
        fetchData();
    }, [year, month, daysInMonth]);
    
    const days = [];
    let dayCount =1;

    
    for (let week = 0; week < 6; week++) {
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
    if ((week === 0 && day < firstDayOfMonth) || dayCount > daysInMonth) {
        weekDays.push(
        <div key={`${week}-${day}`} className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
            <p className="text-sm font-medium text-gray-800"></p>
        </div>
        );
    } else {
        const ExerDateForTheDay = exerDate[dayCount];
        weekDays.push(
        <div key={`${week}-${day}`} className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
            <p className="text-sm font-medium text-gray-800">{dayCount}</p>
            {ExerDateForTheDay && ExerDateForTheDay.length > 0 ? (
    <div className="w-full">
        {ExerDateForTheDay.slice(0, 3).map((item, idx) => {
    const date = new Date(item); // item을 Date 객체로 변환
    const hours = date.getHours(); // 시간 추출
    const minutes = date.getMinutes(); // 분 추출
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return (
        <div key={idx} className="h-[19px] bg-yellow-400 text-center pt-[1px] rounded-[3px] mb-[2px]">
            <div className='font-bold text-white text-[10px] mt-[1px]'>
                {formattedTime}
            </div>
        </div>
    );
})}
    </div>
) : (
    <div></div>
)}
        </div>
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

export default RenderDaysForTrainerExpand;
