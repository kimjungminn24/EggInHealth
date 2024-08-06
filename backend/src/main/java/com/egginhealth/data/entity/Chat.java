package com.egginhealth.data.entity;

import com.egginhealth.data.dto.chat.ChatDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Chat implements Serializable {

    private String id;

    private String content;

    private String senderId;

    private String receiverId;

    private LocalDateTime createdAt;

    private boolean isRead;

    public Chat(ChatDto chatDto) {
        this.id = chatDto.id();
        this.content = chatDto.content();
        this.senderId = chatDto.senderId();
        this.receiverId = chatDto.receiverId();
        this.createdAt = chatDto.createdAt();
        this.isRead = chatDto.isRead();
    }
}
