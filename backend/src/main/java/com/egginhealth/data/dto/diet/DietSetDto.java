package com.egginhealth.data.dto.diet;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record DietSetDto(
        int type,
        LocalDateTime date,
        String url

) {
    public static DietSetDto from(DietInputDto dietInputDto, LocalDateTime dateTime, String url){
        return DietSetDto.builder()
                .type(dietInputDto.type())
                .date(dateTime)
                .url(url)
                .build();
    }
}
