package com.egginhealth.data.repository;

import com.egginhealth.data.entity.CommonCode;
import com.egginhealth.data.entity.key.CommonId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommonCodeRepository extends JpaRepository<CommonCode, CommonId>, JpaSpecificationExecutor<CommonCode> {
    List<CommonCode> findByIdGroupCode(String groupCode);
}
