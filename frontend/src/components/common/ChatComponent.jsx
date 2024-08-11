import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Arrow from "../../assets/static/Property_Black_Arrow.png"

const ChatComponent = ({ participantName, roomName, receiver }) => {
    console.log('참여자명 :',participantName, '방이름 :',roomName,'리시버 :',receiver);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const receiverId = receiver; // 수신자 ID 상태 추가
    const stompClientRef = useRef(null);

    useEffect(() => {
        if (stompClientRef.current) {
            return; // 중복 연결 방지
        }
        const socket = new SockJS("http://localhost:8080/chat", null, {
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
            //메세지 보내는 API 명세 부분
            const message = {
                content: chatInput,
                senderId: participantName,
                receiverId: receiverId, // 수신자 ID 설정
                createdAt: new Date().toISOString(),
                isRead: false
            };
            // 메시지를 서버로 전송
            stompClientRef.current.send("/app/sendMessage", {}, JSON.stringify(message));
            
            // 전송한 메시지를 화면에 추가
            showMessage(message);
            
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
            //메세지 받아오는 API 명세 부분
            const message = {
                senderId: participantName,
                roomName: roomName
            };
            console.log('메세지 :',message);
            stompClientRef.current.send("/app/recordMessage", {}, JSON.stringify(message));
        }
    }

    return (
        <div id="chat-container">
            {receiver == 0 ? <div>잘못된 접근입니다.</div> : <div><div id="messages"> 
                {chatMessages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.senderId}</strong>: {message.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleChatSubmit} className="w-[300px] m-auto pl-[4px] flex">
                <input
                    type="text"
                    value={chatInput}
                    onChange={handleChatInputChange}
                    placeholder="메세지를 입력해주세요"
                    className="w-full"
                />
                <button type="submit">
                    <img src={Arrow} />
                </button>
            </form></div>}
            
        </div>
    );
};

export default ChatComponent;
