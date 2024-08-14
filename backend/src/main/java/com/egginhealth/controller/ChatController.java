package com.egginhealth.controller;

import com.egginhealth.data.dto.chat.ChatDto;
import com.egginhealth.data.dto.chat.ChatInputDto;
import com.egginhealth.data.dto.chat.ChatRoomDto;
import com.egginhealth.data.entity.DeviceToken;
import com.egginhealth.service.ChatRoomService;
import com.egginhealth.service.FcmService;
import com.egginhealth.service.UserSessionService;
import com.google.firebase.messaging.FirebaseMessagingException;
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
    private final FcmService fcmService;
    private final SimpMessagingTemplate messagingTemplate;

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    public ChatController(UserSessionService userSessionService, ChatRoomService chatRoomService, SimpMessagingTemplate messagingTemplate, FcmService fcmService) {
        this.userSessionService = userSessionService;
        this.chatRoomService = chatRoomService;
        this.messagingTemplate = messagingTemplate;
        this.fcmService = fcmService;
    }

    /**
     * 메세지 도착 한 후 만약 상대방 session 연결이 끊겨 있다면 FCM 알림 발송
     */
    @MessageMapping("/sendMessage")
    public void sendMessage(ChatDto message) throws FirebaseMessagingException {

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
            DeviceToken devicetoken = fcmService.getDeviceToken(message.receiverId());
            if (devicetoken.getToken() != null) {
                fcmService.sendMessage(devicetoken.getToken(), "메세지 도착", message.receiverId() + "님의 메세지가 도착했습니다", null);
            }
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
