package com.egginhealth.data.repository;

import com.egginhealth.data.entity.Diet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DietRepository extends JpaRepository<Diet, Integer> {

    Optional<Diet> findById(int id);

    @Query("SELECT di FROM Diet di WHERE di.member.id = :memberId AND FUNCTION('YEAR', di.date) = :year AND FUNCTION('MONTH', di.date) = :month AND FUNCTION('DAY', di.date) = :day ORDER BY di.type ASC")
    List<Diet> findByDietDayList(int memberId, int year, int month, int day);

}
