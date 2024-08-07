package com.egginhealth.data.repository;

import com.egginhealth.data.entity.PtPlan;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PtPlanRepository extends JpaRepository<PtPlan, Integer> {

    Optional<PtPlan> findById(int id);

    @Query("SELECT pp FROM PtPlan pp WHERE pp.member.id = :memberId AND YEAR(pp.date) = :year AND MONTH(pp.date) = :month ORDER BY pp.date ASC")
    List<PtPlan> findByMemberId(int memberId, int year, int month);

    @Query("SELECT pp FROM PtPlan pp WHERE pp.member.id = :memberId AND pp.date > :specificDate ORDER BY pp.date ASC")
    List<PtPlan> findByMemberTopNow(int memberId, LocalDateTime specificDate, Pageable pageable);

    @Query("SELECT pp FROM PtPlan pp WHERE pp.member.trainer.id = :trainerId AND YEAR(pp.date) = :year AND MONTH(pp.date) = :month ORDER BY pp.date ASC")
    List<PtPlan> findByTrainerMemberId(int trainerId, int year, int month);
}
