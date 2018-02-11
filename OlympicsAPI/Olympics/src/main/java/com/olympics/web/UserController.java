package com.olympics.web;

import java.security.Principal;
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
    
    @RequestMapping(value="/user/{id}/stats", method = RequestMethod.GET)
    public Map<String, Long> getStats(@PathVariable Long id) {
    	Map<String, Long> result = new HashMap<String, Long>();
    	result.put("avgDuration", activityRepository.getAverageDuration(id));
    	result.put("avgDistance", activityRepository.getAverageDistance(id));
    	result.put("shortestDuration", activityRepository.getShortestActivity(id));
    	result.put("longestDuration", activityRepository.getLongestActivity(id));
    	result.put("longestDistance", activityRepository.getLongestDistance(id));
    	result.put("percentRun", activityRepository.getNbActivities(id, "run") * 100 / activityRepository.getNbActivities(id));
    	result.put("percentSki", activityRepository.getNbActivities(id, "ski") * 100 / activityRepository.getNbActivities(id));
    	result.put("percentCycle", activityRepository.getNbActivities(id, "cycle") * 100 / activityRepository.getNbActivities(id));
    	result.put("percentWalk", activityRepository.getNbActivities(id, "walk") * 100 / activityRepository.getNbActivities(id));
    	result.put("percentRide", activityRepository.getNbActivities(id, "ride") * 100 / activityRepository.getNbActivities(id));
    	return result;
    }
}
