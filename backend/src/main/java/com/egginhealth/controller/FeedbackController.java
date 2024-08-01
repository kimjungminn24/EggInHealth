package com.egginhealth.controller;

import com.egginhealth.data.dto.feedback.FeedbackDto;
import com.egginhealth.data.dto.feedback.FeedbackInputDto;
import com.egginhealth.service.FeedbackService;
import com.egginhealth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/feedback")
@RequiredArgsConstructor
@Transactional
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<Map<String,Integer>> register(@ModelAttribute FeedbackInputDto inputData) throws IOException{
        return new ResponseEntity<>(feedbackService.save(inputData, SecurityUtil.getUserId()), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<FeedbackDto>> getFeedbackList(@PathVariable int id){
        return new ResponseEntity<>(feedbackService.getFeedbackList(id,SecurityUtil.getUserId()), HttpStatus.OK);
    }
}
