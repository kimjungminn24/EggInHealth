package com.egginhealth.data.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberStatus {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "ms_date", nullable = false)
    private LocalDateTime date;

    @Column(name = "ms_exercise", nullable = false)
    private boolean isExercise = false;

    @Column(name = "ms_diet", nullable = false)
    private boolean isDiet = false;

    @ManyToOne
    @JoinColumn(name = "mem_id", nullable = false)
    private Member member;
}
