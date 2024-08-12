package com.egginhealth.service;

import com.egginhealth.data.dto.pt.*;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.entity.PtPlan;
import com.egginhealth.data.repository.FeedbackRepository;
import com.egginhealth.data.repository.MemberRepository;
import com.egginhealth.data.repository.MemberStatusRepository;
import com.egginhealth.data.repository.PtPlanRepository;
import com.egginhealth.util.DateTimeUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PTPlanService {

    private final MemberStatusRepository memberStatusRepository;
    private final PtPlanRepository ptPlanRepository;
    private final PtLogService ptLogService;
    private final MemberRepository memberRepository;
    private final FeedbackRepository feedbackRepository;

    public List<PtPlanDto> getPTPlans(int memberId, int year, int month) {
        return ptPlanRepository.findByMemberId(memberId, year, month)
                .stream()
                .map(PtPlanDto::from)
                .toList();
    }

    public List<PtPlanTopDto> getTopPTPlans(int memberId, int cnt) {
        Pageable pageable = PageRequest.of(0, cnt);
        return ptPlanRepository.findByMemberTopNow(memberId, LocalDate.now().atStartOfDay(), pageable)
                .stream()
                .map(PtPlanTopDto::from)
                .toList();
    }

    public void decreasePtCount() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime start = now.minusMinutes(30);

        ptPlanRepository.findPtPlansByTimeRange(start, now)
                .filter(list -> !list.isEmpty())
                .ifPresent(list -> list.stream()
                        .map(plan -> PtUpdateDto.from(plan.getMember().getId(), -1))
                        .forEach(ptLogService::updatePtCount));

    }


    public List<PtTrainerPlanDto> getTrainerPTPlans(int trainerId, int year, int month) {
        return ptPlanRepository.findByTrainerMemberId(trainerId, year, month)
                .stream()
                .map(PtTrainerPlanDto::from)
                .toList();
    }

    public void registerPTPlan(PtPlanInputDto ptPlanInputDto) {
        Member member = memberRepository.findById(ptPlanInputDto.memberId())
                .orElseThrow(() -> new RuntimeException("not found Member"));

        LocalDateTime startTime = DateTimeUtil.getStringToDateTime(ptPlanInputDto.startTime());
        LocalDateTime endTime = DateTimeUtil.getStringToDateTime(ptPlanInputDto.endTime());
        LocalDateTime createdAt = DateTimeUtil.getStringToDateTime(ptPlanInputDto.createdAt());

        ptPlanRepository.save(PtPlan.registerPtPlanBy(startTime, endTime, createdAt, member));
    }

    public void registerUpdatePTPlan(PtPlanUpdateDto ptPlanUpdateDto) {
        LocalDateTime startTime = DateTimeUtil.getStringToDateTime(ptPlanUpdateDto.startTime());
        LocalDateTime endTime = DateTimeUtil.getStringToDateTime(ptPlanUpdateDto.endTime());
        LocalDateTime updatedAt = LocalDateTime.now();

        PtPlan ptPlan = ptPlanRepository.findById(ptPlanUpdateDto.id())
                .orElseThrow(() -> new RuntimeException("PTPlan not found"));

        ptPlan.updatePtPlanBy(startTime, endTime, updatedAt);
    }

    public boolean registerDelete(int id) {
        ptPlanRepository.deleteById(id);
        return true;
    }
}
