package com.egginhealth.service;

import com.egginhealth.data.dto.MemberDto;
import com.egginhealth.data.dto.NaverMemberDto;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberDto login(NaverMemberDto naverMemberDto) {

        Member member = memberRepository.findByEmail(naverMemberDto.getEmail()).orElseGet(() ->
                memberRepository.save(Member.createMember(naverMemberDto)));

        return MemberDto.from(member);

    }


}
