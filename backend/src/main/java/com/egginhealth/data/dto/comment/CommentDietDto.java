package com.egginhealth.data.dto.comment;

import com.egginhealth.data.entity.Comment;

import java.time.LocalDateTime;

public record CommentDietDto(
        int id,
        String content,
        LocalDateTime createdAt,
        int boardId,
        String boardType,
        int writerId
) {

    public static CommentDietDto from(Comment comment) {
        return new CommentDietDto(
                comment.getId(),
                comment.getContent(),
                comment.getCreatedAt(),
                comment.getBoardId(),
                comment.getBoardType(),
                comment.getMember().getId());
    }
}
