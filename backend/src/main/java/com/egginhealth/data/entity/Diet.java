package com.egginhealth.data.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "diet")
@Builder
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mem_id")
    private Member member;

}
