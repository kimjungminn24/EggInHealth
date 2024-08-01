package com.egginhealth.service;

import com.egginhealth.data.dto.exercise.ExerciseReportInputDto;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.entity.exercise.ExerciseReport;
import com.egginhealth.data.repository.MemberRepository;
import com.egginhealth.data.repository.exercise.ExerciseReportRepository;
import com.egginhealth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Transactional
public class ExerciseService {

    private static final String DIR_NAME = "exercise";

    private final ExerciseReportRepository exerciseReportRepository;
    private final S3Service s3Service;
    private final MemberRepository memberRepository;


    public void saveExerciseReport(ExerciseReportInputDto exerciseReportInputDto) throws IOException {

        String url = s3Service.upload(exerciseReportInputDto.image(), DIR_NAME);
        Member member = memberRepository.findById(SecurityUtil.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));

        exerciseReportRepository.save(ExerciseReport.createExerciseReport(member, url, exerciseReportInputDto.date()));
    }


}