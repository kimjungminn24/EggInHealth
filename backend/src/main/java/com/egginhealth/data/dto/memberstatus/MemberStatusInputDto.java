package com.egginhealth.data.dto.memberstatus;

import java.time.LocalDateTime;

public record MemberStatusInputDto(
        int id,
        LocalDateTime date,
        boolean isExercise,
        boolean isDiet,
        int userId
) {
}
