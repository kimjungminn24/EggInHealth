package com.egginhealth.data.dto.member;

import com.egginhealth.data.entity.Member;
import com.egginhealth.data.entity.Role;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record MemberDetailDto(
        int id,
        String name,
        String email,
        String phoneNumber,
        int age,
        int height,
        String gender,
        String info,
        String imgUrl,
        int PTCount,
        Role type,
        int totalEgg,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        int trId,
        String trName
) {

    public static MemberDetailDto from(Member member, Member trainer) {

        return MemberDetailDto.builder()
                .id(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .phoneNumber(member.getPhoneNumber())
                .age(member.getAge())
                .height(member.getHeight())
                .info(member.getInfo())
                .gender(member.getGender())
                .imgUrl(member.getImgUrl())
                .PTCount(member.getPTCount())
                .type(member.getType())
                .totalEgg(member.getTotalEgg())
                .createdAt(member.getCreatedAt())
                .updatedAt(member.getUpdatedAt())
                .trId(trainer == null ? 0 : trainer.getId())
                .trName(trainer == null ? null : trainer.getName())
                .build();
    }

}
