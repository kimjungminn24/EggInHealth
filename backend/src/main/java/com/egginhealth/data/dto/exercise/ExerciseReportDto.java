package com.egginhealth.data.dto.exercise;

import com.egginhealth.data.entity.exercise.ExerciseReport;

public record ExerciseReportDto(
        int reportId,
        String imgUrl
) {

    public static ExerciseReportDto from(ExerciseReport report) {
        return new ExerciseReportDto(report.getId(), report.getImgUrl());
    }
}
