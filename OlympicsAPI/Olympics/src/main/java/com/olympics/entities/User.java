package com.olympics.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class User implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private Long idUser;
	
	@NotNull
	@Column(unique=true)
	private String username;
	
	@NotNull
	private String password;
	
	@NotNull
	@Column(unique=true)
	private String email;
	
	private Integer age;
	
	// @OneToMany(cascade=CascadeType.ALL, mappedBy="user")
	// private Collection<Activity> activities;
	
	// @JsonManagedReference
	// public Collection<Activity> getActivities() {
	// 	return activities;
	// }

	// public void setActivities(Collection<Activity> activities) {
	// 	this.activities = activities;
	// }

	public User() { super(); }
	
	public Long getIdUser() {
		return this.idUser;
	}
	
	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public Integer getAge() {
		return age;
	}


	public void setAge(Integer age) {
		this.age = age;
	}
}
