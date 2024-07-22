package com.egginhealth.data.entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "exercise_homework")
public class ExerciseHomework {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exh_id", nullable = false)
    private int id;

    @Column(name = "exh_set")
    private int set;

    @Column(name = "exh_weight")
    private int weight;

    @Column(name = "exh_name", length = 100)
    private String name;

    @Column(name = "exh_time")
    private int time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ex_id")
    private Exercise exercise;

}
