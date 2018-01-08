package com.olympics.dao;

import java.awt.print.Pageable;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.olympics.entities.User;


@RepositoryRestResource(collectionResourceRel="user", path= "user")
public interface UserRepository extends JpaRepository<User, Long>{
	
	
	
	/*@Query("select u from user where u.password like :p")
	public Page<Societe> societeParMC(@Param("x") String mc, Pageable pageable);*/

}
