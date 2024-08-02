package com.egginhealth.data.entity.exercise;


import com.egginhealth.data.entity.Member;
import com.egginhealth.util.DateTimeUtil;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "exercise_report")
public class ExerciseReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exr_id", nullable = false)
    private int id;

    @Column(name = "exr_img_url", length = 500)
    private String imgUrl;


    @Column(name = "exr_date", nullable = false)
    private LocalDateTime date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mem_id")
    private Member member;

    public static ExerciseReport createExerciseReport(Member member, String imgUrl, String date) {
        return ExerciseReport.builder()
                .imgUrl(imgUrl)
                .date(DateTimeUtil.convertToLocalDateTime(date))
                .member(member)
                .build();
    }
}
