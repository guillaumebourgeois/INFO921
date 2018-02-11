package com.olympics.dao;

import java.sql.Timestamp;

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
	
	@Query("select a from Activity a where a.user = :id and a.sport LIKE :sport")
	public Page<Activity> findActivitiesByToken(@Param("id") User user, @Param("sport") String sport, Pageable pageable);

	@Query("select a from Activity a where a.user.idUser = :id")
	public Page<Activity> findActivitiesByUser(@Param("id") Long user, Pageable pageable);
	
	@Query("select AVG(DATEDIFF(a.startDate, a.endDate)) from Activity a where a.user.idUser = :id and a.startDate > :from and a.startDate < dateTo")
	public Long getAverageDuration(@Param("id") Long user, @Param("from") Timestamp dateFrom, @Param("to") Timestamp dateTo);
	
	@Query("select AVG(a.distance) from Activity a where a.user.idUser = :id and a.startDate > :from and a.startDate < dateTo")
	public Long getAverageDistance(@Param("id") Long user, @Param("from") Timestamp dateFrom, @Param("to") Timestamp dateTo);
	
	@Query("select MIN(DATEDIFF(a.startDate, a.endDate)) from Activity a where a.user.idUser = :id and a.startDate > :from and a.startDate < dateTo")
	public Long getShortestActivity(@Param("id") Long user, @Param("from") Timestamp dateFrom, @Param("to") Timestamp dateTo);
	
	@Query("select MAX(DATEDIFF(a.startDate, a.endDate)) from Activity a where a.user.idUser = :id and a.startDate > :from and a.startDate < dateTo")
	public Long getLongestActivity(@Param("id") Long user, @Param("from") Timestamp dateFrom, @Param("to") Timestamp dateTo);
	
	@Query("select MAX(a.distance) from Activity a where a.user.idUser = :id and a.startDate > :from and a.startDate < dateTo")
	public Long getLongestDistance(@Param("id") Long user, @Param("from") Timestamp dateFrom, @Param("to") Timestamp dateTo);
	
	@Query("select count(a) from Activity a where a.user.idUser = :id and a.sport LIKE :sport and a.startDate > :from and a.startDate < dateTo")
	public Long getNbActivities(@Param("id") Long user, @Param("sport") String sport, @Param("from") Timestamp dateFrom, @Param("to") Timestamp dateTo);
	
	@Query("select count(a) from Activity a where a.user.idUser = :id and a.startDate > :from and a.startDate < dateTo")
	public Long getNbActivities(@Param("id") Long user, @Param("from") Timestamp dateFrom, @Param("to") Timestamp dateTo);
}
	