package com.sebrenprojects.oprecipes.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sebrenprojects.oprecipes.entity.User;
import com.sebrenprojects.oprecipes.service.UserServiceImpl;

// HANDLES BASIC USER REQUESTS. FOR THE MOST PART IS CURRENTLY USELESS AS USER VALIDATION AND 
// CREATION IS HANDLED IN THE AUTH CONTROLLER.

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value="/user")
public class UserController {
	
	@Autowired
	private UserServiceImpl userSrvc;
	
	
	@GetMapping(value="/{id}")
	public User findById(@PathVariable Long id) {
		return userSrvc.findById(id);
	}

	@GetMapping(value="/name")
	public User findByUsername(@RequestParam String username) {
		return userSrvc.findByUsername(username);
	}

	@GetMapping(value="/all")
	public List<User> findAll() {
		return userSrvc.findAll();
	}
	

	@PostMapping(value="add")
	public String addUser(@RequestParam String username,@RequestParam String email,@RequestParam String password) {
		User newUser = new User(username, email, password);

		userSrvc.addUser(newUser);
		
		return "User added";
	}
}
