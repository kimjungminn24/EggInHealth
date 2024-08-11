package com.egginhealth.data.dto.pt;

import com.egginhealth.data.entity.PtLog;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record PtLogDto(
        int id,
        int change,
        int remainingPt,
        int memberId,
        LocalDateTime updatedAt
) {

    public static PtLogDto from(PtLog ptLog) {
        return PtLogDto.builder()
                .id(ptLog.getId())
                .change(ptLog.getChange())
                .remainingPt(ptLog.getRemainingPt())
                .memberId(ptLog.getMember().getId())
                .updatedAt(ptLog.getUpdatedAt())
                .build();
    }
}