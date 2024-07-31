package com.egginhealth.controller;


import com.egginhealth.data.dto.member.MemberSurveyDto;
import com.egginhealth.service.MemberService;
import com.egginhealth.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PatchMapping
    public ResponseEntity<Void> patchMemberBy(@RequestBody @Valid MemberSurveyDto memberSurveyDto) {

        memberService.patchMemberBy(memberSurveyDto, SecurityUtil.getUserId());
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PatchMapping("/role")
    public ResponseEntity<Void> patchMemberRoleBy(@RequestBody Map<String, String> role) {

        memberService.patchMemberRoleBy(role.get("role"), SecurityUtil.getUserId());
        return new ResponseEntity<>(HttpStatus.OK);

    }


}
