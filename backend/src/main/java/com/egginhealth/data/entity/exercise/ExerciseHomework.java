package com.egginhealth.data.entity.exercise;


import com.egginhealth.data.entity.Member;
import com.egginhealth.util.DateTimeUtil;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "exercise_homework")
public class ExerciseHomework {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exh_id", nullable = false)
    private int id;

    @Column(name = "exh_date", nullable = false)
    private LocalDateTime date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mem_id")
    private Member member;

    @OneToMany(mappedBy = "exerciseHomework")
    private List<ExerciseSet> exerciseSetList = new ArrayList<>();

    public static ExerciseHomework createExerciseHomework(Member member, String date) {
        return ExerciseHomework.builder()
                .date(DateTimeUtil.convertToLocalDateTime(date))
                .member(member)
                .build();
    }
}
