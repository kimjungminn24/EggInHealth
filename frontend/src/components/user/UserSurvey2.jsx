import React from 'react';
import ButtonSurvey from '../common/ButtonSurvey';
import oneIcon from "../../assets/one.png"
import twoIcon from "../../assets/two.png"
import threeIcon from "../../assets/three.png"


const SurveyPage2 = () => {
  let survey = [
    {logo:oneIcon,title:'상',content:'체중 감량에 집중'},
    {logo:twoIcon,title:'중',content:'땀을 흘릴정도'},
    {logo:threeIcon,title:'하',content:'가벼운 운동'},]
  return (
   <div>
    <h1>운동 강도는 어느정도가 좋을까요 ?</h1>
    {survey.map(function(lst,idx){
      return(
        <ButtonSurvey lst={lst} idx={idx}/>
      )
    }
    )}
  </div>
  );
};


export default SurveyPage2;
