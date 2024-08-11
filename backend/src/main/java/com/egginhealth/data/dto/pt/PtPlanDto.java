package com.egginhealth.data.dto.pt;

import com.egginhealth.data.entity.PtPlan;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record PtPlanDto(
        int id,
        LocalDateTime startTime,
        LocalDateTime endTime
) {
    public static PtPlanDto from(PtPlan ptPlan) {
        return PtPlanDto.builder()
                .id(ptPlan.getId())
                .startTime(ptPlan.getStartTime())
                .endTime(ptPlan.getEndTime())
                .build();
    }
}