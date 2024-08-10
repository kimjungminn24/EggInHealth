package com.egginhealth.service;

import com.egginhealth.data.dto.DateDto;
import com.egginhealth.data.dto.comment.CommentDto;
import com.egginhealth.data.dto.exercise.*;
import com.egginhealth.data.entity.Comment;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.entity.exercise.ExerciseHomework;
import com.egginhealth.data.entity.exercise.ExerciseReport;
import com.egginhealth.data.entity.exercise.ExerciseSet;
import com.egginhealth.data.repository.CommentRepository;
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
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    private final CommentRepository commentRepository;


    public ExerciseDto getExercise(int uid, int year, int month, int day) {
        Member member = memberRepository.findById(uid)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));
        ExerciseReport report = exerciseReportRepository.findByMemberIdAndDate(uid, year, month, day).orElse(null);
        ExerciseHomework homework = exerciseHomeworkRepository.findByMemberIdAndDate(uid, year, month, day).orElse(null);

        if (homework == null && report == null) {
            return ExerciseDto.from(null, member, null, null, null);
        }

        int boardId = homework != null ? homework.getId() : report.getId();

        List<ExerciseSetDto> sets = Optional.ofNullable(homework)
                .map(hw -> Optional.ofNullable(hw.getExerciseSetList())
                        .orElse(Collections.emptyList()).stream()
                        .map(ExerciseSetDto::from)
                        .collect(Collectors.toList()))
                .orElse(Collections.emptyList());

        List<CommentDto> comments = commentRepository.findCommentsByBoardIdAndBoardType(boardId, "E").stream()
                .map(CommentDto::from)
                .collect(Collectors.toList());

        return ExerciseDto.from(homework, member, sets, comments, report);
    }

    public ExerciseSetDto saveExerciseSet(ExerciseSetInputDto exerciseSetInputDto) {
        int memberId = SecurityUtil.getUserId();
        DateDto date = DateTimeUtil.splitDate(exerciseSetInputDto.date());

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));

        //TODO : 날짜 조회 형식 통일
        ExerciseHomework homework = exerciseHomeworkRepository.findByMemberIdAndDate(memberId, date.year(), date.month(), date.day()).orElseGet(() ->
                exerciseHomeworkRepository.save(ExerciseHomework.createExerciseHomework(member, exerciseSetInputDto.date()))
        );

        return ExerciseSetDto.from(exerciseSetRepository.save(ExerciseSet.createExerciseSet(exerciseSetInputDto, homework)));
    }

    public ExerciseReportDto saveExerciseReport(ExerciseReportInputDto exerciseReportInputDto) throws IOException {
        String url = s3Service.upload(exerciseReportInputDto.image(), DIR_NAME);
        int memberId = SecurityUtil.getUserId();

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));

        DateDto searchDate = DateTimeUtil.splitDate(exerciseReportInputDto.date());
        String date = exerciseReportInputDto.date();

        // TODO : 날짜 조회 형식 통일
        ExerciseHomework homework = exerciseHomeworkRepository.findByMemberIdAndDate(memberId, searchDate.year(), searchDate.month(), searchDate.day()).orElseGet(() ->
                exerciseHomeworkRepository.save(ExerciseHomework.createExerciseHomework(member, date))
        );
        ExerciseReport report = exerciseReportRepository.findByMemberIdAndDate(memberId, searchDate.year(), searchDate.month(), searchDate.day()).orElseGet(() ->
                exerciseReportRepository.save(ExerciseReport.createExerciseReport(member, url, date)));
        return ExerciseReportDto.from(report);
    }

    public void saveExerciseComment(ExerciseCommentDto exerciseCommentDto) {
        Member member = memberRepository.findById(SecurityUtil.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));
        commentRepository.save(Comment.createComment(exerciseCommentDto, member));

    }

    public boolean deleteExerciseSet(int setId) {
        ExerciseSet exerciseSet = exerciseSetRepository.findById(setId)
                .orElseThrow(() -> new RuntimeException("ExerciseSet not found"));
        exerciseSetRepository.delete(exerciseSet);
        return true;
    }

    public ExerciseSetDto updateExerciseSet(ExerciseSetDto exerciseSetDto) {

        ExerciseSet exerciseSet = exerciseSetRepository.findById(exerciseSetDto.setId())
                .orElseThrow(() -> new RuntimeException("ExerciseSet not found"));
        exerciseSet.updateExerciseSet(exerciseSetDto);
        return ExerciseSetDto.from(exerciseSet);
    }

    public boolean deleteExerciseReport(int reportId) {
        ExerciseReport exerciseReport = exerciseReportRepository.findById(reportId)
                .orElseThrow(() -> new IllegalArgumentException("ExerciseReport not found"));
        s3Service.delete(DIR_NAME + exerciseReport.getImgUrl());
        exerciseReportRepository.delete(exerciseReport);
        return true;
    }


}