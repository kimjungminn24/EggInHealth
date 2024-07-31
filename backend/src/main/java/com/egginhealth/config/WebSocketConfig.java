package com.egginhealth.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Client -> WebSocket 연결할 때 사용할 API 경로 설정
        registry.addEndpoint("/chat").
                setAllowedOriginPatterns("*");  // CORS 허용 범위 -> 추후 수정

        // Client -> WebSocket 연결할 때 사용할 API 경로 설정
        registry.addEndpoint("/alarm").
                setAllowedOriginPatterns("*");  // CORS 허용 범위 -> 추후 수정
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        //메세지 subscribe 경로 -> 메세지 전송함.
        registry.enableSimpleBroker("sub");

        //메세지 publish 경로 -> 메세지 전달받음.
        registry.setApplicationDestinationPrefixes("pub");
    }
}
