import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { ImagePreview } from '../../common/StyledComponents';
import { registerEximg } from '../../../api/exercise';

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;


const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: none;
  background-color: ${props => props.close ? '#6c757d' : '#FFD66B'};
  color: #fff;
  cursor: pointer;
`;

const PlusIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; 
  height: 40px; 
  border: 4px solid #DFDFDF; 
  border-radius: 8px; 
  margin-bottom: 10px; 
  cursor: pointer;
`;

const PlusIcon = styled.span`
  font-size: 30px;
  color:#DFDFDF;
  border: #DFDFDF;
`;

const ButtonText = styled.span`
  font-size: 16px;
  color: #DFDFDF;
`;

const RegisterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
  background-color: #ffffff;
  border-radius: 8px;
  width: 250px; 
  height: 250px; 
  text-align: center;
  flex-direction: column;
`;


const ModalExercise = ({ date, onClose ,setHasImages,hasImages}) => {
  const [img, setImg] = useState(null);
  const fileInputRef = React.createRef();

  const handleImgChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (img) {
      try {
        await registerEximg(date, img);
        onClose();
        
      } catch (error) {
        console.error('운동 인증 에러')
      }
    }
  };
  const handleImageChange = (e) => {
    setImg(e.target.files[0]);
  };
  return (
    <StyledModal isOpen onRequestClose={onClose}>
      {!img && <RegisterBox onClick={() => fileInputRef.current.click()}>
        <PlusIconContainer>
          {!img && <PlusIcon>+</PlusIcon>}
        </PlusIconContainer>
        {!img && <ButtonText>운동 사진을 등록해주세요</ButtonText>}
      </RegisterBox>}

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      {img && <ImagePreview src={URL.createObjectURL(img)} alt="preview" />}
      
      <Button onClick={handleSubmit}>{hasImages ? '수정' : '등록'}</Button>
      <Button close onClick={onClose}>닫기</Button>
    </StyledModal>
  );
};

export default ModalExercise;
