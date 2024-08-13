import React, { useEffect, useState } from 'react';
import { StyledModal } from '../common/StyledComponents';
import { registerExh, updateEx } from '../../api/exercise'; // updateEx를 import합니다.
import styled from 'styled-components';

const ModalContent = styled.div`
  background-color: #F8F7F4;
  padding: 20px;
  border-radius: 10px;
`;

const InputContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Count = styled.div`
  position: absolute;
  right: 60px; /* Count 위치 조정 */
  
  font-size: 15px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  color: #333;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  margin-bottom: 15px;
  font-size: 15px;

  &::placeholder {
    color: #aaa;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ffcc00;
  border: none;
  border-radius: 20px;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 10px;

  &:hover {
    background-color: #e6b800;
  }
`;

const CloseButton = styled(Button)`
  background-color: #ccc;

  &:hover {
    background-color: #bbb;
  }
`;

const AddExerciseModal = ({ isOpen, onClose, selectedDate, userData, exData }) => {
  const [exhSet, setExhSet] = useState('');
  const [exhWeight, setExhWeight] = useState('');
  const [exhName, setExhName] = useState('');
  const [exTime, setExTime] = useState('');
  const [exhRep, setExhRep] = useState('');
  const [inputType, setInputType] = useState('setWeight');
  const id = userData.id;
  console.log(exData);
  useEffect(() => {
    if (inputType === 'setWeight') {
      setExTime(0);
    } else {
      resetInputs();
    }
  }, [inputType]);

  useEffect(() => {
    // exData가 있을 경우 기존 값을 설정
    if (exData) {
      setExhSet(exData.sets.set);
      setExhWeight(exData.sets.weight);
      setExhRep(exData.sets.rep);
      setExhName(exData.name);
      setExTime(exData.time || '');
      setInputType(exData.time ? 'time' : 'setWeight');
    }
  }, [exData]);

  const resetInputs = () => {
    setExTime('');
    setExhWeight('');
    setExhSet('');
    setExhRep('');
  };

  const handleAddExercise = async () => {
    if (exData) {
      // 수정 로직
      await updateEx(
        exData.sets.setId,
        inputType === 'setWeight' ? exhSet : null,
        inputType === 'setWeight' ? exhWeight : null,
        exhName,
        inputType === 'time' ? exTime : 0,
        selectedDate
      );
    } else {
      // 등록 로직
      await registerExh(
        inputType === 'setWeight' ? exhSet : null,
        inputType === 'setWeight' ? exhWeight : null,
        inputType === 'setWeight' ? exhRep : null,
        exhName,
        inputType === 'time' ? exTime : 0,
        selectedDate,
        id
      );
    }
    onClose();
  };

  return (
    <StyledModal isOpen={isOpen} onRequestClose={onClose}>
      <ModalContent>
        <Title>운동 숙제 등록</Title>
        <Select value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="setWeight">웨이트</option>
          <option value="time">유산소</option>
        </Select>

        <Input
          type="text"
          placeholder="운동 이름을 입력해주세요"
          value={exhName}
          onChange={(e) => setExhName(e.target.value)}
        />

        {inputType === 'setWeight' ? (
          <>
            <InputContent>
              <Input
                type="text"
                placeholder="SET"
                value={exhSet}
                onChange={(e) => setExhSet(e.target.value)}
              />
              <Count>회</Count>
            </InputContent>

            <InputContent>
              <Input
                type="text"
                placeholder="REP"
                value={exhRep}
                onChange={(e) => setExhRep(e.target.value)}
              />
              <Count>회</Count>
            </InputContent>

            <InputContent>
              <Input
                type="text"
                placeholder="WT."
                value={exhWeight}
                onChange={(e) => setExhWeight(e.target.value)}
              />
              <Count>kg</Count>
            </InputContent>
          </>
        ) : (
          <InputContent>
            <Input
              type="text"
              placeholder="운동 시간"
              value={exTime}
              onChange={(e) => setExTime(e.target.value)}
            />
            <Count>분</Count>
          </InputContent>
        )}

        <Button onClick={handleAddExercise}>{exData ? '수정' : '등록'}</Button>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </StyledModal>
  );
};

export default AddExerciseModal;
