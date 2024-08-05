package com.egginhealth.data.repository;

import com.egginhealth.data.entity.PtLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PtLogRepository extends JpaRepository<PtLog,Integer> {

    @Query("SELECT pl FROM PtLog pl WHERE pl.member.id = :memberId ORDER BY pl.updatedAt ASC")
    List<PtLog> findByMemberIdPtLog(int memberId);
}
