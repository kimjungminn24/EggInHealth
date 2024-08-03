package com.egginhealth.data.dto;

import com.egginhealth.data.entity.AuthCode;
import lombok.Builder;

@Builder
public record AuthCodeDto(
        String authCode
) {
    public static AuthCodeDto from(AuthCode authCode) {
        return new AuthCodeDto(authCode.getAuthCode());
    }
}
