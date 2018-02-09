package com.olympics.web;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.olympics.dao.ActivityRepository;
import com.olympics.entities.Activity;


@Controller
@RestController
public class ActivityController {
	
	@Autowired
	private ActivityRepository activityRepository;
	
	@RequestMapping(value = "/activities", method = RequestMethod.GET)
	public List<Activity> getActivites() {
		return activityRepository.findAll();
	}

	@RequestMapping(value = "/activity/{id}", method = RequestMethod.GET)
	public Activity getActivitie(@PathVariable Long id) {
		return activityRepository.findOne(id);
	}

	@RequestMapping(value = "/activity", method = RequestMethod.GET)
	public Page<Activity> findByType(
			@RequestParam(name="sport",defaultValue="") String sport,
			@RequestParam(name="page",defaultValue="0") int page,
			@RequestParam(name="size",defaultValue="5") int size){
		return activityRepository.findActivities(sport, new PageRequest(page, size));
	}

	@RequestMapping(value = "/activity", method = RequestMethod.PUT)
	public Activity save(@RequestBody Activity a) {
		return activityRepository.save(a);
	}

	@RequestMapping(value = "/activity/{id}", method = RequestMethod.DELETE)
	public boolean delete(@PathVariable Long id) {
		activityRepository.delete(id);
		return true;
	}

	@RequestMapping(value = "/activity/{id}", method = RequestMethod.PUT)
	public Activity update(@PathVariable Long id, @RequestBody Activity a) {
		// a.setIdActivity(id);
		return activityRepository.save(a);
	}
	
	@RequestMapping(value = "/activity/{id}/gps", method = RequestMethod.PUT)
	public void gps(@PathVariable Long id,
					@RequestParam(name="idPacket", defaultValue="0") int idPacket,
					@RequestParam(name="date", defaultValue="0") Date date,
					@RequestParam(name="coords", defaultValue="0") double coords[]) {
		activityRepository.findOne(id);
	}
}
