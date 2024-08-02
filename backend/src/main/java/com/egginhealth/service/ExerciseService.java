package com.egginhealth.service;

import com.egginhealth.data.dto.exercise.ExerciseInputDto;
import com.egginhealth.data.dto.exercise.ExerciseReportInputDto;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.entity.exercise.ExerciseHomework;
import com.egginhealth.data.entity.exercise.ExerciseReport;
import com.egginhealth.data.entity.exercise.ExerciseSet;
import com.egginhealth.data.repository.MemberRepository;
import com.egginhealth.data.repository.exercise.ExerciseHomeworkRepository;
import com.egginhealth.data.repository.exercise.ExerciseReportRepository;
import com.egginhealth.data.repository.exercise.ExerciseSetRepository;
import com.egginhealth.util.DateTimeUtil;
import com.egginhealth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class ExerciseService {

    private static final String DIR_NAME = "exercise";

    private final ExerciseSetRepository exerciseSetRepository;
    private final ExerciseHomeworkRepository exerciseHomeworkRepository;
    private final ExerciseReportRepository exerciseReportRepository;
    private final S3Service s3Service;
    private final MemberRepository memberRepository;

    public void saveExerciseSet(ExerciseInputDto exerciseInputDto) {

        int memberId = SecurityUtil.getUserId();
        LocalDateTime date = DateTimeUtil.getStringToDateTime(exerciseInputDto.date());

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));

        exerciseHomeworkRepository.findByMemberIdAndDate(memberId, date).orElseGet(() -> {
            ExerciseHomework newExerciseHomework = ExerciseHomework.createExerciseHomework(date, member);
            return exerciseHomeworkRepository.save(newExerciseHomework);
        });

        exerciseSetRepository.save(ExerciseSet.createExerciseSet(exerciseInputDto));

    }

    public void saveExerciseReport(ExerciseReportInputDto exerciseReportInputDto) throws IOException {

        String url = s3Service.upload(exerciseReportInputDto.image(), DIR_NAME);
        Member member = memberRepository.findById(SecurityUtil.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));

        exerciseReportRepository.save(ExerciseReport.createExerciseReport(member, url, exerciseReportInputDto.date()));
    }


}