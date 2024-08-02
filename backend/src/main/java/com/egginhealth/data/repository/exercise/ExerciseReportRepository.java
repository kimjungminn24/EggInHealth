package com.egginhealth.data.repository.exercise;

import com.egginhealth.data.entity.exercise.ExerciseReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseReportRepository extends JpaRepository<ExerciseReport, Integer> {
}
