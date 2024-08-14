package com.egginhealth.data.entity;

import com.egginhealth.data.dto.feedback.FeedbackSetDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Feedback {

    @Id
    @Column(name = "fb_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "fb_memo", length = 500)
    private String memo;

    @Column(name = "fb_exercise_id", nullable = false)
    private String exerciseName;

    @Column(name = "fb_video_url", length = 500)
    private String videoUrl;

    // Getter이용해서 사용하면 에러남 isRead사용할것.
    @Column(name = "fb_read", nullable = false, columnDefinition = "tinyint(1) default 0")
    private boolean read = false;

    @Column(name = "fb_created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "fb_updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mem_id", nullable = false)
    private Member member;

    public void updateFeedbackBy(FeedbackSetDto feedbackSetDto) {
        this.memo = feedbackSetDto.memo();
        this.exerciseName = feedbackSetDto.exerciseName();
        this.updatedAt = feedbackSetDto.updatedAt();
        this.videoUrl = feedbackSetDto.url();
    }

    public void updateFeedbackRead() {
        this.read = true;
    }
}
