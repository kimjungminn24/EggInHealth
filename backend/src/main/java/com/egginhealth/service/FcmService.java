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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;


@Service
@RequiredArgsConstructor
@EnableRedisRepositories
public class FcmService {

    @Value("${FCM_TYPE}")
    private String type;

    @Value("${FCM_PROJECT_ID}")
    private String projectId;

    @Value("${FCM_PRIVATE_KEY_ID}")
    private String privateKeyId;

    @Value("${FCM_PRIVATE_KEY}")
    private String privateKey;

    @Value("${FCM_CLIENT_EMAIL}")
    private String clientEmail;

    @Value("${FCM_CLIENT_ID}")
    private String clientId;

    @Value("${FCM_AUTH_URI}")
    private String authUri;

    @Value("${FCM_TOKEN_URI}")
    private String tokenUri;

    @Value("${FCM_AUTH_PROVIDER_X509_CERT_URL}")
    private String authProviderX509CertUrl;

    @Value("${FCM_CLIENT_X509_CERT_URL}")
    private String clientX509CertUrl;

    @Value("${FCM_UNIVERSE_DOMAIN}")
    private String universeDomain;


    private static final Logger logger = LoggerFactory.getLogger(FcmService.class);

    private final FcmRepository fcmRepository;
    private final Dotenv dotenv = Dotenv.load();


    public DeviceToken getDeviceToken(String id) {
        return fcmRepository.findById(id).orElse(null);
    }

    public void saveDeviceToken(String id, String token) {
        try {
            DeviceToken deviceToken = new DeviceToken(id, token);
            fcmRepository.save(deviceToken);
        } catch (Exception ex) {
            logger.error("saveDeviceToken error. {}", ex.toString());
        }
    }

    @PostConstruct
    public void initialize() throws IOException {

        String firebaseConfigJson = String.format(
                "{ \"type\": \"%s\", \"project_id\": \"%s\", \"private_key_id\": \"%s\", \"private_key\": \"%s\", \"client_email\": \"%s\", \"client_id\": \"%s\", \"auth_uri\": \"%s\", \"token_uri\": \"%s\", \"auth_provider_x509_cert_url\": \"%s\", \"client_x509_cert_url\": \"%s\", \"universe_domain\": \"%s\" }",
                type, projectId, privateKeyId, privateKey.replace("\\n", "\n"), clientEmail, clientId, authUri, tokenUri, authProviderX509CertUrl, clientX509CertUrl, universeDomain
        );

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
        try {
            String response = FirebaseMessaging.getInstance().send(message);
            logger.info("Successfully sent message: {}", response);
        } catch (Exception ex) {
            logger.info("Failed sent message: {}", ex);
        }
    }
}
