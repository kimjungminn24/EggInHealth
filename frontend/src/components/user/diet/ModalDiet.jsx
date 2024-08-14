import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { registerComment, registerDiet, updateDiet } from '../../../api/diet';

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

const ImagePreview = styled.img`
  width: 100%;
  height: auto;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 15px;
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

const ModalDiet = ({ date, type, onClose ,setHasImages,hasImages,filteredData}) => {
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState('');
  const fileInputRef = React.createRef();

  useEffect(() => {
    setHasImages(hasImages);
  }, [hasImages, setHasImages]);

  const dateChange = date+'T00:00:00Z';
  

  const handleSubmit = async () => {
    if (image) {
      try {
        if (hasImages){
          await updateDiet(type, dateChange, image, filteredData[0].id);
        }
        else{
          const newDiet = await registerDiet(type, dateChange, image);
          if (newDiet && comment) {
            await registerComment(comment, dateChange, newDiet.dietId, 'D');
          } 
          console.log('다이어트 등록');
        }
        onClose();
      } catch (error) {
        console.error('다이어트 등록 중 에러 발생:', error);
      }
    } else {
      console.log('이미지가 선택되지 않음');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <StyledModal isOpen={true} onRequestClose={onClose}>
      {!image && <RegisterBox onClick={() => fileInputRef.current.click()}>
        <PlusIconContainer>
          {!image && <PlusIcon>+</PlusIcon>}
        </PlusIconContainer>
        {!image && <ButtonText>식단을 등록해주세요</ButtonText>}
      </RegisterBox>}

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      {image && <ImagePreview src={URL.createObjectURL(image)} alt="preview" />}
      
      {!hasImages &&  (
        <Textarea
          placeholder="댓글을 입력하세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      )}
      <Button onClick={handleSubmit}>{hasImages ? '수정' : '등록'}</Button>
      <Button close onClick={onClose}>닫기</Button>
    </StyledModal>
  );
};

export default ModalDiet;
