package com.olympics.web;

import java.security.Principal;
import java.util.List;

import com.olympics.dao.ActivityRepository;
import com.olympics.dao.GpsCoordinatesRepository;
import com.olympics.dao.UserDao;
import com.olympics.entities.Activity;
import com.olympics.entities.GpsCoordinates;
import com.olympics.entities.User;

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


@Controller
@RestController
public class ActivityController {
	
	@Autowired
	private ActivityRepository activityRepository;

	@Autowired
	private GpsCoordinatesRepository gpsCoordinatesRepository;

	@Autowired
	private UserDao userDao;
	
	@RequestMapping(value = "/activities/all", method = RequestMethod.GET)
	public List<Activity> getActivites() {
		return activityRepository.findAll();
	}
	
	@RequestMapping(value = "/activities", method = RequestMethod.GET)
	public Page<Activity> getActivitesByToken(Principal principal,
		@RequestParam(name="sport",defaultValue="%") String sport,
		@RequestParam(name="page",defaultValue="0") int page,
		@RequestParam(name="size",defaultValue="5") int size) {
		User user = new User();
        user = userDao.findByUsername(principal.getName());
        user.setPassword("");
		return activityRepository.findActivitiesByToken(user, sport, new PageRequest(page, size));
	}

	@RequestMapping(value = "/user/{id}/activities", method = RequestMethod.GET)
	public Page<Activity> getActivitiesByUser(@PathVariable Long id,
		@RequestParam(name="page",defaultValue="0") int page,
		@RequestParam(name="size",defaultValue="5") int size) {
		return activityRepository.findActivitiesByUser(id, new PageRequest(page, size));
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
		a.setIdActivity(id);
		return activityRepository.save(a);
	}

	@RequestMapping(value = "/activity/{id}/gps", method = RequestMethod.PUT)
	public GpsCoordinates gpsUpdate(@PathVariable Long id, @RequestBody GpsCoordinates c) {
		c.setActivity(activityRepository.findOne(id));
		return gpsCoordinatesRepository.save(c);
	}
}
