package com.egginhealth.service;

import com.egginhealth.data.dto.bodycomposition.BodyCompositionDto;
import com.egginhealth.data.dto.bodycomposition.BodyCompositionInputDto;
import com.egginhealth.data.entity.BodyCompositionData;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.repository.BodyCompositionDataRepository;
import com.egginhealth.data.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

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

    public List<BodyCompositionDto> getBodyCompositions(int memberId, int year, int month) {
        return bodyCompositionDataRepository.findByMemberId(memberId, year, month)
                .stream()
                .map(BodyCompositionDto::from)
                .toList();
    }

    public void updateBodyComposition(int id, BodyCompositionInputDto bodyCompositionInputDto) throws IOException {
        BodyCompositionData bodyCompositionData = bodyCompositionDataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BodyComposition not found"));

        s3Service.delete(bodyCompositionData.getImageUrl());
        String url = s3Service.upload(bodyCompositionInputDto.image(), DIR_NAME);

        BodyCompositionData updateData = BodyCompositionData.builder()
                .height(bodyCompositionInputDto.height())
                .weight(bodyCompositionInputDto.weight())
                .muscle(bodyCompositionInputDto.muscle())
                .fat(bodyCompositionInputDto.fat())
                .bmi(bodyCompositionInputDto.bmi())
                .compositionScore(bodyCompositionInputDto.compositionScore())
                .imageUrl(url)
                .member(bodyCompositionData.getMember())
                .build();

        bodyCompositionDataRepository.save(updateData);
    }

    public boolean deleteBodyComposition(int id) {
        if (!bodyCompositionDataRepository.existsById(id)) {
            return false;
        }
        bodyCompositionDataRepository.deleteById(id);
        return true;
    }

}
