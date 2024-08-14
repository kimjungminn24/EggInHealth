package com.egginhealth.data.dto.feedback;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record FeedbackSetDto(
        String memo,
        String exerciseName,
        LocalDateTime updatedAt,
        String url
) {
    public static FeedbackSetDto from(FeedbackUpdateDto feedbackUpdateDto, LocalDateTime dateTime, String url) {
        return FeedbackSetDto.builder()
                .memo(feedbackUpdateDto.memo())
                .exerciseName(feedbackUpdateDto.exerciseName())
                .updatedAt(dateTime)
                .url(url)
                .build();
    }
}
