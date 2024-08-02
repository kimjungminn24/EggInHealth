package com.egginhealth.controller;


import com.egginhealth.data.dto.exercise.ExerciseCommentDto;
import com.egginhealth.data.dto.exercise.ExerciseDto;
import com.egginhealth.data.dto.exercise.ExerciseReportInputDto;
import com.egginhealth.data.dto.exercise.ExerciseSetDto;
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

    @GetMapping("/{uid}")
    public ResponseEntity<ExerciseDto> getExercise(@PathVariable int uid, @RequestParam int year, @RequestParam int month, @RequestParam int day) {

        ExerciseDto exerciseDto = exerciseService.getExercise(uid, year, month, day);
        System.out.println(exerciseDto.comments());
        return new ResponseEntity<>(exerciseDto, HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<Void> postExerciseSetBy(@RequestBody ExerciseSetDto inputData) {

        exerciseService.saveExerciseSet(inputData);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    @PostMapping("/report")
    public ResponseEntity<Void> postExerciseReportBy(@ModelAttribute ExerciseReportInputDto inputData) throws IOException {

        exerciseService.saveExerciseReport(inputData);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/comment")
    public ResponseEntity<Void> postExerciseCommentBy(@RequestBody ExerciseCommentDto inputData) {

        exerciseService.saveExerciseComment(inputData);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }


}
