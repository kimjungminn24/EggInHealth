package com.egginhealth.data.dto;

import com.egginhealth.data.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ChatRoomDto {

    private String id;
    private String content;
    private int senderId;
    private int receiverId;
    private LocalDateTime createdAt;

    public static ChatRoomDto from(ChatRoom chatRoom){
        return ChatRoomDto.builder()
                .id(chatRoom.getId())
                .content(chatRoom.getContent())
                .senderId(chatRoom.getSenderId())
                .receiverId(chatRoom.getReceiverId())
                .createdAt(chatRoom.getCreatedAt())
                .build();
    }
}
