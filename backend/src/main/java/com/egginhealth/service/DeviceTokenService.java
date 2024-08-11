package com.egginhealth.service;

import com.egginhealth.data.entity.DeviceToken;
import com.egginhealth.data.repository.DeviceTokenRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@EnableRedisRepositories
public class DeviceTokenService {

    private static final Logger logger = LoggerFactory.getLogger(DeviceTokenService.class);

    private final DeviceTokenRepository deviceTokenRepository;

    public DeviceToken getDeviceToken(String id) {
        return deviceTokenRepository.findById(id).orElse(null);
    }

    public void saveDeviceToken(String id, String token) {
        DeviceToken deviceToken = getDeviceToken(id);
        if (deviceToken == null) {
            deviceToken = new DeviceToken(id, token);
        }
        deviceTokenRepository.save(deviceToken);
    }

}
