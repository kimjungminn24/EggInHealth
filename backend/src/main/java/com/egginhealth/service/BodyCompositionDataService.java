package com.egginhealth.service;

import com.egginhealth.data.dto.bodycomposition.BodyCompositionInputDto;
import com.egginhealth.data.entity.BodyCompositionData;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.repository.BodyCompositionDataRepository;
import com.egginhealth.data.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class BodyCompositionDataService {

    private static final String DIR_NAME = "body";

    private final MemberRepository memberRepository;
    private final BodyCompositionDataRepository bodyCompositionDataRepository;
    private final S3Service s3Service;

    public void save(BodyCompositionInputDto bodyCompositionInputDto) throws IOException {
        Member member = memberRepository.findById(bodyCompositionInputDto.memberId())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        String url = s3Service.upload(bodyCompositionInputDto.image(), DIR_NAME);

        BodyCompositionData bodyCompositionData = BodyCompositionData.builder()
                .height(bodyCompositionInputDto.height())
                .weight(bodyCompositionInputDto.weight())
                .muscle(bodyCompositionInputDto.muscle())
                .fat(bodyCompositionInputDto.fat())
                .bmi(bodyCompositionInputDto.bmi())
                .compositionScore(bodyCompositionInputDto.compositionScore())
                .imageUrl(url)
                .member(member)
                .build();

        bodyCompositionDataRepository.save(bodyCompositionData);
    }
}
