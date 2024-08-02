package com.egginhealth.controller;


import com.egginhealth.data.dto.exercise.ExerciseInputDto;
import com.egginhealth.data.dto.exercise.ExerciseReportInputDto;
import com.egginhealth.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/exercise")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;

    @PostMapping()
    public ResponseEntity<Void> postExerciseSetBy(@RequestBody ExerciseInputDto inputData) {

        exerciseService.saveExerciseSet(inputData);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    @PostMapping("/report")
    public ResponseEntity<Void> postExerciseReportBy(@ModelAttribute ExerciseReportInputDto inputData) throws IOException {

        exerciseService.saveExerciseReport(inputData);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }


}
