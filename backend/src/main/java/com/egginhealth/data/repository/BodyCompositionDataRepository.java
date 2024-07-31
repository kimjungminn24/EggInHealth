package com.egginhealth.data.repository;

import com.egginhealth.data.entity.BodyCompositionData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BodyCompositionDataRepository extends JpaRepository<BodyCompositionData, Integer> {

    Optional<BodyCompositionData> findById(int id);

    @Query("SELECT bc FROM BodyCompositionData bc WHERE bc.member.id = :memberId AND YEAR(bc.createdAt) = :year AND MONTH(bc.createdAt) = :month")
    List<BodyCompositionData> findByMemberId(int memberId, int year, int month);
}
