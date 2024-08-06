package com.egginhealth.data.repository;

import com.egginhealth.data.entity.PtPlan;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PtPlanRepository extends JpaRepository<PtPlan, Integer> {

    @Query("SELECT pp FROM PtPlan pp WHERE pp.member.id = :memberId AND YEAR(pp.date) = :year AND MONTH(pp.date) = :month ORDER BY pp.date ASC")
    List<PtPlan> findByMemberId(int memberId, int year, int month);

    @Query("SELECT pp FROM PtPlan pp WHERE pp.member.id = :memberId AND pp.date > :specificDate ORDER BY pp.date ASC")
    List<PtPlan> findByMemberTopNow(int memberId, LocalDateTime specificDate, Pageable pageable);

    @Query("SELECT pp FROM PtPlan pp WHERE pp.date >= :start AND pp.date < :now")
    List<PtPlan> findPtPlanOlderThan(@Param("start") LocalDateTime start, @Param("now") LocalDateTime now);
}
