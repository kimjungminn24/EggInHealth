package com.egginhealth.service;

import com.egginhealth.data.dto.CommonCodeDto;
import com.egginhealth.data.repository.CommonCodeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CommonCodeService {

    private final CommonCodeRepository commonCodeRepository;

    public List<CommonCodeDto> getCommonCodesByGroupId(String groupCode) {
        return commonCodeRepository.findByIdGroupCode(groupCode)
                .stream()
                .map(CommonCodeDto::from)
                .toList();
    }
}
