import { useEffect, useState } from "react";

export const ExerciseImg = ({ exData, selectedDate, setHasImages }) => {
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (exData && exData.date) { // exData와 exData.date가 모두 존재하는지 확인
     
      const isDateMatch = exData.date?.split("T")[0] === selectedDate;

      if (isDateMatch) {
        setFilteredData(exData);
        console.log(exData.report.imgUrl);
        setHasImages(exData.report.imgUrl ? true : false);
      } else {
        setFilteredData(null);
        setHasImages(false);
      }
    } else {
      setFilteredData(null);
      setHasImages(false);
    }
  }, [exData, selectedDate, setHasImages]);

  return (
    <img src={filteredData ? filteredData.report.imgUrl : ""} alt="" />
  );
};
