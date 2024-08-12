package com.egginhealth.data.dto.pt;

import com.egginhealth.data.entity.PtPlan;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record PtTrainerPlanDto(
        int id,
        LocalDateTime startTime,
        LocalDateTime endTime,
        int memberId
) {
    public static PtTrainerPlanDto from(PtPlan ptPlan) {
        return PtTrainerPlanDto.builder()
                .id(ptPlan.getId())
                .startTime(ptPlan.getStartTime())
                .endTime(ptPlan.getEndTime())
                .memberId(ptPlan.getMember().getId())
                .build();
    }
}