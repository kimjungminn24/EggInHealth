package com.egginhealth.service;

import com.egginhealth.data.dto.member.*;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.entity.Role;
import com.egginhealth.data.repository.MemberRepository;
import com.egginhealth.util.SecurityUtil;
import com.egginhealth.util.SecurityUtil;
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

    public MemberDetailDto getMemberDetail(int memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("not found Member"));

        return MemberDetailDto.from(member, member.getTrainer());
    }

    public boolean isMember(int memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("not found Member"));

        return member.getType() == Role.MEMBER;
    }

    public MemberRoleAndIdDto getMemberRoleAndId() {
        int memberID = SecurityUtil.getUserId();
        Member member = memberRepository.findById(memberID)
                .orElseThrow(() -> new IllegalArgumentException("not found Member"));
        return MemberRoleAndIdDto.from(member.getType().name(), member.getId());
    }


}
