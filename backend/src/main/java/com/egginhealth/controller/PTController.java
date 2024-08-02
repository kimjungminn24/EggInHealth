package com.egginhealth.controller;

import com.egginhealth.data.dto.PtPlanDto;
import com.egginhealth.service.PTPlanService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/pt/plan")
@RequiredArgsConstructor
public class PTController {

    private final PTPlanService ptPlanService;

    @GetMapping("/{id}")
    public ResponseEntity<List<PtPlanDto>> getPTPlans(@PathVariable int id, @RequestParam("year") int year, @RequestParam("month") int month){
        return new ResponseEntity<>(ptPlanService.getPTPlans(id,year,month), HttpStatus.OK);
    }

    @GetMapping("/top")
    public ResponseEntity<List<PtPlanDto>> getTopPTPlans(@RequestParam("id") int id, @RequestParam("cnt") int cnt){
        return new ResponseEntity<>(ptPlanService.getTopPTPlans(id,cnt),HttpStatus.OK);
    }


}
