package com.olympics.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
public class Activity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private Long idActivity;
	
	private Integer type;
	
	@NotNull
	@Temporal(TemporalType.DATE)
	private Date startDate;
	
	@NotNull
	@Temporal(TemporalType.DATE)
	private Date endDate;
	
	@Size(max = 2500)
	private String gpsCoord;
	
	
	private User user_id;
	
	
	public User getUser_id() {
		return user_id;
	}
	/*@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idUser")
	public void setUser_id(User user_id) {
		this.user_id = user_id;
	}

	public Long getIdActivity() {
		return idActivity;
	}*/

	public void setIdActivity(Long idActivity) {
		this.idActivity = idActivity;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getGpsCoord() {
		return gpsCoord;
	}

	public void setGpsCoord(String gpsCoord) {
		this.gpsCoord = gpsCoord;
	}

}