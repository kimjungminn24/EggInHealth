package com.egginhealth.data.dto.memberstatus;

import com.egginhealth.data.entity.Member;
import com.egginhealth.data.entity.MemberStatus;

public record MemberStatusDto(
        String name,
        String ImgUrl,
        int memberId,
        int ptCnt,
        boolean isExercise,
        boolean isDiet,
        boolean isFeedback
) {

    public static MemberStatusDto from(Member member, MemberStatus status, boolean isFeedback) {

        return new MemberStatusDto(
                member.getName(),
                member.getImgUrl(),
                member.getId(),
                member.getPTCount(),
                status != null && status.isExercise(),
                status != null && status.isDiet(),
                isFeedback
        );
    }
}
