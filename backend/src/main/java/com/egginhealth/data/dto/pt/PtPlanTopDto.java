package com.egginhealth.data.dto.pt;

import com.egginhealth.data.entity.PtPlan;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record PtPlanTopDto(
        String name,
        int memberId,
        int ptCnt,
        String imgUrl,
        LocalDateTime startTime,
        LocalDateTime endTime
) {
    public static PtPlanTopDto from(PtPlan ptPlan) {
        return PtPlanTopDto.builder()
                .name(ptPlan.getMember().getName())
                .memberId(ptPlan.getMember().getId())
                .ptCnt(ptPlan.getMember().getPTCount())
                .imgUrl(ptPlan.getMember().getImgUrl())
                .startTime(ptPlan.getStartTime())
                .endTime(ptPlan.getEndTime())
                .build();
    }

}
