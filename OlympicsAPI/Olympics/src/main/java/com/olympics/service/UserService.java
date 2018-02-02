package com.olympics.service;

import java.util.List;

import com.olympics.entities.User;


public interface UserService {

    User save(User user);
    List<User> findAll();
    void delete(long id);
}