import React, { useEffect, useState } from "react";
import { DietSectionContainer, DietImage } from "../../common/StyledComponents";

const DietSection = ({ dietData, selectedTab, selectedDate, setHasImages }) => {
  const [filteredData, setFilteredData] = useState([]);

  const extractDate = (dateTimeString) => {
    return dateTimeString.split("T")[0];
  };

  useEffect(() => {
    if (dietData) {
      const filtered = dietData.filter(
        (item) => extractDate(item.date) === selectedDate && item.type === selectedTab
      );
      setFilteredData(filtered);
      setHasImages(filtered.length > 0); // 이미지 유무 설정
    }
  }, [dietData, selectedTab, selectedDate]);

  return (
    <DietSectionContainer>
      {filteredData.map((item) => (
        <DietImage key={item.id} src={item.imgurl} alt={item.type} />
      ))}
    </DietSectionContainer>
  );
};

export default DietSection;
