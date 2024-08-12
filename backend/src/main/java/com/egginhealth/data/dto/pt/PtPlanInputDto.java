package com.egginhealth.data.dto.pt;

public record PtPlanInputDto(
        int memberId,
        String startTime,
        String endTime,
        String createdAt
) {

}
