package com.egginhealth.data.dto.chat;

import com.egginhealth.data.entity.Chat;

import java.time.LocalDateTime;

public record ChatDto(
        String id,
        String content,
        String senderId,
        String receiverId,
        LocalDateTime createdAt,
        boolean isRead
) {
    public static ChatDto from(ChatDto chatDto) {
        return new ChatDto(
                chatDto.id,
                chatDto.content,
                chatDto.senderId,
                chatDto.receiverId,
                chatDto.createdAt,
                chatDto.isRead
        );
    }

    public static ChatDto fromEntity(Chat chat) {
        return new ChatDto(
                chat.getId(),
                chat.getContent(),
                chat.getSenderId(),
                chat.getReceiverId(),
                chat.getCreatedAt(),
                chat.isRead()
        );
    }
}
