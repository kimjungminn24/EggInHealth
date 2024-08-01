package com.egginhealth.data.dto.bodycomposition;

import com.egginhealth.data.entity.BodyCompositionData;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record BodyCompositionDto(
        int id,
        BigDecimal height,
        BigDecimal weight,
        BigDecimal muscle,
        BigDecimal bmi,
        BigDecimal fat,
        BigDecimal fatPercentage,
        BigDecimal compositionScore,
        String imageUrl,
        LocalDateTime createdAt
) {

    public static BodyCompositionDto from(BodyCompositionData bodyCompositionData) {
        return new BodyCompositionDto(
                bodyCompositionData.getId(),
                bodyCompositionData.getHeight(),
                bodyCompositionData.getWeight(),
                bodyCompositionData.getMuscle(),
                bodyCompositionData.getBmi(),
                bodyCompositionData.getFat(),
                bodyCompositionData.getFatPercentage(),
                bodyCompositionData.getCompositionScore(),
                bodyCompositionData.getImageUrl(),
                bodyCompositionData.getCreatedAt());
    }
}
