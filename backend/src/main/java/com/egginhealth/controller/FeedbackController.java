package com.egginhealth.controller;

import com.egginhealth.data.dto.feedback.FeedbackInputDto;
import com.egginhealth.service.FeedbackService;
import com.egginhealth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<Map<String,Integer>> register(@ModelAttribute FeedbackInputDto inputData) throws IOException{
        return new ResponseEntity<>(feedbackService.save(inputData, SecurityUtil.getUserId()), HttpStatus.CREATED);
    }
}
