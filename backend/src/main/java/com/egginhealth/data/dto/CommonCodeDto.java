package com.egginhealth.data.dto;

import com.egginhealth.data.entity.CommonCode;
import lombok.Builder;

// TODO : json 데이터 수정해야함
@Builder
public record CommonCodeDto(
        int id,
        String type
) {
    public static CommonCodeDto from(CommonCode commonCode) {
        return CommonCodeDto.builder()
                .id(commonCode.getId().getId())
                .type(commonCode.getType())
                .build();
    }
}
