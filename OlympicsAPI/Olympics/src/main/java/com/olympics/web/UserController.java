package com.olympics.web;

import java.security.Principal;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import com.olympics.dao.UserDao;
import com.olympics.entities.User;
import com.olympics.service.UserService;
import com.olympics.dao.ActivityRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@RestController

public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
	private UserDao userDao;

    @Autowired
    private ConsumerTokenServices tokenServices;
    
    @Autowired
	private ActivityRepository activityRepository;
    
    @RequestMapping(value="/profile", method = RequestMethod.GET)
    public User currentUser(Principal principal) {
        User user = new User();
        user = userDao.findByUsername(principal.getName());
        user.setPassword("");
    	return user; 
    }

    @RequestMapping(value="/signout", method = RequestMethod.POST)
    public void revokingAccessToken(@RequestParam(name = "access_token") String token) {
    	tokenServices.revokeToken(token);
    	// return token+" revoked"; 
    }
    
    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public User create(@RequestBody User user) {
        return userService.save(user);
    }
    
    @RequestMapping(value = "/user/{id}/update", method = RequestMethod.POST)
    public User update(@RequestBody User user) {
        return userService.save(user);
    }
    
    @RequestMapping(value="/user/{id}/stats", method = RequestMethod.GET)
    public Map<String, Long> getStats(
    		@PathVariable Long id,
    		@RequestParam(name="dateFrom",defaultValue="") Timestamp dateFrom,
			@RequestParam(name="dateTo",defaultValue="") Timestamp dateTo) {
    	Map<String, Long> result = new HashMap<String, Long>();
    	result.put("avgDuration", activityRepository.getAverageDuration(id, dateFrom, dateTo));
    	result.put("avgDistance", activityRepository.getAverageDistance(id, dateFrom, dateTo));
    	result.put("shortestDuration", activityRepository.getShortestActivity(id, dateFrom, dateTo));
    	result.put("longestDuration", activityRepository.getLongestActivity(id, dateFrom, dateTo));
    	result.put("longestDistance", activityRepository.getLongestDistance(id, dateFrom, dateTo));
    	result.put("percentRun", activityRepository.getNbActivities(id, "run", dateFrom, dateTo) * 100 / activityRepository.getNbActivities(id, dateFrom, dateTo));
    	result.put("percentSki", activityRepository.getNbActivities(id, "ski", dateFrom, dateTo) * 100 / activityRepository.getNbActivities(id, dateFrom, dateTo));
    	result.put("percentCycle", activityRepository.getNbActivities(id, "cycle", dateFrom, dateTo) * 100 / activityRepository.getNbActivities(id, dateFrom, dateTo));
    	result.put("percentWalk", activityRepository.getNbActivities(id, "walk", dateFrom, dateTo) * 100 / activityRepository.getNbActivities(id, dateFrom, dateTo));
    	result.put("percentRide", activityRepository.getNbActivities(id, "ride", dateFrom, dateTo) * 100 / activityRepository.getNbActivities(id, dateFrom, dateTo));
    	
    	Long nbMilsInOneMonth = 2628000000L;
    	Integer cpt = 0;
    	Timestamp dateTmp = new Timestamp(dateFrom.getTime());
    	while (dateTo.after(dateTmp)) {
    		result.put("avgDuration" + cpt, activityRepository.getAverageDuration(id, dateFrom, dateTmp));
        	result.put("avgDistance" + cpt, activityRepository.getAverageDistance(id, dateFrom, dateTmp));
        	result.put("shortestDuration" + cpt, activityRepository.getShortestActivity(id, dateFrom, dateTmp));
        	result.put("longestDuration" + cpt, activityRepository.getLongestActivity(id, dateFrom, dateTmp));
        	result.put("longestDistance" + cpt, activityRepository.getLongestDistance(id, dateFrom, dateTmp));
        	result.put("percentRun" + cpt, activityRepository.getNbActivities(id, "run", dateFrom, dateTmp) * 100 / activityRepository.getNbActivities(id, dateFrom, dateTmp));
        	result.put("percentSki" + cpt, activityRepository.getNbActivities(id, "ski", dateFrom, dateTmp) * 100 / activityRepository.getNbActivities(id, dateFrom, dateTmp));
        	result.put("percentCycle" + cpt, activityRepository.getNbActivities(id, "cycle", dateFrom, dateTmp) * 100 / activityRepository.getNbActivities(id, dateFrom, dateTmp));
        	result.put("percentWalk" + cpt, activityRepository.getNbActivities(id, "walk", dateFrom, dateTmp) * 100 / activityRepository.getNbActivities(id, dateFrom, dateTmp));
        	result.put("percentRide" + cpt, activityRepository.getNbActivities(id, "ride", dateFrom, dateTmp) * 100 / activityRepository.getNbActivities(id, dateFrom, dateTmp));
    		
    		dateTmp.setTime(dateTmp.getTime() + nbMilsInOneMonth);
    		dateFrom.setTime(dateFrom.getTime() + nbMilsInOneMonth);
    		cpt++;
    	}
    	
    	return result;
    }
}
