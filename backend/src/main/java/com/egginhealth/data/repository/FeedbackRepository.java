package com.egginhealth.data.repository;

import com.egginhealth.data.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback,Integer> {

    Optional<Feedback> findById(int id);
}
