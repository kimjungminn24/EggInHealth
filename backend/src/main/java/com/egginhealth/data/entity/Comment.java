package com.egginhealth.data.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
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
}
