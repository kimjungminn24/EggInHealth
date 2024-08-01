package com.egginhealth.data.repository;

import com.egginhealth.data.entity.Feedback;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback,Integer> {

    Optional<Feedback> findById(int id);

    @Query("SELECT fb FROM Feedback fb WHERE fb.member.id = :memberId")
    public List<Feedback> findByMemberId(@Param("memberId") int memberId);
}
