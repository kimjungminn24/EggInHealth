package com.egginhealth.data.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
    @GeneratedValue
    private int id;

    @Column(name = "mem_id")
    private int memberID;

    @Column(name = "fb_motion_similarity")
    private BigDecimal motionSimilarity;

    @Column(name = "fb_memo")
    private String memo;

    @Column(name = "fb_exercise_id")
    private int exerciseId;

    @Column(name = "fb_video_url")
    private String videoUrl;

    @Column(name = "fb_read")
    private boolean isRead;

    @Column(name = "fb_created_at")
    private LocalDateTime createdAt;

    @Column(name = "fb_updated_at")
    private LocalDateTime updatedAt;
}
