package com.olympics.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.olympics.entities.Activity;

@RepositoryRestResource(collectionResourceRel="activity", path= "activity")
public interface ActivityRepository extends JpaRepository<Activity, Long>{

}
