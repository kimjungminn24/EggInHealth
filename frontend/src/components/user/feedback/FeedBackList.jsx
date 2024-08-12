import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { format, isSameMonth } from 'date-fns';

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

const FeedbackList = ({ feedback, selectedDate, onVideoClick, onEdit, onDelete }) => {
    const [dropdownVisible, setDropdownVisible] = useState(null);
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

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            {filteredFeedback.map(item => (
                <FeedbackItem key={item.id} onClick={() => onVideoClick(item.videoUrl, item.exerciseId)}>
                    <FeedbackContentId>{item.exerciseId}</FeedbackContentId>
                    <FeedbackMemo>{item.memo}</FeedbackMemo>
                    <FeedbackDate>{format(new Date(item.createdAt), 'MM월 dd일 HH시 mm분')}</FeedbackDate>

                    <ActionButton onClick={(e) => { 
                        e.stopPropagation(); 
                        handleDropdownToggle(item.id); 
                    }}>
                        ...
                    </ActionButton>

                    <DropdownMenu ref={dropdownRef} visible={dropdownVisible === item.id}>
                        <DropdownItem onClick={() => { onEdit(item.id); setDropdownVisible(null); }}>수정</DropdownItem>
                        <Divider />
                        <DropdownItem onClick={() => { onDelete(item.id); setDropdownVisible(null); }}>삭제</DropdownItem>
                    </DropdownMenu>
                </FeedbackItem>
            ))}
        </div>
    );
};

export default FeedbackList;
