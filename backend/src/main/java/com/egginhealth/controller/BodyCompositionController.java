package com.egginhealth.controller;

import com.egginhealth.data.dto.bodycomposition.BodyCompositionInputDto;
import com.egginhealth.service.BodyCompositionDataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@Slf4j
@RequestMapping("/api/body")
@RequiredArgsConstructor
public class BodyCompositionController {

    private final BodyCompositionDataService bodyCompositionDataService;

    @PostMapping
    public ResponseEntity<Void> register(@ModelAttribute BodyCompositionInputDto inputData) throws IOException {
        log.info(inputData.memberId() + "!!!!!!!!!!!!");
        bodyCompositionDataService.save(inputData);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
