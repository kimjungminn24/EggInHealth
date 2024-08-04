package com.egginhealth.data.dto;

import com.egginhealth.data.entity.Goal;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record GoalDto(
        @NotNull int exerciseCommonId,
        @NotNull int dietCommonId,
        @NotNull int goalCommonId
) {

    public static GoalDto from(Goal gaol) {
        return GoalDto.builder()
                .exerciseCommonId(gaol.getExerciseCommonId())
                .dietCommonId(gaol.getDietCommonId())
                .goalCommonId(gaol.getGoalCommonId())
                .build();
    }
}
