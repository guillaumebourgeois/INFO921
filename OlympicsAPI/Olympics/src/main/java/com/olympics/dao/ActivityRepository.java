package com.olympics.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.olympics.entities.Activity;
import com.olympics.entities.User;

@RepositoryRestResource(collectionResourceRel="activity", path= "activity")
public interface ActivityRepository extends JpaRepository<Activity, Long>{
	
	@Query("select a from Activity a where a.sport = :sport")
	public Page<Activity> findActivities(@Param("sport") String sport, Pageable pageable);
	
	@Query("select a from Activity a where a.user = :id")
	public Page<Activity> findActivitiesByToken(@Param("id") User user, Pageable pageable);

	@Query("select a from Activity a where a.user.idUser = :id")
	public Page<Activity> findActivitiesByUser(@Param("id") Long user, Pageable pageable);
	
}
