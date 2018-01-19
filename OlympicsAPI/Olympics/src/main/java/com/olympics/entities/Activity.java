package com.olympics.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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
	
	public Long getIdActivity() {
		return idActivity;
	}

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