package com.egginhealth.data.dto.exercise;

import lombok.Builder;

@Builder
public record ExerciseSetInputDto(
        int set,
        int weight,
        int time,
        int ref,
        int memberId,
        String name,
        String date
) {


}
