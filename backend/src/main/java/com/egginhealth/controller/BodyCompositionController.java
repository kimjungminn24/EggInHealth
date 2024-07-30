package com.egginhealth.controller;

import com.egginhealth.data.dto.bodycomposition.BodyCompositionDto;
import com.egginhealth.data.dto.bodycomposition.BodyCompositionInputDto;
import com.egginhealth.service.BodyCompositionDataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/body")
@RequiredArgsConstructor
public class BodyCompositionController {

    private final BodyCompositionDataService bodyCompositionDataService;

    @PostMapping
    public ResponseEntity<Void> register(@ModelAttribute BodyCompositionInputDto inputData) throws IOException {
        bodyCompositionDataService.save(inputData);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{uid}")
    public ResponseEntity<List<BodyCompositionDto>> getBodyCompositions(@PathVariable("uid") int id, @RequestParam("year") int year, @RequestParam("month") int month) {
        return new ResponseEntity<>(bodyCompositionDataService.getBodyCompositions(id, year, month), HttpStatus.OK);
    }

}
