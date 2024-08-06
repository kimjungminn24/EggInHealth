package com.egginhealth.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@RedisHash("chatRoom")
public class ChatRoom implements Serializable {

    @Id
    private String id;

    private List<Chat> chatList;
}
