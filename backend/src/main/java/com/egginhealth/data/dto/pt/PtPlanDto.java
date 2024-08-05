package com.egginhealth.data.dto.pt;

import com.egginhealth.data.entity.PtPlan;

import java.time.LocalDateTime;

public record PtPlanDto(
    int id,
    LocalDateTime date
) {
    public static PtPlanDto from (PtPlan ptPlan){
        return new PtPlanDto(
                ptPlan.getId(),
                ptPlan.getDate());
    }
}
