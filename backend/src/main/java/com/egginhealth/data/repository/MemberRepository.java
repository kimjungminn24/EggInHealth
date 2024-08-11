package com.egginhealth.data.repository;

import com.egginhealth.data.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

    Optional<Member> findByEmail(String email);

    Optional<Member> findById(int id);

    Optional<List<Member>> findByTrainer(Member trainer);

    @Query("SELECT DISTINCT m FROM Member m " +
            "LEFT JOIN FETCH m.statusList ms " +
            "WHERE m.trainer.id = :trainerId " +
            "AND (ms IS NULL OR (FUNCTION('YEAR', ms.date) = :year " +
            "AND FUNCTION('MONTH', ms.date) = :month " +
            "AND FUNCTION('DAY', ms.date) = :day))")
    Optional<List<Member>> findMembersWithStatus(
            @Param("trainerId") int trainerId,
            @Param("year") int year,
            @Param("month") int month,
            @Param("day") int day);


}
