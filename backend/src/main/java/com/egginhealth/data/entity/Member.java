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
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mem_id", nullable = false)
    private int id;

    @Column(name = "mem_name", nullable = false, length = 45)
    private String name;

    @Column(name = "mem_email", nullable = false, length = 325)
    private String email;

    @Column(name = "mem_phone_number", length = 20)
    private String phoneNumber;

    @Column(name = "mem_info", length = 100)
    private String info;

    @Column(name = "mem_img_url", length = 500)
    private String imgUrl;

    @Column(name = "mem_pt_cnt", nullable = false, columnDefinition = "TINYINT")
    private int PTCount = 0;

    @Column(name = "mem_type", nullable = false, length = 1)
    private String type; // [M,T] member, trainer

    @Column(name = "mem_total_egg", nullable = false)
    private int totalEgg = 0;

    @Column(name = "mem_created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "mem_updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tr_id")
    private Member member;

    @OneToMany(mappedBy = "member")
    private List<Member> trMemberList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Diet> dietList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Exercise> exerciseList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<PtPlan> ptPlanList = new ArrayList<>();

}
