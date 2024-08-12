import React, { useEffect, useState } from "react";
import { useStore, useUserInfoStore } from "../../store/store.js";
import {styled} from "styled-components";
import RenderDaysForTrainer from "../../components/trainer/Calender/RenderDaysForTrainer.jsx";
import SheduleLogo from '../../assets/static/Property_Schedule.png'
import BtnRegister from "../../components/trainer/BtnRegister.jsx";
import BtnAddSchedule from "../../components/trainer/BtnAddSchedule.jsx";
import RenderDaysForTrainerExpand from "../../components/trainer/Calender/RenderDaysForTrainerExpand.jsx";
import BoxSchedule from '../../components/trainer/BoxSchedule.jsx'
import { ModalEditSchedule } from "../../components/trainer/ModalEditSchedule.jsx";
import plusbutton from '../../assets/plusbutton.png';
import { ModalAddSchedule } from "../../components/trainer/ModalAddSchedule.jsx";
import { checkMemberList,checkPtPlan } from "../../api/trainer.js";

const userSchedule = {
  "id":1,
  "memberId": 1,
  "startTime": "2024-08-12T12:00:00.000Z",
  "endTime": "2024-08-12T12:00:00.000Z",
  "createdAt": "2024-08-12T12:00:00.000Z",
  "name":"강동형",
  "ptCnt":"0",
  "imgUrl":'',
}
const plusBtn = styled.img`
  width: 40px;
`
const TrainerMain = () => {
  const { userUpdate } = useStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [mouseStartY, setMouseStartY] = useState(null);
  const [selectedMemDate, setSelectedMemDate] = useState(null);
  const [isOpen,setIsOpen] = useState(false);
  const [isAddOpen,setisAddOpen] = useState(false);
  const [isMemListEmpty, setIsMemListEmpty] = useState(false);
  const { userData, fetchData } = useUserInfoStore()
  const trainer = userData?.trId;
  const userId =  useStore((state)=>state.userId)

  useEffect(() => {
    const today = new Date();
    const formatMonth = `${today.getMonth() + 1}`;
    const formatYear = `${today.getFullYear()}`;
    userUpdate();
    
    fetchData(userId, formatMonth, formatYear);

    if (trainer) {
      userSchedule(userId)
        .then(response => {
          
          const convertedTimebox = response.map(schedule => {
          
            const date = new Date(schedule.date);
            const formattedDate = `${date.getMonth() + 1}.${date.getDate()}(${['일', '월', '화', '수', '목', '금', '토'][date.getDay()]})`;
            const formattedTime = `AM ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} - ${date.getHours() + 1}:${String(date.getMinutes()).padStart(2, '0')}`;
            return { day: formattedDate, time: formattedTime };
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [fetchData,trainer, userUpdate,userId]);

  const today = new Date();
  const formatMonth = `${today.getMonth() + 1}`;
  const formatMonthforAPI = formatMonth < 10 ? `0${formatMonth}` : formatMonth;
  const formatYear = `${today.getFullYear()}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberList = await checkMemberList(today.getFullYear(), today.getMonth(), today.getDate());

        // 멤버 리스트가 비어있는지 확인
        if (memberList && memberList.length > 0) {
          setIsMemListEmpty(false);
        } else {
          setIsMemListEmpty(true);
        }
      } catch (error) {
        console.error('Error fetching member list:', error);
        setIsMemListEmpty(true); // 에러가 발생한 경우에도 비어있다고 간주
      }
    };

    fetchData();
  }, []);

  const handleMouseDown = (e) => {
    setMouseStartY(e.clientY);
  };

  const handleTouchStart = (e) => {
    setMouseStartY(e.touches[0].clientY);
  };

  const handleMouseUp = (e) => {
    if (mouseStartY !== null) {
      const mouseEndY = e.clientY;
      if (mouseStartY - mouseEndY > 50) { // Upward drag
        setIsExpanded(false);
      }
      if (mouseStartY - mouseEndY < -50) { // Downward drag
        setIsExpanded(true);
      }
      setMouseStartY(null);
    }
  };

  const handleTouchEnd = (e) => {
    if (mouseStartY !== null) {
      const mouseEndY = e.changedTouches[0].clientY;
      if (mouseStartY - mouseEndY > 50) { // Upward drag
        setIsExpanded(false);
      }
      if (mouseStartY - mouseEndY < -50) { // Downward drag
        setIsExpanded(true);
      }
      setMouseStartY(null);
    }
  };

  const handleDateChange = (memDateForTheDay) => {
    setSelectedMemDate(memDateForTheDay);
  };

  const openModal = () => {
    console.log(1);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const openAddModal = () => {
    setisAddOpen(true);
  };

  const closeAddModal = () => {
    setisAddOpen(false);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'h-[650px]' : 'h-[300px]'}`}>
        <div className="w-[313px] h-full bg-white rounded-[20px] mt-[26px] m-auto overflow-hidden"> 
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
              {isExpanded ? <RenderDaysForTrainerExpand year={formatYear} month={formatMonthforAPI} /> :
              <RenderDaysForTrainer year={formatYear} month={formatMonthforAPI} onDateChange={handleDateChange}/> }
            </div>
          </div>
        </div>
      </div>
      {!isExpanded && (
        <>
          <div className="flex items-center justify-center mt-5">
            <div className="">
              <img src={SheduleLogo} alt="Schedule Logo" />
            </div>
            <div className="absolute ml-[250px]">
              <img src={plusbutton} alt="Add Button" onClick={openAddModal} className="cursor-pointer" />
            </div>
            <ModalAddSchedule isOpen={isAddOpen} onRequestClose={closeAddModal} />
          </div>
          <div className="flex item-center justify-center mt-[20px]">
          {
            isMemListEmpty ? (
              <BtnRegister />
            ) : (
              selectedMemDate !== null && selectedMemDate.length !== 0 &&Array.isArray(selectedMemDate) ? (
                selectedMemDate.map((schedule, index) => (
                  <BoxSchedule key={index} onClick={openModal} userSchedule={schedule} />
                ))
              ) : (
                <BtnAddSchedule />
              )
            )
          }
          </div>
          <ModalEditSchedule isOpen={isOpen} onRequestClose={closeModal} user={userSchedule} />{/* 회원이 있을때 나오는 박스 분기처리와 for문을 돌려서 프롭스로 내려서 처리 요망 */}
        </>
      )}
    </div>
  );
};

export default TrainerMain;
