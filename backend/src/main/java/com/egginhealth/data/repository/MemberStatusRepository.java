package com.egginhealth.data.repository;

import com.egginhealth.data.entity.MemberStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberStatusRepository extends JpaRepository<MemberStatus, Long> {
    List<MemberStatus> findByMemberId(Long memberId);

    @Query("SELECT ms FROM MemberStatus ms WHERE ms.member.id = :memberId AND YEAR(ms.date) = :year AND MONTH(ms.date) = :month")
    public List<MemberStatus> findByMemberIdAndYearAndMonth(@Param("memberId") int memberId, @Param("year") int year, @Param("month") int month);

    @Query("SELECT ms FROM MemberStatus ms WHERE ms.member.id = :memberId AND YEAR(ms.date) = :year AND MONTH(ms.date) = :month AND DAY (ms.date) = :day")
    Optional<MemberStatus> findByMemberIdAndYearAndMonthAndDay(@Param("memberId") int memberId, @Param("year") int year, @Param("month") int month, @Param("day") int day);

}
