package com.egginhealth.data.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "pt_plan")
public class PtPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pt_id", nullable = false)
    private int id;

    @Column(name = "pt_start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "pt_end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "pt_created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "pt_updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mem_id")
    private Member member;

    public static PtPlan registerPtPlanBy(LocalDateTime startTime, LocalDateTime endTime, LocalDateTime createdAt, Member member) {
        return PtPlan.builder()
                .startTime(startTime)
                .endTime(endTime)
                .createdAt(createdAt)
                .member(member)
                .build();
    }

    public void updatePtPlanBy(LocalDateTime startTime, LocalDateTime endTime, LocalDateTime updatedAt) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.updatedAt = updatedAt;
    }

}
