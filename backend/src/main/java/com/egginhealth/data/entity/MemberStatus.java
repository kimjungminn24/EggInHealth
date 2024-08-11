package com.egginhealth.data.entity;

import com.egginhealth.data.dto.DateDto;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public static MemberStatus createMemberStatus(Member member, DateDto date) {
        MemberStatus memberStatus = new MemberStatus();
        memberStatus.isExercise = false;
        memberStatus.isDiet = false;
        memberStatus.date = date.toLocalDateTime();
        memberStatus.member = member;
        return memberStatus;
    }

    public void updateExerciseStatus(boolean isExercise) {
        this.isExercise = isExercise;
    }

    public void updateDietStatus(boolean isDiet) {
        this.isDiet = isDiet;
    }
}
