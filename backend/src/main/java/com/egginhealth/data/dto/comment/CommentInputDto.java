package com.egginhealth.data.dto.comment;

import java.time.LocalDateTime;

public record CommentInputDto(
        String content,
        LocalDateTime createdAt,
        int boardId,
        String boardType,
        int memberId
) {

}
