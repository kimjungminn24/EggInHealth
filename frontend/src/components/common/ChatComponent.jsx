import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Arrow from "../../assets/static/Property_Black_Arrow.png";
const BASE_URL = import.meta.env.VITE_API_URL;

const ChatComponent = ({ participantName, roomName, receiver }) => {
    console.log('참여자명 :', participantName, '방이름 :', roomName, '리시버 :', receiver);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const receiverId = receiver; // 수신자 ID 상태 추가
    const stompClientRef = useRef(null);
    const messagesEndRef = useRef(null); // 스크롤 조정을 위한 ref 추가

    useEffect(() => {
        if (stompClientRef.current) {
            return; // 중복 연결 방지
        }
        const socket = new SockJS(`${BASE_URL}/chat`, null, {
            withCredentials: true // 쿠키를 포함하여 요청 전송
        });
        const client = Stomp.over(socket);

        client.connect({}, () => {
            console.log("Connected");
            client.subscribe("/user/queue/messages", (message) => {
                showMessage(JSON.parse(message.body));
            });

            client.subscribe("/user/queue/recordMessages", (message) => {
                console.log("return Message :" + message);
                showchatDtoListMessage(JSON.parse(message.body));
            });

            stompClientRef.current = client;
            // 컴포넌트가 렌더링된 직후 handleFetchInfo 실행
            handleFetchInfo();
        }, (error) => {
            console.error("Connection error:", error);
        });

        return () => {
            if (client && client.connected) {
                client.disconnect(() => {
                    console.log("Disconnected");
                });
            }
        };
    }, []); // 빈 배열을 사용하여 컴포넌트가 처음 렌더링될 때만 실행되도록 함

    useEffect(() => {
        // 채팅 메시지가 추가될 때마다 스크롤을 아래로 이동
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatMessages]);

    function showMessage(message) {
        setChatMessages((prevMessages) => [...prevMessages, message]);
    }

    function showchatDtoListMessage(message) {
        // 서버로부터 받은 이전 메시지 리스트를 chatMessages에 추가
        setChatMessages((prevMessages) => [...prevMessages, ...message.chatDtoList]);
    }

    function handleChatSubmit(e) {
        e.preventDefault();
        if (chatInput.trim() && stompClientRef.current) {
            // 한국 시간(UTC+9)으로 현재 시간 계산
            const now = new Date();
            const koreanOffset = 9 * 60; // 한국 시간대는 UTC+9, 분으로 계산
            const koreanTime = new Date(now.getTime() + (koreanOffset * 60 * 1000));
            const createdAt = koreanTime.toISOString(); // ISO 문자열로 변환

            // 메시지 데이터
            const message = {
                content: chatInput,
                senderId: participantName,
                receiverId: receiverId, // 수신자 ID 설정
                createdAt: createdAt,
                isRead: false
            };

            // 메시지를 서버로 전송
            stompClientRef.current.send("/app/sendMessage", {}, JSON.stringify(message));

            // 전송한 메시지를 화면에 추가
            // showMessage(message);

            // 입력 필드 초기화
            setChatInput("");
        }
    }

    function handleChatInputChange(e) {
        setChatInput(e.target.value);
    }

    function handleFetchInfo() {
        console.log("Call Chat Memory");
        if (stompClientRef.current) {
            // 메세지 받아오는 API 명세 부분
            const message = {
                senderId: participantName,
                roomName: roomName
            };
            console.log('메세지 :', message);
            stompClientRef.current.send("/app/recordMessage", {}, JSON.stringify(message));
        }
    }

    return (
        <div id="chat-container">
            {receiver == 0 ? <div>잘못된 접근입니다.</div> : <div><div id="messages" className='max-h-[660px] overflow-auto top-0'>
                {chatMessages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.senderId}</strong>: {message.content}
                    </div>
                ))}
                <div ref={messagesEndRef} /> {/* 스크롤을 위한 빈 div 추가 */}
            </div>
                <form onSubmit={handleChatSubmit} className="w-[300px] m-auto flex fixed bottom-[50px] h-[50px] item-center justify-center ml-[70px]">
                    <input
                        type="text"
                        value={chatInput}
                        onChange={handleChatInputChange}
                        placeholder="메세지를 입력해주세요"
                        className="w-full"
                    />
                    <button type="submit" className="absolute m-auto right-[20px] top-0 bottom-0">
                        <img src={Arrow} />
                    </button>
                </form></div>}

        </div>
    );
};

export default ChatComponent;
