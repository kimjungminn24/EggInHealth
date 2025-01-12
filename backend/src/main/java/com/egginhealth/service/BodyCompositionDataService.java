package com.egginhealth.service;

import com.egginhealth.data.dto.bodycomposition.BodyCompositionDto;
import com.egginhealth.data.dto.bodycomposition.BodyCompositionInputDto;
import com.egginhealth.data.dto.bodycomposition.BodyCompositionSetDto;
import com.egginhealth.data.entity.BodyCompositionData;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.repository.BodyCompositionDataRepository;
import com.egginhealth.data.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BodyCompositionDataService {

    private static final String DIR_NAME = "body";

    private final MemberRepository memberRepository;
    private final BodyCompositionDataRepository bodyCompositionDataRepository;
    private final S3Service s3Service;

    public void save(BodyCompositionInputDto bodyCompositionInputDto) throws IOException {
        Member member = memberRepository.findById(bodyCompositionInputDto.memberId())
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));

        String url = s3Service.upload(bodyCompositionInputDto.image(), DIR_NAME);

        BodyCompositionData bodyCompositionData = build(bodyCompositionInputDto, member, url);

        bodyCompositionDataRepository.save(bodyCompositionData);
    }

    public List<BodyCompositionDto> getBodyCompositions(int memberId, int year, int month) {
        return bodyCompositionDataRepository.findByMemberId(memberId, year, month)
                .stream()
                .map(BodyCompositionDto::from)
                .toList();
    }

    public void updateBodyComposition(int id, BodyCompositionInputDto bodyCompositionInputDto) throws IOException {
        BodyCompositionData bodyCompositionData = bodyCompositionDataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BodyComposition not found"));

        String prevUrl = bodyCompositionData.getImageUrl();
        s3Service.delete(DIR_NAME, prevUrl);
        String url = s3Service.upload(bodyCompositionInputDto.image(), DIR_NAME);

        BodyCompositionSetDto bodyCompositionSetDto = BodyCompositionSetDto.from(bodyCompositionInputDto, url);
        bodyCompositionData.updateBodyCompositionDataBy(bodyCompositionSetDto);
    }

    public boolean deleteBodyComposition(int id) {
        BodyCompositionData bodyCompositionData = bodyCompositionDataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BodyComposition not found"));

        s3Service.delete(DIR_NAME, bodyCompositionData.getImageUrl());
        bodyCompositionDataRepository.deleteById(id);
        return true;
    }

    private BodyCompositionData build(BodyCompositionInputDto bodyCompositionInputDto, Member member, String imageUrl) {
        return BodyCompositionData.builder()
                .height(bodyCompositionInputDto.height())
                .weight(bodyCompositionInputDto.weight())
                .muscle(bodyCompositionInputDto.muscle())
                .fat(bodyCompositionInputDto.fat())
                .fatPercentage(bodyCompositionInputDto.fatPercentage())
                .bmi(bodyCompositionInputDto.bmi())
                .compositionScore(bodyCompositionInputDto.compositionScore())
                .imageUrl(imageUrl)
                .member(member)
                .build();
    }
}
