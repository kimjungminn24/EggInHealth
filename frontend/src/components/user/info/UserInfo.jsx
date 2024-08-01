import React from "react";
import useStore from "../../../store/store_test";

const UserInfo = () => {
  const profile = useStore((state) => state.profile);
const goal = useStore((state)=>state.goal)
  return (
    <div>
      <p>이름: {profile.Name}</p>
      <p>전화번호: {profile.PhoneNumber}</p>
      <p>트레이너 ID: {profile.TrainerId}</p>
      <p>나이: {profile.Age}</p>
      <p>PT 횟수: {profile.PtCnt}</p>
      <p>타입: {profile.Type}</p>
    <p>운동 강도 : {goal.ExerciseCommonId}</p>
    <p>식단조절 : {goal.DietCommonId}</p>
    <p>목표 : {goal.CommonId}</p>
    </div>
  );
};

export default UserInfo;
