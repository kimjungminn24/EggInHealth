import React, { useEffect, useState } from "react";
import { GetExerDate } from "../../../api/Calender";

const RenderDaysForTrainerExpand = ({ year, month }) => {
    const [exerDate, setExerDate] = useState({})
    const today = new Date();

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
            Datepromises.push(GetExerDate(year,month))

            const Dateresults = await Promise.all(Datepromises)
            const DateMap = {};
            Dateresults[0].forEach((result) => {
                const date = new Date(result.date);
                const day = date.getDate();
                DateMap[day] = result;
            });
            
            setExerDate(DateMap);
            }
        } catch (error) {
            console.log('에러:', year, month);
        }
        };

        fetchData();
    }, [year, month]);

    const days = [];
    let dayCount = 1;

    
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
            {/* 임시데이터 수정필요 */}
            {/* 데이터 렌더링 조건 반전되어 있음. 데이터 내부의 시간이 아닌 내가 지정한 값으로만 렌더링 되게 되어있음 */}
            {ExerDateForTheDay ? <div>운동 날짜</div> : <div className="w-full h-[19px] bg-yellow-400 text-center pt-[1px] rounded-[3px]">
                <div className='font-bold text-white text-[10px]'>
                    08:00
                    </div>
                    </div>}
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
