package com.egginhealth.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/total")
@RequiredArgsConstructor
public class TotalController {

    @GetMapping
    public ResponseEntity<int[]> getMonthEggsList(@RequestParam("uid") int id, @RequestParam("year") int year, @RequestParam("month") int month){
        int[] monthArr = new int[31];

        for(int i=0;i<31;i++){
            monthArr[i] = i;
            if(i>12)
                monthArr[i] = -1;
        }

        return ResponseEntity.ok(monthArr);
    }

}
