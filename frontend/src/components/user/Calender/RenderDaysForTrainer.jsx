import React, { useEffect, useState } from "react";
// import { CheckFood } from "../../../api/Calender";
// import { CheckExer } from "../../../api/Calender";
// import { GetExerDate } from "../../../api/Calender";
// import FoodOn from '../../../assets/static/img_FoodOn.png';
// import ExerOn from '../../../assets/static/img_ExerOn.png'


const RenderDaysForTrainer = ({ id, year, month }) => {
    // const [foodData, setFoodData] = useState({});
    // const [exerData, setExerData] = useState({});
    // const [exerDate, setExerDate] = useState({})
    const today = new Date();

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const daysInMonth = getDaysInMonth(today.getFullYear(), today.getMonth());

    // useEffect(() => {
    //     const fetchData = async () => {
    //     try {
    //         const promises = [];
    //         const Exerpromises = []; // 운동배열
    //         const Datepromises = []; // 운동날짜배열

    //         for (let day = 1; day <= daysInMonth; day++) {
    //         const formatDayForAPI = day < 10 ? `0${day}` : day;
    //         promises.push(CheckFood(id, year, month, formatDayForAPI));
    //         Exerpromises.push(CheckExer(id, year, month, formatDayForAPI));
    //         }
    //         Datepromises.push(GetExerDate(id,year,month))

    //         const results = await Promise.all(promises);
    //         const Exerresults = await Promise.all(Exerpromises);
    //         const Dateresults = await Promise.all(Datepromises)
    //         const foodDataMap = {};
    //         const ExerDataMap = {};
    //         const DateMap = {};
    //         results.forEach((result, index) => {
    //         foodDataMap[index + 1] = result;
    //         });
    //         Exerresults.forEach((result, index) => {
    //         ExerDataMap[index + 1] = result;
    //         });
    //         Dateresults[0].forEach((result) => {
    //             const date = new Date(result.date);
    //             const day = date.getDate();
    //             DateMap[day] = result;
    //         });
            
    //         setFoodData(foodDataMap);
    //         setExerData(ExerDataMap);
    //         setExerDate(DateMap);
    //     } catch (error) {
    //         console.log('에러:', id, year, month);
    //     }
    //     };

    //     fetchData();
    // }, [id, year, month]);

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
        // const foodForTheDay = foodData[dayCount];
        // const ExerForTheDay = exerData[dayCount]
        // const ExerDateForTheDay = exerDate[dayCount];
        const formatdayCount = dayCount <10 ? `0${dayCount}`: dayCount
        weekDays.push(
        <div key={`${week}-${day}`} className="flex-1 flex flex-col items-center justify-center h-[33px] mt-[4px]">
            <p className="text-sm font-bold text-gray-800">{formatdayCount}</p>
            <div className='flex flex-row gap-1 w-full'>
            </div>
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

export default RenderDaysForTrainer;
