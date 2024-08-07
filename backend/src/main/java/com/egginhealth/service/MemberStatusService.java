package com.egginhealth.service;

import com.egginhealth.data.dto.memberstatus.MemberMonthStatusDto;
import com.egginhealth.data.dto.memberstatus.MemberStatusDto;
import com.egginhealth.data.dto.memberstatus.MemberStatusInputDto;
import com.egginhealth.data.entity.Feedback;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.entity.MemberStatus;
import com.egginhealth.data.repository.FeedbackRepository;
import com.egginhealth.data.repository.MemberRepository;
import com.egginhealth.data.repository.MemberStatusRepository;
import com.egginhealth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberStatusService {

    private final MemberStatusRepository memberStatusRepository;
    private final MemberRepository memberRepository;
    private final FeedbackRepository feedbackRepository;

    // TODO: 회원 집계 저장 메서드 구현
    public void saveMemberStatus(MemberStatusInputDto memberStatusInputDto) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public List<MemberMonthStatusDto> getMemberStatusByMonth(int memberId, int year, int month) {
        return memberStatusRepository.findByMemberIdAndYearAndMonth(memberId, year, month).stream()
                .map(MemberMonthStatusDto::from)
                .toList();
    }

    public List<MemberStatusDto> getMemberStatusList(int year, int month, int day) {

        Member trainer = memberRepository.findById(SecurityUtil.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("not found Member"));
        List<Member> members = memberRepository.findMembersWithStatus(trainer.getId(), year, month, day)
                .orElseThrow(() -> new IllegalArgumentException("not found Member"));

        List<Integer> memberIds = members.stream()
                .map(Member::getId)
                .collect(Collectors.toList());
        Map<Integer, Boolean> feedbackMap = feedbackRepository.findUnreadFeedbacksByIds(memberIds).stream().collect(Collectors.toMap(
                Feedback::getId,
                feedback -> !feedback.isRead()
        ));

        return members.stream()
                .map(member -> {
                    MemberStatus status = member.getStatusList().isEmpty() ? null : member.getStatusList().get(0);
                    boolean feedback = feedbackMap.getOrDefault(member.getId(), false);
                    return MemberStatusDto.from(member, status, feedback);
                })
                .collect(Collectors.toList());
    }
}
