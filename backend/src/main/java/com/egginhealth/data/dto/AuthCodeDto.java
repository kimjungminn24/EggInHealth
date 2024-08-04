package com.egginhealth.data.dto;

import com.egginhealth.data.entity.AuthCode;

public record AuthCodeDto(
        String authCode
) {
    public static AuthCodeDto from(AuthCode authCode) {
        return new AuthCodeDto(authCode.getAuthCode());
    }
}
