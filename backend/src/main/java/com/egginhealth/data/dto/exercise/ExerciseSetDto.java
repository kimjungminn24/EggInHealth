package com.egginhealth.data.dto.exercise;

import com.egginhealth.data.entity.exercise.ExerciseSet;
import com.egginhealth.util.DateTimeUtil;
import lombok.Builder;

@Builder
public record ExerciseSetDto(
        int set,
        int weight,
        int time,
        String name,
        String date
) {

    public static ExerciseSetDto from(ExerciseSet exerciseSet) {
        return ExerciseSetDto.builder()
                .set(exerciseSet.getSet())
                .weight(exerciseSet.getWeight())
                .time(exerciseSet.getTime())
                .name(exerciseSet.getName())
                .date(DateTimeUtil.getDateTimeToString(exerciseSet.getExerciseHomework().getDate()))
                .build();
    }

}
