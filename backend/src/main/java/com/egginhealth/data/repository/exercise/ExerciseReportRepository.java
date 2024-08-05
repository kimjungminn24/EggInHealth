package com.egginhealth.data.repository.exercise;

import com.egginhealth.data.entity.exercise.ExerciseReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ExerciseReportRepository extends JpaRepository<ExerciseReport, Integer> {

    @Query("SELECT er FROM ExerciseReport er WHERE er.member.id = :memberId AND YEAR(er.date) = :year AND MONTH(er.date) = :month AND DAY(er.date) = :day")
    Optional<ExerciseReport> findByMemberIdAndDate(@Param("memberId") int memberId, @Param("year") int year, @Param("month") int month, @Param("day") int day);

}
