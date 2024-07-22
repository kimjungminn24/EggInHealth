package com.egginhealth.data.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "exercise")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ex_id", nullable = false)
    private int id;

    @Column(name = "ex_date", nullable = false)
    private LocalDateTime date;

    @Column(name = "ex_img_url", length = 500)
    private String imgUrl;

    @OneToMany(mappedBy = "exercise")
    private List<ExerciseHomework> exerciseHomeworkList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mem_id")
    private Member member;

}
