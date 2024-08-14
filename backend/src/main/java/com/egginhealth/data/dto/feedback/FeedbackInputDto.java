package com.egginhealth.data.dto.feedback;

import org.springframework.web.multipart.MultipartFile;

public record FeedbackInputDto(
        String memo,
        String exerciseName,
        MultipartFile record,
        String createdAt
) {

}
