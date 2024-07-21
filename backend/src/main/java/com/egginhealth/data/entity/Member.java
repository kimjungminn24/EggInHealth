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
    private int id; // 회원 아이디

    @Column(nullable = false, length = 45)
    private String memName; // 회원 이름

    @Column(nullable = false, length = 325)
    private String memEmail;    // 회원 이메일
    @Column(length = 20)
    private String memPhonenumber;  // 회원 전화번호
    @Column(length = 100)
    private String memInfo; // 회원 한줄소개
    @Column(length = 500)
    private String memImgUrl;   // 회원 프로필 사진주소

    @Column(nullable = false, columnDefinition = "TINYINT")
    private int memPtCnt = 0;   // 회원 PT 잔여횟수
    @Column(nullable = false, length = 1)
    private String memType; // 회원 타입 // [M,T] member, trainer
    @Column(nullable = false)
    private int memTotalEgg = 0;    // 회원 에그 전체 갯수
    @Column(nullable = false)
    private LocalDateTime memCreatedAt; // 회원 가입일
    private LocalDateTime memUpdatedAt; // 회원 수정일

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trainer_id")
    private Member member;    // 트레이너 아이디

    @OneToMany(mappedBy = "member")
    private List<Member> trMemberList = new ArrayList<>(); // 트레이너의 회원 리스트


}
