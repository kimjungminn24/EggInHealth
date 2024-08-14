import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EggSelector from './EggSelector';
import SurveyPage1 from '../components/user/survey/UserSurvey1';
import SurveyPage2 from '../components/user/survey/UserSurvey2';
import SurveyPage3 from '../components/user/survey/UserSurvey3';
import SurveyPage4 from '../components/user/survey/UserSurvey4';
import { updateUserRole, updateUserGole, updateUserInfo } from '../api/survey';
import { useStore,useUserInfoStore } from '../store/store';  

const Select = () => {
  const { userType } = useStore((state) => state);
  const [currentStep, setCurrentStep] = useState(userType === 'MEMBER' ? 1 : 0);
  const [activeImage, setActiveImage] = useState(userType || null);
  const [exerciseCommonId, setexerciseCommonId] = useState(null);
  const [dietCommonId, setdietCommonId] = useState(null);
  const [goalCommonId, setgoalCommonId] = useState(null);
  const [height, setHeight] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const totalSteps = 5;
  const navigate = useNavigate();
  const { setUserType } = useStore(); 
  const { setUserType: setUserInfoType } = useUserInfoStore();

  
  useEffect(() => {
      setUserType(null); 
      setUserInfoType(null); 
  }, [setUserType, setUserInfoType]); 

  useEffect(() => {
    if (userType) {
      setActiveImage(userType);
    }
  }, [userType]);

  const handleNext = async () => {
    if (currentStep === 0) {
      try {
        if (activeImage) {
          await updateUserRole(activeImage);
        }
        
        if (activeImage === 'TRAINER') {
          navigate('/trainermain');
        } else if (activeImage === 'MEMBER') {
          setCurrentStep(1);
        }
      } catch (error) {
        console.error("Failed to update user role:", error);
      }
    } else if (currentStep === 4) {
      await updateUserGole(exerciseCommonId, dietCommonId, goalCommonId);
      await updateUserInfo(height, age,gender);
      navigate('/usermain');
    } else if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleTrainerImageClick = () => {
    if (activeImage !== 'TRAINER') {
      setActiveImage('TRAINER');
    }
  };

  const handleUserImageClick = () => {
    if (activeImage !== 'MEMBER') {
      setActiveImage('MEMBER');
    }
  };

  const renderCurrentPage = () => {
    switch (currentStep) {
      case 0:
        return (
          <EggSelector 
            activeImage={activeImage} 
            onTrainerClick={handleTrainerImageClick}
            onUserClick={handleUserImageClick}
          />
        );  
      case 1:
        return <SurveyPage1 setexerciseCommonId={setexerciseCommonId} />
      case 2:
        return <SurveyPage2 setdietCommonId={setdietCommonId}/>;
      case 3:
        return <SurveyPage3 setgoalCommonId={setgoalCommonId}/>;
      case 4:
        return <SurveyPage4 setHeight={setHeight} setAge={setAge} setGender={setGender} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <ProgressContainer>
        <ArrowLeft onClick={handlePrev} disabled={currentStep === 0} />
        <ProgressBarContainer>
          <ProgressBar>
            <ProgressFill 
              $currentStep={currentStep} 
              $totalSteps={totalSteps} 
            />
          </ProgressBar>
        </ProgressBarContainer>
      </ProgressContainer>
      <ContentContainer>
        {renderCurrentPage()}
      </ContentContainer>
      <YellowBtn 
        onClick={handleNext} 
        disabled={currentStep === 0 && activeImage === null} 
      >
        다음
      </YellowBtn>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 30px;
  width: 100%;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  margin-right: 30px;
  width: 100%;
  position: relative;
`;

const ProgressBar = styled.div`
  background-color: #e0e0e0;
  border-radius: 5px;
  height: 10px;
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  background-color: #FFD66B;
  height: 100%;
  width: ${({ $currentStep, $totalSteps }) => {
    if ($totalSteps <= 0) return '0%';
    const percentage = (($currentStep + 1) / $totalSteps) * 100;
    return `${Math.min(percentage, 100)}%`; 
  }};
  transition: width 0.4s ease;
  position: absolute;
  left: 0;
`;

const ArrowLeft = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 10px;
  margin-left: 10px;
  &::before {
    content: '⬅'; 
    font-size: 20px;
    color: ${props => props.disabled ? '#e0e0e0' : '#FFD66B'};
  }
`;

const YellowBtn = styled.button`
  align-items: center;
  background-color: #FFD66B;
  border-radius: 20px;
  display: flex;
  width: 232px;
  height: 64px;
  justify-content: center;
  padding: 8px 16px;
  margin-top: 20px;
  color: white;
`;

const ContentContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Select;
