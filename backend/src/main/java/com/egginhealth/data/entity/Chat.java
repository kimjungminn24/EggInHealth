package com.egginhealth.data.entity;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash("chat")
@Getter
public class Chat {

    @Id
    private int id;
    private ChatRoom chatRoom;
}
