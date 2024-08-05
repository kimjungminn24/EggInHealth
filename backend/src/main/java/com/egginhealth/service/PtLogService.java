package com.egginhealth.service;

import com.egginhealth.data.dto.pt.PtLogDto;
import com.egginhealth.data.entity.PtLog;
import com.egginhealth.data.repository.PtLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PtLogService {

    private final PtLogRepository ptLogRepository;

    public List<PtLogDto> getPtLogs(int memberId){
        return ptLogRepository.findByMemberIdPtLog(memberId)
                .stream()
                .map(PtLogDto::from)
                .toList();
    }

}
