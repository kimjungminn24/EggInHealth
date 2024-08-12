import React, { useState } from "react";
import AddExerciseModal from "../../trainer/ModalAddUserExercise";
import { DataTable } from "../../common/DataTable";
import { AddButton } from "../../common/StyledComponents";

const ExerciseList = ({ selectedDate, exData, userLoginData,userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  console.log(userData)
  console.log(exData)

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
      text: "NAME",
      value: "name",
    },
    {
      text: "TIME",
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
      {selectedDate >= today && userLoginData.type === "TRAINER" ? (
        <AddButton onClick={openModal}>+</AddButton>
      ) : null}
      <AddExerciseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedDate={selectedDate}
        userData={userData}
      />

      {selectedDate && exData ? (
        <div>
          <DataTable headers={timeHeaders}>
            {exData.sets
              ?.filter((set) => set.time > 0)
              .map((set, index) => (
                <tr key={index}>
                  <td>{set.name}</td>
                  <td>{set.time}</td>
                </tr>
              ))}
          </DataTable>
          <DataTable headers={headers}>
            {exData.sets
              ?.filter((set) => set.set > 0)
              .map((set, index) => (
                <tr key={index}>
                  <td>{set.name}</td>
                  <td>{set.set}</td>
                  <td>{set.ref}</td>
                  <td>{set.weight}</td>
                </tr>
              ))}
          </DataTable>
        </div>
      ) : (
        <p>운동 목록이 없습니다.</p>
      )}
    </div>
  );
};

export default ExerciseList;
