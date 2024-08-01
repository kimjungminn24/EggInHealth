package com.egginhealth.data.entity.exercise;

import com.egginhealth.data.dto.exercise.ExerciseInputDto;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "exercise_set")
public class ExerciseSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exs_id", nullable = false)
    private int id;

    @Column(name = "exs_set")
    private int set;

    @Column(name = "exs_weight")
    private int weight;

    @Column(name = "exs_name", length = 100)
    private String name;

    @Column(name = "exs_time")
    private int time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exh_id")
    private ExerciseHomework exerciseHomework;

    public static ExerciseSet createExerciseSet(ExerciseInputDto exerciseInputDto) {

        return ExerciseSet.builder()
                .set(exerciseInputDto.set())
                .weight(exerciseInputDto.weight())
                .name(exerciseInputDto.name())
                .time(exerciseInputDto.time())
                .build();
    }

}
