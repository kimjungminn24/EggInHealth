package com.egginhealth.controller;

import com.egginhealth.data.dto.pt.PtLogDto;
import com.egginhealth.data.dto.pt.PtPlanDto;
import com.egginhealth.data.dto.pt.PtPlanInputDto;
import com.egginhealth.data.dto.pt.PtTrainerPlanDto;
import com.egginhealth.service.PTPlanService;
import com.egginhealth.service.PtLogService;
import com.egginhealth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/pt")
@RequiredArgsConstructor
public class PTController {

    private final PTPlanService ptPlanService;
    private final PtLogService ptLogService;

    @GetMapping("/plan/{uid}")
    public ResponseEntity<List<PtPlanDto>> getPTPlans(@PathVariable("uid") int uid, @RequestParam("year") int year, @RequestParam("month") int month) {
        return new ResponseEntity<>(ptPlanService.getPTPlans(uid, year, month), HttpStatus.OK);
    }

    @GetMapping("/plan/top")
    public ResponseEntity<List<PtPlanDto>> getTopPTPlans(@RequestParam("id") int id, @RequestParam("cnt") int cnt) {
        return new ResponseEntity<>(ptPlanService.getTopPTPlans(id, cnt), HttpStatus.OK);
    }

    @GetMapping("/log/{uid}")
    public ResponseEntity<List<PtLogDto>> getPTLogs(@PathVariable("uid") int uid) {
        return new ResponseEntity<>(ptLogService.getPtLogs(uid), HttpStatus.OK);
    }

    @GetMapping("/plan")
    public ResponseEntity<List<PtTrainerPlanDto>> getTrainerPTPlans(@RequestParam("year") int year, @RequestParam("month") int month) {
        return new ResponseEntity<>(ptPlanService.getTrainerPTPlans(SecurityUtil.getUserId(), year, month), HttpStatus.OK);
    }

    @PostMapping("/plan")
    public ResponseEntity<Void> registerPTPlan(@RequestBody PtPlanInputDto ptPlanInputDto) {
        ptPlanService.registerPTPlan(ptPlanInputDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
