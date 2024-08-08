import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const ChatComponent = ({ participantName, roomName }) => {
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const [receiverId, setReceiverId] = useState(""); // 수신자 ID 상태 추가
    const stompClientRef = useRef(null);

    useEffect(() => {
        if (stompClientRef.current) {
            return; // 이미 연결된 경우, 중복 연결 방지
        }

        const socket = new SockJS("http://localhost:8080/chat", null, {
            withCredentials: true // 쿠키를 포함하도록 설정
        });
        const client = Stomp.over(socket);

        client.connect({}, () => {
            console.log("Connected");
            client.subscribe("/user/queue/messages", (message) => {
                showMessage(JSON.parse(message.body));
            });

            client.subscribe("/user/queue/recordMessages", (message) => {
                showchatDtoListMessage(JSON.parse(message.body));
            });

            stompClientRef.current = client;
        });

        return () => {
            if (client && client.connected) {
                client.disconnect(() => {
                    console.log("Disconnected");
                });
            }
        };
    }, []);

    function showMessage(message) {
        setChatMessages((prevMessages) => [...prevMessages, message]);
    }

    function showchatDtoListMessage(message) {
        setChatMessages((prevMessages) => [...prevMessages, ...message.chatDtoList]);
    }

    function handleChatSubmit(e) {
        e.preventDefault();
        if (chatInput.trim() && receiverId.trim() && stompClientRef.current) {
            const message = {
                content: chatInput,
                senderId: participantName,
                receiverId: receiverId, // 수신자 ID 설정
                createdAt: new Date().toISOString(),
                isRead: false
            };
            stompClientRef.current.send("/app/sendMessage", {}, JSON.stringify(message));
            setChatInput("");
        }
    }

    function handleChatInputChange(e) {
        setChatInput(e.target.value);
    }

    function handleReceiverIdChange(e) {
        setReceiverId(e.target.value);
    }

    function handleFetchInfo() {
        console.log("Call Chat Memeory");
        if (stompClientRef.current) {
            const message = {
                senderId: participantName,
                roomName: roomName
            };
            stompClientRef.current.send("/app/recordMessage", {}, JSON.stringify(message));
        }
    }

    return (
        <div id="chat-container">
            <div id="messages">
                {chatMessages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.senderId}</strong>: {message.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleChatSubmit}>
                <input
                    type="text"
                    value={receiverId}
                    onChange={handleReceiverIdChange}
                    placeholder="Receiver ID"
                />
                <input
                    type="text"
                    value={chatInput}
                    onChange={handleChatInputChange}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
            <button onClick={handleFetchInfo}>정보 가져오기</button>
        </div>
    );
};

export default ChatComponent;
