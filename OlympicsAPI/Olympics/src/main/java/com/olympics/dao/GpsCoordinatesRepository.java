package com.olympics.dao;

import com.olympics.entities.GpsCoordinates;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel="gpscoordinates", path= "gpscoordinates")
public interface GpsCoordinatesRepository extends JpaRepository<GpsCoordinates, Long>{
	
}
