package com.egginhealth.service;

import com.egginhealth.data.dto.memberstatus.MemberStatusDto;
import com.egginhealth.data.dto.memberstatus.MemberStatusInputDto;
import com.egginhealth.data.repository.MemberStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberStatusService {

    private final MemberStatusRepository memberStatusRepository;

    // TODO: 회원 집계 저장 메서드 구현
    public void saveMemberStatus(MemberStatusInputDto memberStatusInputDto) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public List<MemberStatusDto> getMemberStatusByMonth(int memberId, int year, int month) {
        return memberStatusRepository.findByMemberIdAndYearAndMonth(memberId, year, month).stream()
                .map(MemberStatusDto::from)
                .toList();
    }
}
