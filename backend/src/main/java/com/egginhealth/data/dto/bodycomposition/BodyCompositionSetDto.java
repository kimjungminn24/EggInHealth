package com.egginhealth.data.dto.bodycomposition;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record BodyCompositionSetDto(
        @NotNull BigDecimal height,
        @NotNull BigDecimal weight,
        @NotNull BigDecimal muscle,
        @NotNull BigDecimal fat,
        @NotNull BigDecimal fatPercentage,
        @NotNull BigDecimal bmi,
        @NotNull BigDecimal compositionScore,
        @NotNull String imageUrl
) {

    public static BodyCompositionSetDto from(BodyCompositionInputDto bodyCompositionInputDto, String url) {
        return BodyCompositionSetDto.builder()
                .height(bodyCompositionInputDto.height())
                .weight(bodyCompositionInputDto.weight())
                .muscle(bodyCompositionInputDto.muscle())
                .fat(bodyCompositionInputDto.fat())
                .fatPercentage(bodyCompositionInputDto.fatPercentage())
                .bmi(bodyCompositionInputDto.bmi())
                .compositionScore(bodyCompositionInputDto.compositionScore())
                .imageUrl(url)
                .build();
    }
}
