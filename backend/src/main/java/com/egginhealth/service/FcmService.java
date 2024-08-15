package com.egginhealth.service;

import com.egginhealth.data.dto.fcm.DeviceCamOpenDto;
import com.egginhealth.data.dto.member.MemberDetailDto;
import com.egginhealth.data.entity.DeviceToken;
import com.egginhealth.data.repository.FcmRepository;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;


@Service
@EnableRedisRepositories
public class FcmService {

    private static final Logger logger = LoggerFactory.getLogger(FcmService.class);

    private final FcmRepository fcmRepository;
    private final MemberService memberService;

    @Autowired
    public FcmService(@Value("${FCM_TYPE}") String type,
                      @Value("${FCM_PROJECT_ID}") String projectId,
                      @Value("${FCM_PRIVATE_KEY_ID}") String privateKeyId,
                      @Value("${FCM_PRIVATE_KEY}") String privateKey,
                      @Value("${FCM_CLIENT_EMAIL}") String clientEmail,
                      @Value("${FCM_CLIENT_ID}") String clientId,
                      @Value("${FCM_AUTH_URI}") String authUri,
                      @Value("${FCM_TOKEN_URI}") String tokenUri,
                      @Value("${FCM_AUTH_PROVIDER_X509_CERT_URL}") String authProviderX509CertUrl,
                      @Value("${FCM_CLIENT_X509_CERT_URL}") String clientX509CertUrl,
                      @Value("${FCM_UNIVERSE_DOMAIN}") String universeDomain, FcmRepository fcmRepository, MemberService memberService) throws IOException {
        this.fcmRepository = fcmRepository;
        this.memberService = memberService;
        initialize(type, projectId, privateKeyId, privateKey, clientEmail, clientId, authUri, tokenUri, authProviderX509CertUrl, clientX509CertUrl, universeDomain);
    }

    private void initialize(String type,
                            String projectId,
                            String privateKeyId,
                            String privateKey,
                            String clientEmail,
                            String clientId,
                            String authUri,
                            String tokenUri,
                            String authProviderX509CertUrl,
                            String clientX509CertUrl,
                            String universeDomain) throws IOException {

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

    public void sendMessage(String targetToken, String title, String body, String icon) throws FirebaseMessagingException {
        Notification.Builder notificationBuilder = Notification.builder()
                .setTitle(title)
                .setBody(body);

        if (icon != null && !icon.isEmpty()) {
            notificationBuilder.setImage(icon);
        } else {
            icon = "https://egg-in-health.s3.ap-northeast-2.amazonaws.com//4bae84db-72fb-4e30-be2e-80f090bfa13c_maskable_icon.png";
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
            logger.info("Failed sent message: {}", ex.toString());
        }
    }

    public void checkReceiver(DeviceCamOpenDto deviceCamOpenDto) throws FirebaseMessagingException {
        MemberDetailDto sender = memberService.getMemberDetail(deviceCamOpenDto.senderId());
        MemberDetailDto receiver = memberService.getMemberDetail(deviceCamOpenDto.receiverId());
        sendMessage(getDeviceToken(String.valueOf(deviceCamOpenDto.senderId())).getToken(), "화상통화 요청", receiver.name() + "님에게 통화를 요청했습니다.", null);
        sendMessage(getDeviceToken(String.valueOf(deviceCamOpenDto.receiverId())).getToken(), "화상통화 요청", sender.name() + "님이 통화를 요청했습니다.", null);
    }
}
