package com.egginhealth.data.controller;

import com.egginhealth.data.dto.CommonCodeDto;
import com.egginhealth.service.CommonCodeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/common")
@RequiredArgsConstructor
public class CommonCodeController {

    private final CommonCodeService commonCodeService;

    @GetMapping
    public ResponseEntity<List<CommonCodeDto>> getCommonCodeBy(@RequestParam("group") String groupCode) {
        List<CommonCodeDto> codes = commonCodeService.getCommonCodesByGroupId(groupCode);
        return new ResponseEntity<>(codes, HttpStatus.OK);
    }
}