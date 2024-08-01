package com.egginhealth.data.dto.diet;

import com.egginhealth.data.entity.Diet;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record DietDto(
        int id,
        int type,
        LocalDateTime date,
        String imgUrl
) {
    public static DietDto from(Diet diet){
        return DietDto.builder()
                .id(diet.getId())
                .type(diet.getType())
                .date(diet.getDate())
                .imgUrl(diet.getImgUrl())
                .build();
    }
}
