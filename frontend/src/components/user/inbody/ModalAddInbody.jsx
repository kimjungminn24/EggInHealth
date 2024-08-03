import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import ButtonCamera from '../../../components/common/button/ButtonCamera';
import PhotoCaptureModal from '../../../components/common/modal/ModalPhotoCapture';

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F8F7F4; 
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  outline: none;
  position: relative;
`;

const ModalContent = styled.div`
  text-align: center;
`;

const InbodyBox = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  margin: 10px 0;
`;


const InputLabel = styled.label`
  flex: 1;
  text-align: left;
  margin-right: 10px;
`;

const InputField = styled.input`
  flex: 2;
  padding: 10px 0;
  width: 50%;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  font-size: 16px;

  &:focus {
    border-bottom: 1px solid #FFD66B;
  }

  &:focus + ${InputLabel}, &:not(:placeholder-shown) + ${InputLabel} {
    top: -20px;
    font-size: 12px;
    color: #FFD66B;
  }
`;

const UnitLabel = styled.span`
  flex: 1;
  text-align: right;
`;

const RegisterButton = styled.button`
  background-color: #FFD66B;
  border: none;
  border-radius: 5px;
  padding: 10px;
  color: white;
  cursor: pointer;
  width: 100%;
`;

const CameraButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ModalAddInbody = ({ isOpen, onRequestClose }) => {
  const [photoModalIsOpen, setPhotoModalIsOpen] = useState(false);

  const openPhotoModal = () => {
    setPhotoModalIsOpen(true);
  };

  const closePhotoModal = () => {
    setPhotoModalIsOpen(false);
  };


  const inbodyBoxContent = [
    { label: '체중', unit: 'kg' },
    { label: '골격근량', unit: 'kg' },
    { label: '체지방량', unit: 'kg' },
    { label: 'BMI', unit: 'kg/㎡' },
    { label: '체지방률', unit: '%' },
    { label: '종합점수', unit: '점' },
  ];

  return (
    <>
      <StyledModal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
        <ModalContent>
          <CameraButtonWrapper>
            <ButtonCamera onClick={openPhotoModal} />
          </CameraButtonWrapper>
          <h2>검사지 등록하기</h2>
            {inbodyBoxContent.map((item, index) => (
              <InbodyBox key={index}>
                <InputLabel>{item.label}</InputLabel>
                <InputField type="text" placeholder=" " />
                <UnitLabel>{item.unit}</UnitLabel>
              </InbodyBox>
            ))}
     
          <RegisterButton>등록</RegisterButton>
          <PhotoCaptureModal isOpen={photoModalIsOpen} onRequestClose={closePhotoModal} />
        </ModalContent>
      </StyledModal>
    </>
  );
};

export default ModalAddInbody;
