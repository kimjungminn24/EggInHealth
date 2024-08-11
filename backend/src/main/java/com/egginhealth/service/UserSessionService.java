package com.egginhealth.service;

import com.egginhealth.data.dto.chat.UserSessionDto;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserSessionService {

    private final ConcurrentHashMap<String, UserSessionDto> userSessions = new ConcurrentHashMap<>();

    public void addUserSession(String sessionId, String userId, String userRole) {
        userSessions.put(userId, UserSessionDto.from(sessionId, userId, userRole, true));
    }

    public void removeUserSessions(String userId) {
        userSessions.remove(userId);
    }

    public boolean isUserConnected(String userId) {
        UserSessionDto userSessionDto = userSessions.get(userId);
        return userSessionDto != null && userSessionDto.isConnected();
    }

    public UserSessionDto getUserSession(String userId) {
        return userSessions.get(userId);
    }
}
