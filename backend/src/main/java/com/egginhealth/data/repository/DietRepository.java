package com.egginhealth.data.repository;

import com.egginhealth.data.entity.Diet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DietRepository extends JpaRepository<Diet, Integer> {

    Optional<Diet> findById(int id);

}
