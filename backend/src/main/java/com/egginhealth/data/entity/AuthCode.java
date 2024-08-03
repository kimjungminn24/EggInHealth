package com.egginhealth.data.entity;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RedisHash("authCode")
public class AuthCode {

    private static final Long TTL = 6L;

    @Id
    private String authCode;

    @TimeToLive
    private long expiration = TTL;

    private int trainerId;

    public static AuthCode createAuthCode(String authCode, int trainerId) {
        AuthCode code = new AuthCode();
        code.authCode = authCode;
        code.trainerId = trainerId;
        return code;
    }

}
