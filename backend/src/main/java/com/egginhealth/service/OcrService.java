package com.egginhealth.service;

import com.egginhealth.controller.NaverOcrClientController;
import com.egginhealth.data.dto.ocr.OcrDto;
import com.egginhealth.data.dto.ocr.OcrRequestImage;
import com.egginhealth.data.dto.ocr.OcrRequestMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OcrService {

    private final NaverOcrClientController naverOcrClientController;
    private final ObjectMapper jacksonObjectMapper;


    @Value("${ocr.api.version}")
    private String VERSION;

    @Value("${ocr.api.format}")
    private String FORMAT;

    @Value("${ocr.api.imageName}")
    private String IMAGE_NAME;


    public String getOcrResult(OcrDto ocrDto) {
        try {
            String messageJson = createOcrRequestMessage();
            return naverOcrClientController.getOcrResult(messageJson, ocrDto.image());
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to process OCR API request message", e);
        }
    }

    private String createOcrRequestMessage() throws JsonProcessingException {
        OcrRequestImage image = OcrRequestImage.makeOcrRequestImage(FORMAT, IMAGE_NAME);
        OcrRequestMessage ocrMessage = OcrRequestMessage.makeOcrRequestMessage(VERSION, image);
        return jacksonObjectMapper.writeValueAsString(ocrMessage);
    }


}
