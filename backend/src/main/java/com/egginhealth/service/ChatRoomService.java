package com.egginhealth.service;

import com.egginhealth.data.dto.chat.ChatDto;
import com.egginhealth.data.dto.chat.ChatListDto;
import com.egginhealth.data.dto.chat.ChatRoomDto;
import com.egginhealth.data.entity.Chat;
import com.egginhealth.data.entity.ChatRoom;
import com.egginhealth.data.entity.Role;
import com.egginhealth.data.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.stereotype.Service;

import javax.annotation.Nullable;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Configuration
@EnableRedisRepositories
public class ChatRoomService {

    private static final Logger logger = LoggerFactory.getLogger(ChatRoomService.class);

    private final MemberService memberService;
    private final ChatRoomRepository chatRoomRepository;

    public MessageHeaders createHeaders(@Nullable String sessionId) {
        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
        if (sessionId != null)
            headerAccessor.setSessionId(sessionId);
        headerAccessor.setLeaveMutable(true);
        return headerAccessor.getMessageHeaders();
    }

    public ChatRoomDto getChatRoom(String id) {
        ChatRoom chatRoom = chatRoomRepository.findById(id).orElseGet(() -> {
            ChatRoom newChatRoom = new ChatRoom(id, new ArrayList<>());
            chatRoomRepository.save(newChatRoom);
            logger.info("Create new chat room id {}", id);
            return newChatRoom;
        });

        List<ChatDto> chatDtoList = chatRoom.getChatList().stream()
                .map(ChatDto::fromEntity)
                .toList();
        return ChatRoomDto.from(chatRoom.getId(), chatDtoList);
    }

    public List<ChatRoomDto> getAllRooms() {
        List<ChatRoom> chatRooms = (List<ChatRoom>) chatRoomRepository.findAll();
        return chatRooms.stream()
                .map(chatRoom -> ChatRoomDto.from(chatRoom.getId(), chatRoom.getChatList().stream()
                        .map(ChatDto::fromEntity)
                        .toList()))
                .toList();
    }

    public void addMessageToChatRoom(String roomId, ChatDto chatDto) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseGet(() -> {
            ChatRoomDto chatRoomDto = getChatRoom(roomId);
            return new ChatRoom(chatRoomDto.id(), new ArrayList<>());
        });

        if (chatRoom.getChatList() == null) {
            chatRoom.roomSet();
        }

        chatRoom.getChatList().add(new Chat(chatDto));
        chatRoomRepository.save(chatRoom);
    }

    public void saveRedistoMessage(ChatDto chatDto) {
        String roomName = null;
        if (chatDto.receiverId() != null && memberService.isMember(Integer.parseInt(chatDto.receiverId()))) {
            roomName = chatDto.receiverId();
        } else if (chatDto.senderId() != null && memberService.isMember(Integer.parseInt(chatDto.senderId()))) {
            roomName = chatDto.senderId();
        }

        if (roomName == null) {
            logger.error("Not Member here receiverId: {} senderId: {}",
                    chatDto.receiverId() != null ? chatDto.receiverId() : "null",
                    chatDto.senderId() != null ? chatDto.senderId() : "null");
            return;
        }

        addMessageToChatRoom(roomName, chatDto);
        logger.info("Saved chat message to Redis with roomId: {}", roomName);
    }

    public List<ChatListDto> getChatList(int id) {
        Role role = memberService.getMemberDetail(id).type();
        ArrayList<ChatListDto> chatList = new ArrayList<>();

        if (role.equals(Role.MEMBER)) {
            chatList = memberService.getMemberTrainerId(id);
            if (chatList != null) {
                for (int i = 0; i < chatList.size(); i++) {
                    ChatRoom chatRoom = chatRoomRepository.findById(String.valueOf(id)).orElse(null);
                    chatList.set(i, ChatListDto.fromChat(chatList.get(i), chatRoom));
                }
            }
        } else if (role.equals(Role.TRAINER)) {
            chatList = memberService.getTrainerMemberIdList(id);
            if (chatList != null) {
                for (int i = 0; i < chatList.size(); i++) {
                    ChatRoom chatRoom = chatRoomRepository.findById(String.valueOf(chatList.get(i).memberId())).orElse(null);
                    chatList.set(i, ChatListDto.fromChat(chatList.get(i), chatRoom));
                }
            }
        }

        if (chatList != null) {
            chatList.sort((chat1, chat2) -> chat2.lastDate().compareTo(chat1.lastDate()));
        }

        return chatList;
    }
}
