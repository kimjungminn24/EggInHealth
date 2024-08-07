package com.egginhealth.controller;

import com.egginhealth.data.dto.chat.ChatDto;
import com.egginhealth.data.dto.chat.ChatInputDto;
import com.egginhealth.data.dto.chat.ChatRoomDto;
import com.egginhealth.service.ChatRoomService;
import com.egginhealth.service.UserSessionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/chat")
@Controller
public class ChatController {

    private final UserSessionService userSessionService;

    private final ChatRoomService chatRoomService;

    private final SimpMessagingTemplate messagingTemplate;

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    public ChatController(UserSessionService userSessionService, ChatRoomService chatRoomService, SimpMessagingTemplate messagingTemplate) {
        this.userSessionService = userSessionService;
        this.chatRoomService = chatRoomService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/sendMessage")
    public void sendMessage(ChatDto message) {

        String path = "/queue/messages";
        
        if (message == null) {
            logger.error("Chatting message is empty read");
            return;
        }

        chatRoomService.saveRedistoMessage(message);
        if (userSessionService.isUserConnected(message.senderId())) {
            String senderSessionId = userSessionService.getUserSession(message.senderId()).sessionId();
            messagingTemplate.convertAndSendToUser(senderSessionId, path, message, chatRoomService.createHeaders(senderSessionId));
        }

        if (userSessionService.isUserConnected(message.receiverId())) {
            String receiverSessionId = userSessionService.getUserSession(message.receiverId()).sessionId();
            messagingTemplate.convertAndSendToUser(receiverSessionId, path, message, chatRoomService.createHeaders(receiverSessionId));
        } else {
            //TODO: 만약 receiverSessionId 없다면 FCM 상대받으로 보내기
        }
    }

    @MessageMapping("/recordMessage")
    public void sendRecordMessage(ChatInputDto chatInputDto) {

        String path = "/queue/recordMessages";

        ChatRoomDto chatRoomDto = chatRoomService.getChatRoom(chatInputDto.roomName());

        if (userSessionService.isUserConnected(chatInputDto.senderId())) {
            String senderSessionId = userSessionService.getUserSession(chatInputDto.senderId()).sessionId();
            messagingTemplate.convertAndSendToUser(senderSessionId, path, chatRoomDto, chatRoomService.createHeaders(senderSessionId));
        }
    }


}
