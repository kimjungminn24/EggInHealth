import React from 'react';
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

    &:hover {
        background-color: #f1f1f1;
    }
`;

const FeedbackContentId = styled.div`
    /* margin-bottom: 10px; */
    font-size: 14px;
`;
const FeedbackMemo = styled.div`
    font-size: 13px;
`
const FeedbackDate = styled.div`
    font-size: 11px;
    color: #888;
    /* margin-right: 230px; */
    margin-left: 230px;
    margin-bottom: 200px;
`;

const FeedbackList = ({ feedback, selectedDate, onVideoClick }) => {
    const selectedDateObj = new Date(selectedDate);

    const filteredFeedback = feedback?.filter(item => {
        const createdAtDate = new Date(item.createdAt);
        return isSameMonth(createdAtDate, selectedDateObj);
    });

    return (
        <div>
            {filteredFeedback.map(item => (
                <FeedbackItem key={item.id} onClick={() => onVideoClick(item.videoUrl,item.exerciseId)}>
                    <FeedbackContentId>{item.exerciseId}</FeedbackContentId>
                    <FeedbackMemo>{item.memo}</FeedbackMemo>
                    <FeedbackDate>{format(new Date(item.createdAt), 'MM월 dd일 HH시 mm분')}</FeedbackDate>
                    {/* <div>{item.read ? '읽음' : '읽지 않음'}</div> */}
                </FeedbackItem>
            ))}
        </div>
    );
};

export default FeedbackList;
