package com.egginhealth.data.dto.exercise;

import org.springframework.web.multipart.MultipartFile;

public record ExerciseReportInputDto(
        String date,
        MultipartFile image
) {

}
