package com.egginhealth.data.dto.bodycomposition;

import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public record BodyCompositionInputDto(
        BigDecimal height,
        BigDecimal weight,
        BigDecimal muscle,
        BigDecimal fat,
        BigDecimal fatPercentage,
        BigDecimal bmi,
        BigDecimal compositionScore,
        MultipartFile image,
        int memberId
) {

}
