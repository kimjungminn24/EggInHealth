package com.egginhealth.config;

import feign.RequestInterceptor;
import feign.codec.Encoder;
import feign.form.spring.SpringFormEncoder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.cloud.openfeign.support.SpringEncoder;
import org.springframework.context.annotation.Bean;

@RequiredArgsConstructor
public class NaverOcrClientConfig {

    @Bean
    public RequestInterceptor requestInterceptor(@Value("${ocr.api.key}") String apiKey) {
        return requestTemplate -> requestTemplate.header("X-OCR-SECRET", apiKey);
    }

    @Bean
    public Encoder feignEncoder(ObjectFactory<HttpMessageConverters> messageConverters) {
        return new SpringFormEncoder(new SpringEncoder(messageConverters));
    }

}
