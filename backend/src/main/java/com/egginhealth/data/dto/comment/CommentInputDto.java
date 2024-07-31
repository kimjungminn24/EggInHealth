package com.egginhealth.data.dto.comment;

public record CommentInputDto(
        String content,
        String createdAt,
        int boardId,
        String boardType
) {

}
