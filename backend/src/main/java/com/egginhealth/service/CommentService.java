package com.egginhealth.service;

import com.egginhealth.data.dto.comment.CommentDietDto;
import com.egginhealth.data.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {
    private final CommentRepository commentRepository;

    public List<CommentDietDto> getDietCommentToDay(int boardId, String boardType){
        return commentRepository.findByDietCommentToDay(boardId,boardType)
                .stream()
                .map(CommentDietDto::from)
                .toList();
    }
}
