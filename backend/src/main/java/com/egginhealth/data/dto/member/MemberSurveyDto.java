package com.egginhealth.data.dto.member;

import jakarta.validation.constraints.NotNull;

public record MemberSurveyDto(
        @NotNull int age,
        @NotNull int height,
        @NotNull String gender
) {

}
