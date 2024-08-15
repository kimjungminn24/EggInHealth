package com.egginhealth.controller;

import com.egginhealth.data.dto.fcm.DeviceCamOpenDto;
import com.egginhealth.data.dto.fcm.DeviceTokenDto;
import com.egginhealth.service.FcmService;
import com.egginhealth.util.SecurityUtil;
import com.google.firebase.messaging.FirebaseMessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RequestMapping("/device")
@RestController
public class FCMController {
    private final FcmService fcmService;

    @PostMapping("/token")
    public ResponseEntity<Void> addToken(@RequestBody DeviceTokenDto deviceTokenDto) {
        fcmService.saveDeviceToken(String.valueOf(SecurityUtil.getUserId()), deviceTokenDto.token());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/open")
    public ResponseEntity<Void> inPutWebCam(@RequestBody DeviceCamOpenDto deviceCamOpenDto) throws FirebaseMessagingException {
        fcmService.checkReceiver(deviceCamOpenDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
