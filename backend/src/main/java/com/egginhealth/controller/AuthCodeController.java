package com.egginhealth.controller;

import com.egginhealth.data.dto.AuthCodeDto;
import com.egginhealth.service.AuthCodeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/code")
@RequiredArgsConstructor
public class AuthCodeController {

    private final AuthCodeService authCodeService;

    @GetMapping
    public ResponseEntity<AuthCodeDto> getAuthCode() {
        return new ResponseEntity<>(authCodeService.getAuthCode(), HttpStatus.OK);
    }
}
