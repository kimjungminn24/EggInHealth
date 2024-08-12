package com.egginhealth.service;

import com.egginhealth.data.dto.AuthCodeDto;
import com.egginhealth.data.dto.member.MemberDetailDto;
import com.egginhealth.data.entity.AuthCode;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.repository.AuthCodeRepository;
import com.egginhealth.data.repository.MemberRepository;
import com.egginhealth.util.RandomCodeUtil;
import com.egginhealth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthCodeService {

    private final AuthCodeRepository authCodeRepository;
    private final MemberRepository memberRepository;

    public AuthCodeDto getAuthCode() {
        String code;

        do {
            code = RandomCodeUtil.generateCode();
        } while (authCodeRepository.findById(code).isPresent());

        AuthCode authCode = authCodeRepository.save(AuthCode.createAuthCode(code, SecurityUtil.getUserId()));
        return AuthCodeDto.from(authCode);
    }

    public MemberDetailDto checkAuthCode(String code) {
        AuthCode authCode = authCodeRepository.findById(code)
                .orElseThrow(() -> new IllegalArgumentException("Invalid auth code: " + code));

        int trainerId = authCode.getTrainerId();
        Member trainer = memberRepository.findById(trainerId)
                .orElseThrow(() -> new IllegalArgumentException("Trainer not found for ID: " + trainerId));

        Member member = memberRepository.findById(SecurityUtil.getUserId())
                .orElseThrow(() -> new IllegalStateException("Current user not found"));

        member.updateMemberTrainerBy(trainer);
        return MemberDetailDto.from(member, trainer);
    }


}
