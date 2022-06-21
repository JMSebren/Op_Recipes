package com.sebrenprojects.oprecipes.controller;

import java.util.List;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import com.sebrenprojects.oprecipes.config.JwtTokenProvider;
import com.sebrenprojects.oprecipes.entity.User;
import com.sebrenprojects.oprecipes.service.RoleServiceImpl;
import com.sebrenprojects.oprecipes.service.UserServiceImpl;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value="/user")
public class UserController {

	private static Logger log = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private UserServiceImpl userSrvc;
	
	@Autowired
	private RoleServiceImpl roleSrvc;
	
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

//	@PostMapping(value="/remove")
//	public ResponseEntity<?> deleteUser(@RequestParam Long id) {
//		log.info("UserController /remove: Request received, deleting user");
//		int response = userSrvc.deleteUser(id);
//		System.out.println(response);
//		if (response == 0) {
//			return new ResponseEntity<String>("Entity cannot be found", HttpStatus.NOT_FOUND);
//		} 
//				
//		return new ResponseEntity<String>("Entity has been removed ", HttpStatus.OK);
//	}
	
}
