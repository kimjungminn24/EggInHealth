package com.egginhealth.data.entity;

import com.egginhealth.data.dto.exercise.ExerciseCommentDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cm_id", nullable = false)
    private int id;

    @Column(name = "cm_content", nullable = false, length = 255)
    private String content;

    @Column(name = "cm_created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "cm_board_id")
    private int boardId;

    @Column(name = "cm_board_type", nullable = false)
    private String boardType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mem_id")
    private Member member;

    public static Comment createComment(ExerciseCommentDto dto, Member member) {
        Comment comment = new Comment();
        comment.content = dto.content();
        comment.boardId = dto.boardId();
        comment.boardType = dto.boardType();
        comment.member = member;
        comment.createdAt = LocalDateTime.now();
        return comment;
    }
}
