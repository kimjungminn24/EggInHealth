package com.egginhealth.data.dto.feedback;

import org.springframework.web.multipart.MultipartFile;

public record FeedbackUpdateDto(
        String memo,
        String exerciseName,
        MultipartFile record,
        String updatedAt
) {

}