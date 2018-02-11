package com.olympics.web;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Calendar;
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
    public Map<String, Object> getStats(
            @PathVariable Long id,
            @RequestParam(name="from",defaultValue="") String fromString,
            @RequestParam(name="to",defaultValue="") String toString) {
        Calendar from = Calendar.getInstance();
        from.setTimeInMillis(Long.parseLong(fromString));
         // new Calendar(Long.parseLong(fromString));
        Calendar to = Calendar.getInstance();
        to.setTimeInMillis(Long.parseLong(toString));
        // new Calendar(Long.parseLong(toString));
        Map<String, Object> response = new HashMap<String, Object>();

        Map<String, Object> global = new HashMap<String, Object>();
        ArrayList<Map<String, Object>> monthly = new ArrayList<Map<String, Object>>();

        Map<String, Object> duration = new HashMap<String, Object>();
    	duration.put("average", activityRepository.getAverageDuration(id, from, to));
    	duration.put("shortest", activityRepository.getShortestActivity(id, from, to));
        duration.put("longest", activityRepository.getLongestActivity(id, from, to));
        
        Map<String, Object> distance = new HashMap<String, Object>();
        distance.put("average", activityRepository.getAverageDistance(id, from, to));
        distance.put("longest", activityRepository.getLongestDistance(id, from, to));

        Map<String, Object> proportions = new HashMap<String, Object>();
        proportions.put("run", (activityRepository.getNbActivities(id, "run", from, to) != 0) ? activityRepository.getNbActivities(id, "run", from, to) * 100 / activityRepository.getNbActivities(id, from, to) : 0);
    	proportions.put("ski", (activityRepository.getNbActivities(id, "ski", from, to) != 0) ? activityRepository.getNbActivities(id, "ski", from, to) * 100 / activityRepository.getNbActivities(id, from, to) : 0);
    	proportions.put("cycle", (activityRepository.getNbActivities(id, "cycle", from, to) != 0) ? activityRepository.getNbActivities(id, "cycle", from, to) * 100 / activityRepository.getNbActivities(id, from, to) : 0);
    	proportions.put("walk", (activityRepository.getNbActivities(id, "walk", from, to) != 0) ? activityRepository.getNbActivities(id, "walk", from, to) * 100 / activityRepository.getNbActivities(id, from, to) : 0);
        proportions.put("ride", (activityRepository.getNbActivities(id, "ride", from, to) != 0) ? activityRepository.getNbActivities(id, "ride", from, to) * 100 / activityRepository.getNbActivities(id, from, to) : 0);
        
        global.put("proportions", proportions);
        global.put("duration", duration);
        global.put("distance", distance);

        Long nbMilsInOneMonth = 2628000000L;
    	Integer cpt = 0;
        Calendar dateTmp = Calendar.getInstance();
        dateTmp.setTimeInMillis(from.getTimeInMillis());

        //LocalDateTime localDateTime = dateTmp.toLocalDateTime();
        Map<String, Object> month;
    	while (to.after(from)) {
            month = new HashMap<String, Object>();

            Map<String, Object> monthDuration = new HashMap<String, Object>();
    		monthDuration.put("average", activityRepository.getAverageDuration(id, from, dateTmp));
        	monthDuration.put("shortest", activityRepository.getShortestActivity(id, from, dateTmp));
            monthDuration.put("longest", activityRepository.getLongestActivity(id, from, dateTmp));
            
            Map<String, Object> monthDistance = new HashMap<String, Object>();
        	monthDistance.put("average", activityRepository.getAverageDistance(id, from, dateTmp));
            monthDistance.put("longest", activityRepository.getLongestDistance(id, from, dateTmp));
            
            Map<String, Object> monthProportions = new HashMap<String, Object>();
        	monthProportions.put("run", (activityRepository.getNbActivities(id, "run", from, to) != 0) ? activityRepository.getNbActivities(id, "run", from, to) * 100 / activityRepository.getNbActivities(id, from, to) : 0);
    	    monthProportions.put("ski", (activityRepository.getNbActivities(id, "ski", from, to) != 0) ? activityRepository.getNbActivities(id, "ski", from, to) * 100 / activityRepository.getNbActivities(id, from, to) : 0);
    	    monthProportions.put("cycle", (activityRepository.getNbActivities(id, "cycle", from, to) != 0) ? activityRepository.getNbActivities(id, "cycle", from, to) * 100 / activityRepository.getNbActivities(id, from, to) : 0);
    	    monthProportions.put("walk", (activityRepository.getNbActivities(id, "walk", from, to) != 0) ? activityRepository.getNbActivities(id, "walk", from, to) * 100 / activityRepository.getNbActivities(id, from, to) : 0);
            monthProportions.put("ride", (activityRepository.getNbActivities(id, "ride", from, to) != 0) ? activityRepository.getNbActivities(id, "ride", from, to) * 100 / activityRepository.getNbActivities(id, from, to) : 0);
    		
    		dateTmp.setTimeInMillis(dateTmp.getTimeInMillis() + nbMilsInOneMonth);
    		from.setTimeInMillis(from.getTimeInMillis() + nbMilsInOneMonth);
            cpt++;

            dateTmp.setTimeInMillis(from.getTimeInMillis());

            month.put("year", dateTmp.get(Calendar.YEAR));
            month.put("month", dateTmp.get(Calendar.MONTH) + 1);
            month.put("duration", monthDuration);
            month.put("distance", monthDistance);
            month.put("proportions", monthProportions);

            monthly.add(month);
        }
        
        response.put("global", global);
        response.put("monthly", monthly);
    	return response;
    }
}
