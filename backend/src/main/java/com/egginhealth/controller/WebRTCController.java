package com.egginhealth.controller;

import io.livekit.server.AccessToken;
import io.livekit.server.RoomJoin;
import io.livekit.server.RoomName;
import io.livekit.server.WebhookReceiver;
import livekit.LivekitWebhook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequestMapping("/rtc")
@RestController
public class WebRTCController {

    private static final Logger log = LoggerFactory.getLogger(WebRTCController.class);

    private final String LIVE_KIT_API_KEY;
    private final String LIVE_KIT_API_SECRET;

    public WebRTCController(
            @Value("${LIVEKIT_API_KEY}") String liveKitApiKey,
            @Value("${LIVEKIT_API_SECRET}") String liveKitApiSecret) {
        this.LIVE_KIT_API_KEY = liveKitApiKey;
        this.LIVE_KIT_API_SECRET = liveKitApiSecret;
    }


    @PostMapping("/rtctoken")
    public ResponseEntity<Map<String, String>> createToken(@RequestBody Map<String, String> params) {
        String roomName = params.get("roomName");
        String participantName = params.get("participantName");

        if (roomName == null || participantName == null) {
            return ResponseEntity.badRequest().body(Map.of("errorMessage", "roomName and participantName are required"));
        }

        AccessToken rtctoken = new AccessToken(LIVE_KIT_API_KEY, LIVE_KIT_API_SECRET);
        rtctoken.setName(participantName);
        rtctoken.setIdentity(participantName);
        rtctoken.addGrants(new RoomJoin(true), new RoomName(roomName));

        return ResponseEntity.ok(Map.of("rtctoken", rtctoken.toJwt()));
    }

    @PostMapping(value = "/livekit/webhook", consumes = "application/webhook+json")
    public ResponseEntity<String> receiveWebhook(@RequestHeader("Authorization") String authHeader, @RequestBody String body) {
        WebhookReceiver webhookReceiver = new WebhookReceiver(LIVE_KIT_API_KEY, LIVE_KIT_API_SECRET);
        try {
            LivekitWebhook.WebhookEvent event = webhookReceiver.receive(body, authHeader);
            log.info("LiveKit Webhook: {}", event);
        } catch (Exception e) {
            log.error("Error validating webhook event: {}", e.getMessage());
        }
        return ResponseEntity.ok("ok");
    }

}
