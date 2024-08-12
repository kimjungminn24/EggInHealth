package com.egginhealth.data.dto.exercise;

import com.egginhealth.data.dto.comment.CommentDto;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.entity.exercise.ExerciseHomework;
import com.egginhealth.data.entity.exercise.ExerciseReport;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;


@Builder
public record ExerciseDto(
        Integer boardId,
        Integer trainerId,
        Integer memberId,
        LocalDateTime date,
        ExerciseReportDto report,
        List<ExerciseSetDto> sets,
        List<CommentDto> comments
) {

    public static ExerciseDto from(ExerciseHomework homework, Member member, List<ExerciseSetDto> sets, List<CommentDto> comments, ExerciseReport report) {

        // TODO : 트레이너 연결 API 구현 후  예외처리 변경
        return ExerciseDto.builder()
                .date(homework == null ? null : homework.getDate())
                .boardId(homework == null ? null : homework.getId())
                .trainerId(member.getTrainer() == null ? null : member.getTrainer().getId())
                .memberId(member.getId())
                .report(report == null ? null : ExerciseReportDto.from(report))
                .sets(sets != null ? sets : Collections.emptyList())
                .comments(comments != null ? comments : Collections.emptyList())
                .build();
    }

}
