package com.sebrenprojects.oprecipes.service;

import java.util.List;

import com.sebrenprojects.oprecipes.entity.User;

//BASIC INTERFACE FOR USER_SERVICE

public interface UserService {

	User findById(Long id);
	
	User findByUsername(String username);
	
	User findByEmail(String email);
	
	List<User> findAll();
	
	void addUser(User newUser);
	
	User saveAndFlush(User user);
	
	int deleteUser(Long id);
}
