package com.egginhealth.service;

import com.egginhealth.data.dto.pt.PtLogUpdateDto;
import com.egginhealth.data.dto.pt.PtPlanDto;
import com.egginhealth.data.dto.pt.PtPlanInputDto;
import com.egginhealth.data.dto.pt.PtPlanUpdateDto;
import com.egginhealth.data.dto.pt.PtTrainerPlanDto;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.entity.PtPlan;
import com.egginhealth.data.repository.MemberRepository;
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

    private final PtPlanRepository ptPlanRepository;
    private final PtLogService ptLogService;
    private final MemberRepository memberRepository;

    public List<PtPlanDto> getPTPlans(int memberId, int year, int month) {
        return ptPlanRepository.findByMemberId(memberId, year, month)
                .stream()
                .map(PtPlanDto::from)
                .toList();
    }

    public List<PtPlanDto> getTopPTPlans(int memberId, int cnt) {
        Pageable pageable = PageRequest.of(0, cnt);
        return ptPlanRepository.findByMemberTopNow(memberId, LocalDate.now().atStartOfDay(), pageable)
                .stream()
                .map(PtPlanDto::from)
                .toList();
    }

    public void checkPtPlan() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime start = now.minusMinutes(30);

        ptPlanRepository.findPtPlansByTimeRange(start, now)
                .filter(list -> !list.isEmpty())
                .ifPresent(list -> list.stream()
                        .map(plan -> PtLogUpdateDto.from(plan.getMember().getId(), -1))
                        .forEach(ptLogService::updatePtLog));

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

        LocalDateTime date = DateTimeUtil.getStringToDateTime(ptPlanInputDto.date());
        LocalDateTime createdAt = DateTimeUtil.getStringToDateTime(ptPlanInputDto.createdAt());

        PtPlan planData = PtPlan.builder()
                .date(date)
                .createdAt(createdAt)
                .member(member)
                .build();

        ptPlanRepository.save(planData);
    }

    public void registerUpdatePTPlan(PtPlanUpdateDto ptPlanUpdateDto) {
        LocalDateTime date = DateTimeUtil.getStringToDateTime(ptPlanUpdateDto.date());

        PtPlan ptPlan = ptPlanRepository.findById(ptPlanUpdateDto.id())
                .orElseThrow(() -> new RuntimeException("PTPlan not found"));

        ptPlan.updatePtPlanBy(date);
    }

    public boolean registerDelete(int id) {
        ptPlanRepository.deleteById(id);
        return true;
    }
}
