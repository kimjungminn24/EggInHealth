package com.egginhealth.data.dto.feedback;

import com.egginhealth.data.entity.Feedback;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
public record FeedbackDto(
        int id,
        BigDecimal motionSimilarity,
        String memo,
        int exerciseId,
        String videoUrl,
        boolean read,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static FeedbackDto from(Feedback feedback){
        return FeedbackDto.builder()
                .id(feedback.getId())
                .motionSimilarity(feedback.getMotionSimilarity())
                .memo(feedback.getMemo())
                .exerciseId(feedback.getExerciseId())
                .videoUrl(feedback.getVideoUrl())
                .read(feedback.isRead())
                .createdAt(feedback.getCreatedAt())
                .updatedAt(feedback.getUpdatedAt())
                .build();
    }
}
