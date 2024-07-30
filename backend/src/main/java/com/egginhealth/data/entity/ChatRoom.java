package com.egginhealth.data.entity;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.time.LocalDateTime;

@RedisHash("chatRoom")
@Getter
public class ChatRoom {

    @Id
    private String id;
    private String content;
    private int senderId;
    private int receiverId;
    private LocalDateTime createdAt;

}
