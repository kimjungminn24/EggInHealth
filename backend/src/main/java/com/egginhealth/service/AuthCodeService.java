package com.egginhealth.service;

import com.egginhealth.data.dto.AuthCodeDto;
import com.egginhealth.data.entity.AuthCode;
import com.egginhealth.data.repository.AuthCodeRepository;
import com.egginhealth.util.RandomCodeUtil;
import com.egginhealth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthCodeService {

    private final AuthCodeRepository authCodeRepository;

    public AuthCodeDto getAuthCode() {
        String code;

        do {
            code = RandomCodeUtil.generateCode();
        } while (authCodeRepository.findById(code).isPresent());

        AuthCode authCode = authCodeRepository.save(AuthCode.createAuthCode(code, SecurityUtil.getUserId()));
        return AuthCodeDto.from(authCode);
    }

}
