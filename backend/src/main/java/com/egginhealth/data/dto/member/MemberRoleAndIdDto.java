package com.egginhealth.data.dto.member;

public record MemberRoleAndIdDto(
        String role,
        int id
) {
    public static MemberRoleAndIdDto from(String role, int id) {
        return new MemberRoleAndIdDto(role, id);
    }
}
