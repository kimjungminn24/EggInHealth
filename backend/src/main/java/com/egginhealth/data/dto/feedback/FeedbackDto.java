package com.egginhealth.data.dto.feedback;

import com.egginhealth.data.entity.Feedback;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record FeedbackDto(
        int id,
        String memo,
        String exerciseName,
        String videoUrl,
        boolean read,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static FeedbackDto from(Feedback feedback) {
        return FeedbackDto.builder()
                .id(feedback.getId())
                .memo(feedback.getMemo())
                .exerciseName(feedback.getExerciseName())
                .videoUrl(feedback.getVideoUrl())
                .read(feedback.isRead())
                .createdAt(feedback.getCreatedAt())
                .updatedAt(feedback.getUpdatedAt())
                .build();
    }
}
