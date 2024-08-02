package com.egginhealth.data.dto.exercise;

import com.egginhealth.data.dto.comment.CommentDto;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.entity.exercise.ExerciseHomework;
import com.egginhealth.data.entity.exercise.ExerciseReport;
import lombok.Builder;

import java.util.List;


@Builder
public record ExerciseDto(
        Integer boardId,
        Integer trainerId,
        Integer memberId,
        String reportImgUrl,
        List<ExerciseSetDto> sets,
        List<CommentDto> comments
) {

    public static ExerciseDto from(ExerciseHomework homework, Member member, List<ExerciseSetDto> sets, List<CommentDto> comments, ExerciseReport report) {

        // TODO : 트레이너 연결 API 구현 후  예외처리 변경
        return ExerciseDto.builder()
                .boardId(homework == null ? null : homework.getId())
                .trainerId(member.getTrainer() == null ? null : member.getTrainer().getId())
                .memberId(member.getId())
                .reportImgUrl(report == null ? null : report.getImgUrl())
                .sets(sets.isEmpty() ? null : sets)
                .comments(comments.isEmpty() ? null : comments)
                .build();
    }

}
