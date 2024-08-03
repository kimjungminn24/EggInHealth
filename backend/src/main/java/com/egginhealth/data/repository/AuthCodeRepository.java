package com.egginhealth.data.repository;

import com.egginhealth.data.entity.AuthCode;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthCodeRepository extends CrudRepository<AuthCode, String> {

}
