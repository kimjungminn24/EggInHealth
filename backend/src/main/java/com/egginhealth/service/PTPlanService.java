package com.egginhealth.service;

import com.egginhealth.data.dto.pt.PtLogUpdateDto;
import com.egginhealth.data.dto.pt.PtPlanDto;
import com.egginhealth.data.repository.PtPlanRepository;
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

}
