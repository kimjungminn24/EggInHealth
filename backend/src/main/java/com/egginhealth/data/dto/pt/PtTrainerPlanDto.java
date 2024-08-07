package com.egginhealth.data.dto.pt;

import com.egginhealth.data.entity.PtPlan;

import java.time.LocalDateTime;

public record PtTrainerPlanDto(
        int id,
        LocalDateTime date,
        int memberId
) {
    public static PtTrainerPlanDto from(PtPlan ptPlan) {
        return new PtTrainerPlanDto(
                ptPlan.getId(),
                ptPlan.getDate(),
                ptPlan.getMember().getId());
    }
}
