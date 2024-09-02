package com.egginhealth.data.dto.ocr;


import lombok.Getter;

@Getter
public class OcrRequestImage {
    private String format;
    private String name;

    public static OcrRequestImage makeOcrRequestImage(String format, String name) {
        OcrRequestImage ocrRequestImage = new OcrRequestImage();
        ocrRequestImage.format = format;
        ocrRequestImage.name = name;
        return ocrRequestImage;
    }

}
