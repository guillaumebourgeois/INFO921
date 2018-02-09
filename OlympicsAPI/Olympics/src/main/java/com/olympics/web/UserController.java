package com.olympics.web;

import java.security.Principal;

import com.olympics.dao.UserDao;
import com.olympics.entities.User;
import com.olympics.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
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
}
