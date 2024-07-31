package com.egginhealth.data.dto.comment;

import com.egginhealth.data.entity.Comment;
import com.egginhealth.data.entity.Member;

import java.time.LocalDateTime;

public record CommentInputDto(
        String content,
        LocalDateTime localDateTime,
        int boardId,
        String boardType,
        int memberId
) {

}
