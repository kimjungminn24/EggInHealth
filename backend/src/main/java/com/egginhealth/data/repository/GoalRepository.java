package com.egginhealth.data.repository;

import com.egginhealth.data.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Integer> {

    Optional<Goal> findByMemberId(int memberId);
}
