package com.egginhealth.data.dto.exercise;


import com.egginhealth.data.entity.exercise.ExerciseSet;
import lombok.Builder;

@Builder
public record ExerciseSetDto(
        int setId,
        int set,
        int weight,
        int time,
        int ref,
        String name
) {

    public static ExerciseSetDto from(ExerciseSet exerciseSet) {
        return ExerciseSetDto.builder()
                .setId(exerciseSet.getId())
                .set(exerciseSet.getSet())
                .weight(exerciseSet.getWeight())
                .ref(exerciseSet.getRef())
                .time(exerciseSet.getTime())
                .name(exerciseSet.getName())
                .build();
    }

}
