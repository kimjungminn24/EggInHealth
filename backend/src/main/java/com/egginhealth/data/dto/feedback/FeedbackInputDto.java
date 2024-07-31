package com.egginhealth.data.dto.feedback;

import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public record FeedbackInputDto(
        BigDecimal motionSimilarity,
        String memo,
        int exerciseId,
        MultipartFile record,
        String createdAt
) {

}
