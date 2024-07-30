package com.egginhealth.data.dto.memberstatus;

import com.egginhealth.data.entity.MemberStatus;

import java.time.LocalDateTime;

public record MemberStatusDto(
        int id,
        LocalDateTime date,
        boolean isExercise,
        boolean isDiet
) {
    public static MemberStatusDto from(MemberStatus status) {
        return new MemberStatusDto(
                status.getId(),
                status.getDate(),
                status.isExercise(),
                status.isDiet()
        );
    }
}
