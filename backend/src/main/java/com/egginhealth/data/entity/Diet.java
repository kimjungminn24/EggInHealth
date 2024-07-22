package com.egginhealth.data.entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "diet")
public class Diet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "diet_id", nullable = false)
    private int id;

    @Column(name = "diet_type", nullable = false)
    private int type;

    @Column(name = "diet_date", nullable = false)
    private LocalDateTime date;

    @Column(name = "diet_img_url", length = 500)
    private String imgUrl;

    @Column(name = "common_id", nullable = false)
    private int commonId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mem_id")
    private Member member;

}
