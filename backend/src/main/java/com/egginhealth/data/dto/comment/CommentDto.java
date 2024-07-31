package com.egginhealth.data.dto.comment;

import com.egginhealth.data.entity.Comment;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record CommentDto(
        int id,
        String content,
        LocalDateTime localDateTime,
        int boardId,
        String boardType
    ) {
        public static CommentDto from(Comment comment){
            return CommentDto.builder()
                    .id(comment.getId())
                    .content(comment.getContent())
                    .localDateTime(comment.getCreatedAt())
                    .boardId(comment.getBoardId())
                    .boardType(comment.getBoardType())
                    .build();
        }
    }
