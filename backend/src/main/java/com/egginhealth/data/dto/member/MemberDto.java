package com.egginhealth.data.dto.member;

import com.egginhealth.data.entity.Member;
import com.egginhealth.data.entity.Role;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class MemberDto {

    private int id;
    private String name;
    private String email;
    private String phoneNumber;
    private String info;
    private String imgUrl;
    private int PTCount;
    private Role type;
    private int totalEgg;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    static public MemberDto from(Member member) {

        return MemberDto.builder()
                .id(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .phoneNumber(member.getPhoneNumber())
                .info(member.getInfo())
                .imgUrl(member.getImgUrl())
                .PTCount(member.getPTCount())
                .type(member.getType())
                .totalEgg(member.getTotalEgg())
                .createdAt(member.getCreatedAt())
                .updatedAt(member.getUpdatedAt())
                .build();
    }


}
