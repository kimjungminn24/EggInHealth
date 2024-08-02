package com.egginhealth.data.entity.exercise;

import com.egginhealth.data.dto.exercise.ExerciseSetInputDto;
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

    public static ExerciseSet createExerciseSet(ExerciseSetInputDto exerciseSetInputDto, ExerciseHomework exerciseHomework) {

        return ExerciseSet.builder()
                .set(exerciseSetInputDto.set())
                .weight(exerciseSetInputDto.weight())
                .name(exerciseSetInputDto.name())
                .time(exerciseSetInputDto.time())
                .exerciseHomework(exerciseHomework)
                .build();
    }

}
