package com.egginhealth.controller;


import com.egginhealth.data.dto.member.MemberDetailDto;
import com.egginhealth.data.dto.member.MemberRoleDto;
import com.egginhealth.data.dto.member.MemberSurveyDto;
import com.egginhealth.service.MemberService;
import com.egginhealth.util.CookieUtil;
import com.egginhealth.util.SecurityUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class MemberController {

    private final CookieUtil cookieUtil;
    private final MemberService memberService;

    @PatchMapping
    public ResponseEntity<Void> patchMemberBy(@RequestBody @Valid MemberSurveyDto memberSurveyDto) {

        memberService.patchMemberBy(memberSurveyDto, SecurityUtil.getUserId());
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PatchMapping("/role")
    public ResponseEntity<Void> patchMemberRoleBy(@RequestBody MemberRoleDto roleDto, HttpServletResponse response) {
        memberService.patchMemberRoleBy(roleDto.role(), SecurityUtil.getUserId());
        response.addCookie(cookieUtil.createCookie("Role", roleDto.role(), false));
        SecurityUtil.updateRoleInSecurityContext(roleDto.role());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{uid}")
    public ResponseEntity<MemberDetailDto> getMemberDetail(@PathVariable("uid") int id) {
        return new ResponseEntity<>(memberService.getMemberDetail(id), HttpStatus.OK);
    }


}
