package com.egginhealth.data.dto.chat;

import lombok.Builder;

@Builder
public record UserSessionDto(
        String sessionId,
        String userId,
        String userRole,
        boolean isConnected
) {
    public static UserSessionDto from(String sessionId, String userId, String userRole,boolean isConnected){
        return UserSessionDto.builder()
                .sessionId(sessionId)
                .userId(userId)
                .userRole(userRole)
                .isConnected(isConnected)
                .build();
    }

}
