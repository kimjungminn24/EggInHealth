package com.egginhealth.data.dto.memberstatus;

import com.egginhealth.data.entity.Member;
import com.egginhealth.data.entity.MemberStatus;
import lombok.Builder;

@Builder
public record MemberStatusDto(
        String name,
        String imgUrl,
        int memberId,
        int ptCnt,
        boolean isExercise,
        boolean isDiet,
        boolean isFeedback
) {

    public static MemberStatusDto from(Member member, MemberStatus status, boolean isFeedback) {
        return MemberStatusDto.builder()
                .name(member.getName())
                .imgUrl(member.getImgUrl())
                .memberId(member.getId())
                .ptCnt(member.getPTCount())
                .isExercise(status != null && status.isExercise())
                .isDiet(status != null && status.isDiet())
                .isFeedback(isFeedback)
                .build();
    }

    public Integer getMemberId() {
        return memberId;
    }
}
