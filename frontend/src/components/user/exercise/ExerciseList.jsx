import React, { useState } from "react";
import AddExerciseModal from "../../trainer/ModalAddUserExercise";
import { DataTable } from "../../common/DataTable";
import { AddButton } from "../../common/StyledComponents";
import styled from "styled-components";
import ActionModal from "./ModalUpdateEx";


const StyledTd = styled.td`
  padding: 15px;
  text-align: center;
  border: 1px solid #ddd; /* 데이터 셀 테두리 */
  background-color: #f9f9f9; /* 데이터 셀 배경 색상 */
`;

const Box = styled.div`
  width: 320px;
  height: auto; 
  background-color: white;
  border-radius: 15px;
  padding: 10px 20px; /* 내부 여백 추가 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 10px 0px;
`;

const StyledTr = styled.div`
  display: flex;
  justify-content: space-between; /* 양 끝에 요소 배치 */
  align-items: center; /* 수직 중앙 정렬 */
  padding: 10px 0; /* 위아래 여백 */
  border-bottom: 1px solid #eee; /* 하단 경계선 */
  cursor: pointer;  
  
  &:last-child {
    border-bottom: none; /* 마지막 항목의 경계선 제거 */
  }

  /* 텍스트 스타일 */
  span {
    font-size: 16px; /* 글자 크기 조정 */
    color: #333; /* 텍스트 색상 */
  }

  .minute {
    font-weight: bold; /* MINUTE 강조 */
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  margin-right: 10px; /* 위쪽 여백 추가 */
`

const ExerciseList = ({ selectedDate, exData, userLoginData, userData }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null); 

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openActionModal = (exercise) => {
    setSelectedExercise(exercise);
    setIsActionModalOpen(true);
  };
  const closeActionModal = () => setIsActionModalOpen(false);

  const handleEdit = () => {
    console.log("수정:", selectedExercise);
    closeActionModal();
  };

  const handleDelete = () => {
    console.log("삭제:", selectedExercise);
    closeActionModal();
  };


  const headers = [
    {
      text: "NAME",
      value: "name",
    },
    {
      text: "SET",
      value: "set",
    },
    {
      text: "REP",
      value: "ref",
    },
    {
      text: "WEIGHT",
      value: "weight",
    },
  ];

  const timeHeaders = [
    {
      text: "",
      value: "name",
    },
    {
      text: "MINUATE",
      value: "time",
    },
  ];

  const today = new Date().toISOString().split("T")[0];

  const getKoreanISOString = () => {
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
    const kstDate = new Date(now.getTime() + kstOffset);

    return kstDate.toISOString();
  };

  return (
    <div>
      {selectedDate && exData ? (
        <div>
          {exData.sets
            ?.filter((set) => set.time > 0)
            .map((set, index) => (
              <Box key={index}>
                <StyledTr onClick={() => openActionModal(set)}>
                  <span>{set.name}</span>
                  <span className="minute">MINUTE</span>
                  <span>{set.time}</span>
                </StyledTr>
              </Box>
            ))}
          <DataTable headers={headers}>
            {exData.sets
              ?.filter((set) => set.set > 0)
              .map((set, index) => (
                <Box key={index}>
                  <StyledTr onClick={() => openActionModal(set)}>
                    <span>{set.name}</span>
                    <span>{set.set}</span>
                    <span>{set.ref}</span>
                    <span>{set.weight}</span>
                  </StyledTr>
                </Box>
              ))}
          </DataTable>
        </div>
      ) : (
        <p>운동 목록이 없습니다.</p>
      )}

      <ButtonContainer>
        {selectedDate >= today && userLoginData.type === "TRAINER" ? (
          <AddButton onClick={openAddModal}>+</AddButton>
        ) : null}
        
        <AddExerciseModal
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          selectedDate={selectedDate}
          userData={userData}
          exData={exData}
        />
        
        <ActionModal
          isOpen={isActionModalOpen}
          onClose={closeActionModal}
          onEdit={handleEdit}
          onDelete={handleDelete}
          exData={exData}
        />
      </ButtonContainer>
    </div>
  );
};

export default ExerciseList;