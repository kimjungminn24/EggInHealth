package com.egginhealth.service;

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
import java.time.LocalDateTime;
import java.util.List;

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

        ExerciseHomework homework = exerciseHomeworkRepository.findByMemberIdAndDate(uid, year, month, day).get();
        List<ExerciseSetDto> sets = homework.getExerciseSetList().stream().map(ExerciseSetDto::from).toList();
        List<CommentDto> comment = commentRepository.findByDietCommentToDay(homework.getId(), "E").stream().map(CommentDto::from).toList();
        ExerciseReport report = exerciseReportRepository.findByMemberIdAndDate(uid, year, month, day).get();

        return ExerciseDto.from(homework, member, sets, comment, report);
    }

    public ExerciseSetDto saveExerciseSet(ExerciseSetInputDto exerciseSetInputDto) {
        int memberId = SecurityUtil.getUserId();
        LocalDateTime date = DateTimeUtil.convertToLocalDateTime(exerciseSetInputDto.date());

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));

        ExerciseHomework homework = exerciseHomeworkRepository.findByMemberIdAndLocalDate(memberId, date).orElseGet(() -> {
            ExerciseHomework newExerciseHomework = ExerciseHomework.createExerciseHomework(member);
            return exerciseHomeworkRepository.save(newExerciseHomework);
        });

        return ExerciseSetDto.from(exerciseSetRepository.save(ExerciseSet.createExerciseSet(exerciseSetInputDto, homework)));
    }

    public void saveExerciseReport(ExerciseReportInputDto exerciseReportInputDto) throws IOException {
        String url = s3Service.upload(exerciseReportInputDto.image(), DIR_NAME);
        Member member = memberRepository.findById(SecurityUtil.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));
        exerciseReportRepository.save(ExerciseReport.createExerciseReport(member, url, exerciseReportInputDto.date()));
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


}