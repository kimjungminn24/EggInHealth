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
        Member trainer = findMemberOrThrow(trainerId);
        Member member = findMemberOrThrow(SecurityUtil.getUserId());

        member.updateMemberTrainerBy(trainer);
        return MemberDetailDto.from(member, trainer);
    }

    public void disconnectTrainer(int memberId) {
        Member member = findMemberOrThrow(memberId);
        Member trainer = member.getTrainer();
        int currentId = SecurityUtil.getUserId();

        if (trainer == null) {
            throw new IllegalStateException("Member does not have a trainer.");
        }

        if (currentId != memberId && currentId != trainer.getId()) {
            throw new IllegalArgumentException("You can't disconnect other member's trainer");
        }
        
        member.disconnectTrainer();
    }

    private Member findMemberOrThrow(int memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found for ID: " + memberId));
    }


}
