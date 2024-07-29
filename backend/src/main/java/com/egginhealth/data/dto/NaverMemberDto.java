package com.egginhealth.data.dto;

import com.egginhealth.data.entity.Role;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
public class NaverMemberDto {

    private String name;
    private String email;
    private String imgUrl;
    private String phoneNumber;
    private Role role;
    private String provider;
    private String key;


    public static NaverMemberDto from(Map<String, Object> response) {
        return NaverMemberDto.builder()
                .name((String) response.get("name"))
                .email((String) response.get("email"))
                .imgUrl((String) response.get("profile_image"))
                .phoneNumber((String) response.get("mobile"))
                .role(Role.NONE)
                .provider("naver")
                .build();
    }

    public static Map<String, Object> convertMap(Map<String, Object> response) {
        return Map.of(
                "id", "naver",
                "key", "naver",
                "name", response.get("name"),
                "email", response.get("email"),
                "imgUrl", response.get("profile_image"),
                "phoneNumber", response.get("mobile"),
                "role", Role.NONE
        );
    }
}
