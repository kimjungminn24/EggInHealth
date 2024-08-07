package com.egginhealth.data.dto.memberstatus;

import com.egginhealth.data.entity.MemberStatus;

import java.time.LocalDateTime;

public record MemberMonthStatusDto(
        int id,
        LocalDateTime date,
        boolean isExercise,
        boolean isDiet
) {
    public static MemberMonthStatusDto from(MemberStatus status) {
        return new MemberMonthStatusDto(
                status.getId(),
                status.getDate(),
                status.isExercise(),
                status.isDiet()
        );
    }
}
