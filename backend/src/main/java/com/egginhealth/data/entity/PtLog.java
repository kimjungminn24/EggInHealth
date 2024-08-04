package com.egginhealth.data.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "pt_log")
public class PtLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ptl_id", nullable = false)
    private int id;

    @Column(name = "ptl_change", nullable = false)
    private int change;

    @Column(name = "ptl_remaining_pt", nullable = false)
    private int remainingPt;

    @Column(name = "ptl_updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mem_id")
    private Member member;

}
