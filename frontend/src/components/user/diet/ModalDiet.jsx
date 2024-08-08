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
  border-radius: 5px;
  border: none;
  background-color: ${props => props.close ? '#6c757d' : '#FFD66B'};
  color: #fff;
  cursor: pointer;
`;

const ModalDiet = ({ date, type, onClose ,setHasImages,hasImages,filteredData}) => {
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState('');


  useEffect(() => {
    setHasImages(hasImages);
  }, [hasImages, setHasImages]);

  const dateChange = date+'T00:00:00Z'
  console.log(filteredData)
  console.log(type)

  const handleSubmit = async () => {
    if (image) {
      try {
        if (hasImages){
          await updateDiet(type,dateChange,image,filteredData[0].id)
        }
        else{
          const newDiet = await registerDiet(type, dateChange, image);
          
          if (newDiet && comment) {
            await registerComment(comment, dateChange, newDiet.dietId, 'D');
          } 
          console.log('다이어트 등록')
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
      <h2>식사 등록</h2>
      <input type="file" onChange={handleImageChange} />
      {image && <ImagePreview src={URL.createObjectURL(image)} alt="preview" />}
      
      {!hasImages && (
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
