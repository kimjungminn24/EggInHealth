package com.egginhealth.controller;

import com.egginhealth.data.dto.DeviceTokenDto;
import com.egginhealth.service.DeviceTokenService;
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

    private final DeviceTokenService deviceTokenService;

    @PostMapping("/token")
    public ResponseEntity<Void> addToken(@RequestBody DeviceTokenDto deviceTokenDto) {
        deviceTokenService.getDeviceToken(deviceTokenDto.token());
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
