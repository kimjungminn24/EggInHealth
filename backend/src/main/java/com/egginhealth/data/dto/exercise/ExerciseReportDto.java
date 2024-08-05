package com.egginhealth.data.dto.exercise;

import com.egginhealth.data.entity.exercise.ExerciseReport;

public record ExerciseReportDto(
        int boardId,
        String imgUrl
) {

    public static ExerciseReportDto from(ExerciseReport report, int boardId) {
        return new ExerciseReportDto(boardId, report.getImgUrl());
    }
}
