package com.egginhealth.controller;

import com.egginhealth.data.dto.memberstatus.MemberMonthStatusDto;
import com.egginhealth.data.dto.memberstatus.MemberStatusDto;
import com.egginhealth.service.MemberStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/status")
@RequiredArgsConstructor
public class MemberStatusController {

    private final MemberStatusService memberStatusService;

    @GetMapping("/{uid}")
    public ResponseEntity<List<MemberMonthStatusDto>> getMonthlyMemberStatus(@PathVariable("uid") int id, @RequestParam("year") int year, @RequestParam("month") int month) {
        return new ResponseEntity<>(memberStatusService.getMemberStatusByMonth(id, year, month), HttpStatus.OK);
    }

    @GetMapping("/trainer/member")
    public ResponseEntity<List<MemberStatusDto>> getMemberStatusList(@RequestParam("year") int year, @RequestParam("month") int month, @RequestParam("day") int day) {
        return new ResponseEntity<>(memberStatusService.getMemberStatusList(year, month, day), HttpStatus.OK);
    }

}
