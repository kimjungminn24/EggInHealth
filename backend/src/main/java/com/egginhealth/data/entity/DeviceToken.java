package com.egginhealth.data.entity;

import jakarta.persistence.Id;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash("deviceToken")
public class DeviceToken {
    @Id
    private String id;

    private String token;

    public DeviceToken(String id, String token) {
        this.id = id;
        this.token = token;
    }

}
