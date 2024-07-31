package com.egginhealth.service;

import com.egginhealth.data.dto.member.MemberDto;
import com.egginhealth.data.dto.member.MemberSurveyDto;
import com.egginhealth.data.dto.member.NaverMemberDto;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.entity.Role;
import com.egginhealth.data.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberDto login(NaverMemberDto naverMemberDto) {

        Member member = memberRepository.findByEmail(naverMemberDto.getEmail()).orElseGet(() ->
                memberRepository.save(Member.createMember(naverMemberDto)));

        return MemberDto.from(member);

    }

    public void patchMemberBy(MemberSurveyDto memberSurveyDto, int memberId) {

        Member member = memberRepository.getOne(memberId);
        member.updateMemberBy(memberSurveyDto);

    }

    public void patchMemberRoleBy(String roleStr, int memberId) {

        Member member = memberRepository.getOne(memberId);
        member.updateMemberRoleBy(Role.valueOf(roleStr.trim().toUpperCase()));

    }


}