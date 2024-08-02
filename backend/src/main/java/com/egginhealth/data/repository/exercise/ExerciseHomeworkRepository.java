package com.egginhealth.data.repository.exercise;

import com.egginhealth.data.entity.exercise.ExerciseHomework;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface ExerciseHomeworkRepository extends JpaRepository<ExerciseHomework, Integer> {

    @Query("SELECT e FROM ExerciseHomework e WHERE e.member.id = :memberId AND e.date = :date")
    Optional<ExerciseHomework> findByMemberIdAndLocalDate(@Param("memberId") int memberId, @Param("date") LocalDateTime date);


    @Query("SELECT eh FROM ExerciseHomework eh WHERE eh.member.id = :memberId AND YEAR(eh.date) = :year AND MONTH(eh.date) = :month AND DAY(eh.date) = :day")
    Optional<ExerciseHomework> findByMemberIdAndDate(@Param("memberId") int memberId, @Param("year") int year, @Param("month") int month, @Param("day") int day);


}
