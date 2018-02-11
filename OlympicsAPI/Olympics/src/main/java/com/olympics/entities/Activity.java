package com.olympics.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.io.Serializable;
import java.util.Calendar;
import java.util.Collection;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

@Entity
public class Activity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private Long idActivity;
	
	private Long distance;
	
	@NotNull
	private String sport;
	
	@NotNull
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar startDate;
	
	@NotNull // A date cannot be null in JPA, just set it to zero in the request
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar endDate;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="activity")
	private Collection<GpsCoordinates> gpsCoordinates;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idUser")
    @JsonBackReference
	private User user;
	
    @JsonBackReference
    public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}

	public Long getIdActivity() {
		return idActivity;
	}

	public void setIdActivity(Long id) {
		this.idActivity = id;
	}

	public String getSport() {
		return sport;
	}

	public void setSport(String sport) {
		this.sport = sport;
	}

	public Calendar getStartDate() {
		return startDate;
	}

	public void setStartDate(Calendar startDate) {
		this.startDate = startDate;
	}

	public Calendar getEndDate() {
		return endDate;
	}

	public void setEndDate(Calendar endDate) {
		this.endDate = endDate;
	}

	@JsonManagedReference
	public Collection<GpsCoordinates> getGpsCoordinates() {
		return gpsCoordinates;
	}

	public void setGpsCoordinates(Collection<GpsCoordinates> gpsCoordinates) {
		this.gpsCoordinates = gpsCoordinates;
	}
	public Long getDistance() {
		return distance;
	}
	public void setDistance(Long distance) {
		this.distance = distance;
	}

}