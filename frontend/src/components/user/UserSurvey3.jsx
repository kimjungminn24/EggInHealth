import React from 'react';
import ButtonSurvey from '../common/ButtonSurvey';
import oneIcon from "../../assets/one.png"
import twoIcon from "../../assets/two.png"
import threeIcon from "../../assets/three.png"


const SurveyPage3 = () => {
  let survey = [
    {logo:oneIcon,title:'상',content:'엄격한 식단관리'},
    {logo:twoIcon,title:'중',content:'적당한 식단관리'},
    {logo:threeIcon,title:'하',content:'식단관리를 하지않음'},]
  return (
   <div>
    <h1>식단관리는 어느정도가 좋을까요 ?</h1>
    {survey.map(function(i,idx){
      return(
        <ButtonSurvey lst={i}/>
      )
    }
    )}
  </div>
  );
};


export default SurveyPage3;
