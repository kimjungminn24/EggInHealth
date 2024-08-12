package com.egginhealth.controller;

import com.egginhealth.data.dto.EggListDto;
import com.egginhealth.service.MemberStatusService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/total")
@RequiredArgsConstructor
public class TotalController {

    private final MemberStatusService statusService;

    @GetMapping
    public ResponseEntity<EggListDto> getMonthEggsList(@RequestParam("uid") int uid, @RequestParam("year") int year, @RequestParam("month") int month) {
        return new ResponseEntity<>(statusService.getEggList(uid, year, month), HttpStatus.OK);

    }

}
