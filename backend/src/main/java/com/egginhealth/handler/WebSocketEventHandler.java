package com.egginhealth.handler;

import com.egginhealth.service.UserSessionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Map;

@Component
public class WebSocketEventHandler {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventHandler.class);

    private final UserSessionService userSessionService;

    public WebSocketEventHandler(UserSessionService userSessionService) {
        this.userSessionService = userSessionService;
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        UsernamePasswordAuthenticationToken user = (UsernamePasswordAuthenticationToken) accessor.getUser();

        if (sessionId == null || user == null) {
            logger.error("Received a new web socket connection with null sessionId");
            throw new IllegalStateException("Session ID cannot be null");
        }
        Object principal = user.getPrincipal();
        if (principal instanceof Map<?, ?>) {
            @SuppressWarnings("unchecked")
            Map<String, Object> principalMap = (Map<String, Object>) principal;
            String userId = principalMap.get("id").toString();
            String userRole = principalMap.get("role").toString();

            userSessionService.addUserSession(sessionId, userId, userRole);
            logger.info("Received a new web socket connection: {} for user: {} role: {}", sessionId, userId, userRole);
        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();
        userSessionService.removeUserSessions(sessionId);
        logger.info("Disconnected web socket connection: {}", sessionId);
    }
}
