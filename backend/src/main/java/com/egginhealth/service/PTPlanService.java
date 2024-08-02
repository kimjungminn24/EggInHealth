package com.egginhealth.service;

import com.egginhealth.data.dto.PtPlanDto;
import com.egginhealth.data.repository.PtPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PTPlanService {

    private final PtPlanRepository ptPlanRepository;

    public List<PtPlanDto> getPTPlans(int memberId, int year, int month){
        return ptPlanRepository.findByMemberId(memberId,year,month)
                .stream()
                .map(PtPlanDto::from)
                .toList();
    }

    public List<PtPlanDto> getTopPTPlans(int memberId, int cnt){
        Pageable pageable = PageRequest.of(0,cnt);
        return ptPlanRepository.findByMemberTopNow(memberId, LocalDate.now().atStartOfDay(), pageable)
                .stream()
                .map(PtPlanDto::from)
                .toList();
    }
}
