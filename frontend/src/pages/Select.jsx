import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EggSelector from './EggSelector';
import SurveyPage1 from '../components/user/UserSurvey1';
import SurveyPage2 from '../components/user/UserSurvey2';
import SurveyPage3 from '../components/user/UserSurvey3';
import SurveyPage4 from '../components/user/UserSurvey4';

const Select = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeImage, setActiveImage] = useState(null);
  const totalSteps = 5;
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep === 0) {
      if (activeImage === 'trainer') {
        navigate('/trainermain');
      } else if (activeImage === 'user') {
        setCurrentStep(1);
      }
    } else if (currentStep === 4) {
      navigate('/usermain');
    } else if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleTrainerImageClick = () => {
    if (activeImage !== 'trainer') {
      setActiveImage('trainer');
    }
  };

  const handleUserImageClick = () => {
    if (activeImage !== 'user') {
      setActiveImage('user');
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
        return <SurveyPage1 />;
      case 2:
        return <SurveyPage2 />;
      case 3:
        return <SurveyPage3 />;
      case 4:
        return <SurveyPage4 />;
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
        disabled={currentStep === totalSteps - 1 && activeImage === null}
      >
        다음
      </YellowBtn>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  font-family: 'Muli', sans-serif;
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

const ProgressFill = styled.div.withConfig({
  shouldForwardProp: (prop) => !['currentStep', 'totalSteps'].includes(prop),
})`
  background-color: #FFD66B;
  height: 100%;
  width: ${({ currentStep, totalSteps }) => ((currentStep + 1) / totalSteps) * 100}%;
  transition: width 0.4s ease;
  position: absolute;
  top: 0;
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
`;

const ContentContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Select;
