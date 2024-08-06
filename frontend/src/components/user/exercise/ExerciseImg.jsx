import { useEffect, useState } from "react";

export const ExerciseImg = ({ exData, selectedDate, setHasImages }) => {
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (exData && exData.date) { // exData와 exData.date가 모두 존재하는지 확인
      console.log("exData:", exData);
      console.log("selectedDate:", selectedDate);

      const isDateMatch = exData.date.split("T")[0] === selectedDate;
      console.log("isDateMatch:", isDateMatch);
      console.log("exData.date:", exData.date);

      if (isDateMatch) {
        setFilteredData(exData);
        setHasImages(exData.reportImgUrl ? true : false);
        console.log("Filtered Data:", exData);
      } else {
        setFilteredData(null);
        setHasImages(false);
        console.log("No match, filteredData set to null");
      }
    } else {
      console.log("exData or exData.date is undefined");
      setFilteredData(null);
      setHasImages(false);
    }
  }, [exData, selectedDate, setHasImages]);

  return (
    <img src={filteredData ? filteredData.reportImgUrl : ""} alt="운동인증" />
  );
};
