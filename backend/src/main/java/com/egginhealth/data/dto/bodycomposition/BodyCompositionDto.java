package com.egginhealth.data.dto.bodycomposition;

import com.egginhealth.data.entity.BodyCompositionData;

import java.math.BigDecimal;

public record BodyCompositionDto(
        int id,
        BigDecimal height,
        BigDecimal weight,
        BigDecimal muscle,
        BigDecimal bmi,
        BigDecimal compositionScore,
        String imageUrl,
        int memberId
) {

    public static BodyCompositionDto from(BodyCompositionData bodyCompositionData) {
        return new BodyCompositionDto(
                bodyCompositionData.getId(),
                bodyCompositionData.getHeight(),
                bodyCompositionData.getWeight(),
                bodyCompositionData.getMuscle(),
                bodyCompositionData.getBmi(),
                bodyCompositionData.getCompositionScore(),
                bodyCompositionData.getImageUrl(),
                bodyCompositionData.getMember().getId());
    }
}