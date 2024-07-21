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
    @Column(precision = 3, scale = 2)
    private BigDecimal bodyHeight;
    @Column(precision = 3, scale = 2)
    private BigDecimal bodyWeight;
    @Column(precision = 3, scale = 2)
    private BigDecimal bodyMuscle;
    @Column(precision = 3, scale = 2)
    private BigDecimal bodyFat;
    @Column(precision = 3, scale = 2)
    private BigDecimal bodyBmi;
    @Column(precision = 3, scale = 2)
    private BigDecimal bodyCompositionScore;
    @Column(length = 500)
    private String bodyUrlImg;
    private LocalDateTime bodyCreatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mem_id")
    private Member member;

}
