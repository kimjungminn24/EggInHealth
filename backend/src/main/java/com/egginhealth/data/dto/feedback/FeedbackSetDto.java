package com.egginhealth.data.dto.feedback;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
public record FeedbackSetDto(
        BigDecimal motionSimilarity,
        String memo,
        int exerciseId,
        LocalDateTime updatedAt,
        String url
) {
    public static FeedbackSetDto from (FeedbackUpdateDto feedbackUpdateDto, LocalDateTime dateTime, String url){
        return FeedbackSetDto.builder()
                .motionSimilarity(feedbackUpdateDto.motionSimilarity())
                .memo(feedbackUpdateDto.memo())
                .exerciseId(feedbackUpdateDto.exerciseId())
                .updatedAt(dateTime)
                .url(url)
                .build();
    }
}
