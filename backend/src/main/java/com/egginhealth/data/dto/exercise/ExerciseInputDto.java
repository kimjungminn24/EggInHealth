package com.egginhealth.data.dto.exercise;

public record ExerciseInputDto(
        int set,
        int weight,
        int time,
        String name,
        String date
) {


}
