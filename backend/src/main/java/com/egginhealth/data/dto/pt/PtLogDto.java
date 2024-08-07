package com.egginhealth.data.dto.pt;

import com.egginhealth.data.entity.PtLog;

import java.time.LocalDateTime;

public record PtLogDto(
        int id,
        int change,
        int remainingPt,
        int memberId,
        LocalDateTime updatedAt
) {

    public static PtLogDto from(PtLog ptLog) {
        return new PtLogDto(
                ptLog.getId(),
                ptLog.getChange(),
                ptLog.getRemainingPt(),
                ptLog.getMember().getId(),
                ptLog.getUpdatedAt());
    }


}
