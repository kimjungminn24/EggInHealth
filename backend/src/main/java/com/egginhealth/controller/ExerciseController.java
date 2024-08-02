package com.egginhealth.controller;


import com.egginhealth.data.dto.exercise.ExerciseReportInputDto;
import com.egginhealth.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/exercise")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;


    @PostMapping("/report")
    public ResponseEntity<Void> postExerciseReportBy(@ModelAttribute ExerciseReportInputDto inputData) throws IOException {

        exerciseService.saveExerciseReport(inputData);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }
}
