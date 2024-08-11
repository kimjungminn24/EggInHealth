import React, { useEffect, useState } from "react";
import { DietSectionContainer, DietImage } from "../../common/StyledComponents";

const DietSection = ({ dietData, selectedTab, selectedDate, setHasImages, setFilteredData }) => {
  const [filtered, setFiltered] = useState([]);

  const extractDate = (dateTimeString) => {
    return dateTimeString.split("T")[0];
  };

  useEffect(() => {
    if (dietData) {
      const filteredData = dietData.filter(
        (item) => extractDate(item.date) === selectedDate && item.type === selectedTab
      );
      setFiltered(filteredData); // 필터링된 데이터를 설정
      setFilteredData(filteredData); // 필터링된 데이터를 부모 컴포넌트로 전달
      setHasImages(filteredData.length > 0); // 이미지 유무 설정
    }
  }, [dietData, selectedTab, selectedDate, setFilteredData, setHasImages]);

  return (
    <DietSectionContainer>
      {filtered.map((item) => (
        <DietImage key={item.id} src={item.imgurl} alt={item.type} />
      ))}
    </DietSectionContainer>
  );
};

export default DietSection;
