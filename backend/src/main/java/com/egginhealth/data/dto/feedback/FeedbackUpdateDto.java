package com.egginhealth.data.dto.feedback;

import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public record FeedbackUpdateDto (
        BigDecimal motionSimilarity,
        String memo,
        int exerciseId,
        MultipartFile record,
        String updatedAt
) {

}