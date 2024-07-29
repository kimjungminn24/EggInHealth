package com.egginhealth.controller;

import com.egginhealth.data.dto.MemberStatusDto;
import com.egginhealth.service.MemberStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/status")
@RequiredArgsConstructor
public class MemberStatusController {

    private final MemberStatusService memberStatusService;

    @GetMapping("/{uid}")
    public ResponseEntity<List<MemberStatusDto>> getMonthlyMemberStatus(@PathVariable("uid") int id, @RequestParam("year") int year, @RequestParam("month") int month) {
        return new ResponseEntity<>(memberStatusService.getMemberStatusByMonth(id, year, month), HttpStatus.OK);
    }
}
