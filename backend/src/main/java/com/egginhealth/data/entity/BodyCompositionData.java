package com.egginhealth.data.entity;

import com.egginhealth.data.dto.bodycomposition.BodyCompositionSetDto;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "body_composition_data")
public class BodyCompositionData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "body_id", nullable = false)
    private int id;

    @Column(name = "body_height", precision = 5, scale = 2)
    private BigDecimal height;

    @Column(name = "body_weight", precision = 5, scale = 2)
    private BigDecimal weight;

    @Column(name = "body_muscle", precision = 5, scale = 2)
    private BigDecimal muscle;

    @Column(name = "body_fat", precision = 5, scale = 2)
    private BigDecimal fat;

    @Column(name = "body_fat_percentage", precision = 5, scale = 2)
    private BigDecimal fatPercentage;

    @Column(name = "body_bmi", precision = 4, scale = 2)
    private BigDecimal bmi;

    @Column(name = "body_composition_score", precision = 5, scale = 2)
    private BigDecimal compositionScore;

    @Column(name = "body_url_img", length = 500)
    private String imageUrl;

    @Column(name = "body_created_at", nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mem_id")
    private Member member;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public void updateBodyCompositionDataBy(BodyCompositionSetDto bodyCompositionSetDto){
        this.height = bodyCompositionSetDto.height();
        this.weight = bodyCompositionSetDto.weight();
        this.muscle = bodyCompositionSetDto.muscle();
        this.fat = bodyCompositionSetDto.fat();
        this.fatPercentage = bodyCompositionSetDto.fatPercentage();
        this.bmi = bodyCompositionSetDto.bmi();
        this.compositionScore = bodyCompositionSetDto.compositionScore();
        this.imageUrl = bodyCompositionSetDto.imageUrl();
    }

}
