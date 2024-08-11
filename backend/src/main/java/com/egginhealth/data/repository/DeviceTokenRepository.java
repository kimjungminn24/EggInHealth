package com.egginhealth.data.repository;

import com.egginhealth.data.entity.DeviceToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceTokenRepository extends CrudRepository<DeviceToken, String> {

}
