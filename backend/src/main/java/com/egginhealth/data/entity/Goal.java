package com.egginhealth.data.entity;


import com.egginhealth.data.dto.GoalDto;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Goal {

    @Id
    private int memberId;

    @MapsId
    @OneToOne
    @JoinColumn(name = "mem_id")
    private Member member;

    @Column(name = "goal_exercise_common_id")
    private int exerciseCommonId;

    @Column(name = "goal_diet_common_id")
    private int dietCommonId;

    @Column(name = "goal_common_id")
    private int goalCommonId;

    public static Goal createGoal(GoalDto goalDto, Member member) {
        return Goal.builder()
                .member(member)
                .exerciseCommonId(goalDto.exerciseCommonId())
                .dietCommonId(goalDto.dietCommonId())
                .goalCommonId(goalDto.commonId())
                .build();
    }
}
