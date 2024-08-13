import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { format, isSameMonth } from 'date-fns';
import FeedbackModal from './ModalFeedback';
import ModalDeleteFeedback from './ModalDelteFeedback';

const FeedbackItem = styled.div`
    background-color: #ffffff;
    border-radius: 15px;
    padding: 15px;
    margin-bottom: 10px;
    margin-top: 5px;
    cursor: pointer;
    width: 320px;
    height: 90px;
    transition: background-color 0.3s;
    position: relative;

    &:hover {
        background-color: #f1f1f1;
    }
`;

const FeedbackContentId = styled.div`
    font-size: 14px;
`;

const FeedbackMemo = styled.div`
    font-size: 13px;
`;

const FeedbackDate = styled.div`
    font-size: 11px;
    color: #888;
    margin-top: 10px;
`;

const ActionButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: #000000;
    position: absolute;
    right: 15px;
    top: 15px;
`;

const DropdownMenu = styled.div`
    position: absolute;
    right: 10px;
    top: 40px;
    display: ${props => (props.visible ? 'block' : 'none')};
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    padding: 10px;
    z-index: 10;
`;

const DropdownItem = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: #000000;
    display: block;

`;

const Divider = styled.div`
    height: 1px;
    background-color: #ccc;
    margin: 5px 0;
`;
const FeedbackList = ({ feedback, selectedDate, onVideoClick, onEdit, onDelete ,fetchFeedback,getKoreanISOString,userType}) => {
    const [dropdownVisible, setDropdownVisible] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [isDeleteOpen,setIsDeleteOpen] = useState(false)
    const dropdownRef = useRef(null);

    const selectedDateObj = new Date(selectedDate);

    const filteredFeedback = feedback?.filter(item => {
        const createdAtDate = new Date(item.createdAt);
        return isSameMonth(createdAtDate, selectedDateObj);
    });

    const handleDropdownToggle = (id) => {
        setDropdownVisible(dropdownVisible === id ? null : id);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(null);
        }
    };

    const handleEdit = (item) => {
        setSelectedFeedback(item);
        setIsModalOpen(true);
        setDropdownVisible(null);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleDelete = (item) => {
        setSelectedFeedback(item); // 삭제할 ID 설정
        setIsDeleteOpen(true); // 삭제 모달 열기
        setDropdownVisible(null); // 드롭다운 닫기
    };

    return (
        <div>
            {filteredFeedback.map(item => (
                <FeedbackItem key={item.id} onClick={() => onVideoClick(item.videoUrl, item.exerciseId)}>
                    <FeedbackContentId>{item.exerciseId}</FeedbackContentId>
                    <FeedbackMemo>{item.memo}</FeedbackMemo>
                    <FeedbackDate>{format(new Date(item.createdAt), 'MM월 dd일 HH시 mm분')}</FeedbackDate>

                    <ActionButton onClick={(e) => { 
                        e.stopPropagation(); // 클릭 전파 방지
                        handleDropdownToggle(item.id); 
                    }}>
                        ...
                    </ActionButton>
                    {userType === 'MEMBER' ?
                    <DropdownMenu ref={dropdownRef} visible={dropdownVisible === item.id} onClick={(e) => e.stopPropagation()}>
                        <DropdownItem onClick={() => handleEdit(item)}>수정</DropdownItem>
                        <Divider />
                        <DropdownItem onClick={() => handleDelete(item.id)}>삭제</DropdownItem> 
                    </DropdownMenu>
                    : null}
                </FeedbackItem>
            ))}
            <FeedbackModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                feedbackData={selectedFeedback} // 수정할 피드백 데이터 전달
                fetchFeedback={fetchFeedback}
                getKoreanISOString={getKoreanISOString} // 피드백 데이터 새로고침 함수 전달
            />
            <ModalDeleteFeedback
                isOpen={isDeleteOpen}
                feedbackData={selectedFeedback} 
                fetchFeedback={fetchFeedback}
            
            />
        </div>
    );
};

export default FeedbackList;