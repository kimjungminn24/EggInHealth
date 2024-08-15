import React, { useEffect, useState } from "react";
import { CheckFood } from "../../../api/Calender";
import { CheckExer } from "../../../api/Calender";
import { GetExerDate } from "../../../api/Calender";
import FoodOn from '../../../assets/static/img_FoodOn.png';
import ExerOn from '../../../assets/static/img_ExerOn.png'


const RenderDays = ({ id, year, month }) => {
    const [foodData, setFoodData] = useState({});
    const [exerData, setExerData] = useState({});
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
            const promises = [];
            const Exerpromises = []; // 운동배열
            const Datepromises = []; // 운동날짜배열

            for (let day = 1; day <= daysInMonth; day++) {
            const formatDayForAPI = day < 10 ? `0${day}` : day;
            promises.push(CheckFood(id, year, month, formatDayForAPI));
            Exerpromises.push(CheckExer(id, year, month, formatDayForAPI));
            }
            Datepromises.push(GetExerDate(id,year,month))

            const results = await Promise.all(promises);
            const Exerresults = await Promise.all(Exerpromises);
            const Dateresults = await Promise.all(Datepromises)
            const foodDataMap = {};
            const ExerDataMap = {};
            const DateMap = {};
            results.forEach((result, index) => {
            foodDataMap[index + 1] = result;
            });
            Exerresults.forEach((result, index) => {
            ExerDataMap[index + 1] = result.report;
            });

            for (let i = 0; i < Dateresults[0].length; i++) {
                const startTimeString = Dateresults[0][i].startTime; // 문자열로 가져옴
                const date = new Date(startTimeString); // 문자열을 Date 객체로 변환
                const DateDay = date.getDate(); // 일자 추출
                const DateHour = date.getHours(); // 시간 추출
                const DateMin = date.getMinutes(); // 분 추출
                const formatDate = `${DateHour.toString().padStart(2, '0')}:${DateMin.toString().padStart(2, '0')}`; // 포맷된 시간 문자열

                // DateMap[DateDay]가 이미 존재하는지 확인
                if (DateMap[DateDay]) {
                    // 값이 이미 있으면 배열에 추가
                    DateMap[DateDay].push(formatDate);
                } else {
                    // 값이 없으면 새 배열을 만들어서 추가
                    DateMap[DateDay] = [formatDate];
                }
            }


            
            setFoodData(foodDataMap);
            setExerData(ExerDataMap);
            setExerDate(DateMap);
        } catch (error) {
            console.log('에러:', id, year, month);
        }
        };

        fetchData();
    }, [id, year, month]);

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
        const foodForTheDay = foodData[dayCount];
        const ExerForTheDay = exerData[dayCount]
        const ExerDateForTheDay = exerDate[dayCount];
        weekDays.push(
        <div key={`${week}-${day}`} className="flex-1 flex flex-col items-start justify-start border border-gray-200 h-[111px]">
            <p className="text-sm font-medium text-gray-800">{dayCount}</p>
            <div className='flex flex-row gap-1 w-[18px]'>
                {foodForTheDay && foodForTheDay.length > 0 ? <img src={FoodOn} alt="Food" />:'' }
                {ExerForTheDay && ExerForTheDay !== null ? <img src={ExerOn} alt="Exer" />:'' }
            </div>
            {ExerDateForTheDay && ExerDateForTheDay.length > 0 ? (
                    <div className="w-full">
                        {ExerDateForTheDay.map((time, idx) => (
                            <div key={idx} className="w-full h-[19px] bg-yellow-400 text-center pt-[1px] rounded-[3px] mb-[2px]">
                                <div className='font-bold text-white text-[10px]'>
                                    {time}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <div></div>}
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

export default RenderDays;
