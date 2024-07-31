package com.egginhealth.controller;

import com.egginhealth.data.dto.comment.CommentInputDto;
import com.egginhealth.data.dto.diet.DietInputDto;
import com.egginhealth.service.DietService;
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
@RequestMapping("diet")
@RequiredArgsConstructor
public class DietController {

    private final DietService dietService;

    @PostMapping
    public ResponseEntity<Map<String,Integer>> register(@ModelAttribute DietInputDto inputData) throws IOException {
        return new ResponseEntity<>(dietService.save(inputData, SecurityUtil.getUserId()), HttpStatus.CREATED);
    }

    @PostMapping("/comment")
    public ResponseEntity<Void> registerComment(@ModelAttribute CommentInputDto inputData) throws IOException
    {
        dietService.saveComment(inputData,SecurityUtil.getUserId());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }



}
