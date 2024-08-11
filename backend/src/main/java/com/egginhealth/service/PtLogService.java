package com.egginhealth.service;

import com.egginhealth.data.dto.pt.PtLogDto;
import com.egginhealth.data.dto.pt.PtUpdateDto;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.entity.PtLog;
import com.egginhealth.data.repository.MemberRepository;
import com.egginhealth.data.repository.PtLogRepository;
import com.egginhealth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PtLogService {

    private final PtLogRepository ptLogRepository;
    private final MemberRepository memberRepository;
    private final SecurityUtil securityUtil;

    public List<PtLogDto> getPtLogs(int memberId) {
        return ptLogRepository.findByMemberIdPtLog(memberId)
                .stream()
                .map(PtLogDto::from)
                .toList();
    }


    public void updatePtCount(PtUpdateDto ptLogDto) {
        Member member = findMemberOrThrow(ptLogDto.memberId());
        int newPtCount = calculateAndValidatePtCount(member.getPTCount(), ptLogDto.change());
        member.updateMemberPtCountBy(newPtCount);
        updatePtLog(ptLogDto.change(), member, newPtCount);
    }

    private void updatePtLog(int change, Member member, int newPtCount) {
        PtLog ptLog = PtLog.createPtLog(change, member, newPtCount);
        ptLogRepository.save(ptLog);
    }

    private Member findMemberOrThrow(int memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
    }

    private int calculateAndValidatePtCount(int currentPtCount, int change) {
        return Optional.of(currentPtCount + change)
                .filter(ptCount -> ptCount >= 0)
                .orElseThrow(() -> new IllegalArgumentException("Value cannot be negative"));
    }


}
