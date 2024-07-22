package com.egginhealth.data.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Feedback {

    @Id
    @Column(name = "fb_id")
    @GeneratedValue
    private int id;

    @ManyToOne
    @JoinColumn(name = "mem_id", nullable = false)
    private Member member;

    @Column(name = "fb_motion_similarity")
    private BigDecimal motionSimilarity;

    @Column(name = "fb_memo", length = 500)
    private String memo;

    @Column(name = "fb_exercise_id", nullable = false)
    private int exerciseId;

    @Column(name = "fb_video_url", length = 500)
    private String videoUrl;

    @Column(name = "fb_read")
    private boolean isRead = false;

    @Column(name = "fb_created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "fb_updated_at")
    private LocalDateTime updatedAt;
}
