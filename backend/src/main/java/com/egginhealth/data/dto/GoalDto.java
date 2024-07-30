package com.egginhealth.data.dto;

import jakarta.validation.constraints.NotNull;

public record GoalDto(
        @NotNull int exerciseCommonId,
        @NotNull int dietCommonId,
        @NotNull int goalCommonId
) {

}
