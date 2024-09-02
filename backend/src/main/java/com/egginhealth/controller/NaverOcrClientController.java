package com.egginhealth.controller;


import com.egginhealth.config.NaverOcrClientConfiguartion;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "naverOcrClient", url = "${ocr.api.url}", configuration = NaverOcrClientConfiguartion.class)
public interface NaverOcrClientController {
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    String getOcrResult(@RequestPart(value = "message") String message,
                        @RequestPart(value = "file") MultipartFile file
    );
}
