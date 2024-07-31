package com.egginhealth.data.entity;

import com.egginhealth.data.dto.member.MemberSurveyDto;
import com.egginhealth.data.dto.member.NaverMemberDto;
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

    @Enumerated(value = EnumType.STRING)
    @Column(name = "mem_type", nullable = false, length = 1)
    private Role type;

    @Column(name = "mem_total_egg", nullable = false)
    private int totalEgg = 0;

    @Column(name = "mem_age")
    private int age;

    @Column(name = "mem_height")
    private int height;

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
    private List<Feedback> feedbackList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<MemberStatus> statusList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Diet> dietList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Exercise> exerciseList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<PtPlan> ptPlanList = new ArrayList<>();

    @OneToOne(mappedBy = "member")
    private Goal goal;

    public static Member createMember(NaverMemberDto request) {
        return Member.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .imgUrl(request.getImgUrl())
                .type(Role.NONE)
                .createdAt(LocalDateTime.now())
                .build();
    }

    public void updateMemberBy(MemberSurveyDto memberSurveyDto) {
        this.age = memberSurveyDto.age();
        this.height = memberSurveyDto.height();
    }

}
