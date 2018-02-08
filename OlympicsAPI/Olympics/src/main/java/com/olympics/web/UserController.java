package com.olympics.web;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.olympics.dao.UserDao;
import com.olympics.entities.User;
import com.olympics.service.UserService;



@RestController

public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
	private UserDao userDao;

    @Autowired
    private ConsumerTokenServices consumerTokenServices;
    /*@RequestMapping(value="/user", method = RequestMethod.GET)
    public List<User> listUser(){
        return userService.findAll();
    }*/
    @RequestMapping(value="/profile", method = RequestMethod.GET)
    public User currentUser(Principal principal){
    		User user = new User();
    		user = userDao.findByUsername(principal.getName());
    		user.setPassword("");
    	return user; 
    }
    @RequestMapping(value="/revoke", method = RequestMethod.GET)
    public String revokingAccessToken(@RequestParam(name = "access_token") String accessToken){
    
    	consumerTokenServices.revokeToken(accessToken);
    	return accessToken+" revoked"; 
    }
    
    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public User create(@RequestBody User user){
        return userService.save(user);
    }

    /*@RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
    public String delete(@PathVariable(value = "id") Long id){
        userService.delete(id);
        return "success";
    }*/

}
