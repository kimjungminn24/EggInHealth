package com.egginhealth.data.dto.ocr;

import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
public class OcrRequestMessage {
    private String version;
    private String requestId;
    private long timestamp;
    private List<OcrRequestImage> images;

    public static OcrRequestMessage makeOcrRequestMessage(String version, OcrRequestImage images) {
        OcrRequestMessage ocrRequestMessage = new OcrRequestMessage();
        ocrRequestMessage.version = version;
        ocrRequestMessage.requestId = generateRequestId();
        ocrRequestMessage.timestamp = getCurrentTimestamp();
        ocrRequestMessage.images = List.of(images);
        return ocrRequestMessage;
    }

    private static String generateRequestId() {
        return UUID.randomUUID()
                .toString();
    }

    private static long getCurrentTimestamp() {
        return System.currentTimeMillis();
    }
}
