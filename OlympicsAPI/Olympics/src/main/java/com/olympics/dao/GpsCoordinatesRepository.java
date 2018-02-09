package com.olympics.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.olympics.entities.GpsCoordinates;

@RepositoryRestResource(collectionResourceRel="activity", path= "activity")
public interface GpsCoordinatesRepository extends JpaRepository<GpsCoordinates, Long>{
	
}
