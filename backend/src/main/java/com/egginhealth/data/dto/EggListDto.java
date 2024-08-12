package com.egginhealth.data.dto;

import java.util.List;

public record EggListDto(
        List<Integer> eggList
) {

    public static EggListDto from(List<Integer> memberStatus) {
        return new EggListDto(memberStatus);
    }
}
