package com.egginhealth.service;

import com.egginhealth.data.entity.DeviceToken;
import com.egginhealth.data.repository.FcmRepository;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
@EnableRedisRepositories
public class FcmService {

    private static final Logger logger = LoggerFactory.getLogger(FcmService.class);

    private final FcmRepository fcmRepository;
    private final Dotenv dotenv = Dotenv.load();


    public DeviceToken getDeviceToken(String id) {
        return fcmRepository.findById(id).orElse(null);
    }

    public void saveDeviceToken(String id, String token) {
        DeviceToken deviceToken = new DeviceToken(id, token);
        fcmRepository.save(deviceToken);
    }

    @PostConstruct
    public void initialize() throws IOException {
        String firebaseConfigJson = dotenv.get("FCM_KEY_JSON");

        if (firebaseConfigJson == null) {
            throw new IllegalArgumentException("FCM_KEY_JSON 환경 변수가 설정되지 않았습니다.");
        }

        ByteArrayInputStream serviceAccount = new ByteArrayInputStream(firebaseConfigJson.getBytes(StandardCharsets.UTF_8));

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }

    public void sendMessage(String targetToken, String title, String body, String icon) throws FirebaseMessagingException {
        Notification.Builder notificationBuilder = Notification.builder()
                .setTitle(title)
                .setBody(body);

        if (icon != null && !icon.isEmpty()) {
            notificationBuilder.setImage(icon);
        }

        Notification notification = notificationBuilder.build();

        Message message = Message.builder()
                .setToken(targetToken)
                .setNotification(notification)
                .build();

        String response = FirebaseMessaging.getInstance().send(message);
        logger.info("Successfully sent message: {}", response);
    }
}
