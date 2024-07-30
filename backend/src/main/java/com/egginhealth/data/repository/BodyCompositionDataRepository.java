package com.egginhealth.data.repository;

import com.egginhealth.data.entity.BodyCompositionData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BodyCompositionDataRepository extends JpaRepository<BodyCompositionData, Integer> {

    List<BodyCompositionData> findById(int id);

    List<BodyCompositionData> findByMemberId(int memberId);

}
