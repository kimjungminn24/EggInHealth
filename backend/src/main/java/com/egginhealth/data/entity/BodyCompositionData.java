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
@Table(name = "body_composition_data")
public class BodyCompositionData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "body_id", nullable = false)
    private int id;

    @Column(name = "body_height", precision = 3, scale = 2)
    private BigDecimal height;

    @Column(name = "body_weight", precision = 3, scale = 2)
    private BigDecimal weight;

    @Column(name = "body_muscle", precision = 3, scale = 2)
    private BigDecimal muscle;

    @Column(name = "body_fat", precision = 3, scale = 2)
    private BigDecimal fat;

    @Column(name = "body_bmi", precision = 3, scale = 2)
    private BigDecimal bmi;

    @Column(name = "body_composition_score", precision = 3, scale = 2)
    private BigDecimal compositionScore;

    @Column(name = "body_url_img", length = 500)
    private String urlImg;

    @Column(name = "body_created_at", nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mem_id")
    private Member member;

}
