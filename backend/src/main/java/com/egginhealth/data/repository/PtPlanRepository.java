package com.egginhealth.data.repository;

import com.egginhealth.data.entity.PtPlan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PtPlanRepository extends JpaRepository<PtPlan, Integer> {

    Optional<PtPlan> findById(int id);

    @Query("SELECT pp FROM PtPlan pp WHERE pp.member.id = :memberId AND YEAR(pp.startTime) = :year AND MONTH(pp.startTime) = :month ORDER BY pp.startTime ASC")
    List<PtPlan> findByMemberId(int memberId, int year, int month);

    @Query("SELECT pp FROM PtPlan pp WHERE pp.member.id = :memberId AND pp.startTime > :specificDate ORDER BY pp.startTime ASC")
    Page<PtPlan> findByMemberTopNow(int memberId, LocalDateTime specificDate, Pageable pageable);

    @Query("SELECT pp FROM PtPlan pp WHERE pp.startTime >= :start AND pp.startTime < :now")
    Optional<List<PtPlan>> findPtPlansByTimeRange(@Param("start") LocalDateTime start, @Param("now") LocalDateTime now);

    @Query("SELECT pp FROM PtPlan pp WHERE pp.member.trainer.id = :trainerId AND YEAR(pp.startTime) = :year AND MONTH(pp.startTime) = :month ORDER BY pp.startTime ASC")
    List<PtPlan> findByTrainerMemberId(int trainerId, int year, int month);
}
