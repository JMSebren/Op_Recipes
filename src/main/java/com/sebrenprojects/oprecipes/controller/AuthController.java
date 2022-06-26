package com.sebrenprojects.oprecipes.controller;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sebrenprojects.oprecipes.config.JwtTokenProvider;
import com.sebrenprojects.oprecipes.config.TokenRefreshRequest;
import com.sebrenprojects.oprecipes.entity.RefreshToken;
import com.sebrenprojects.oprecipes.entity.User;
import com.sebrenprojects.oprecipes.exception.TokenRefreshException;
import com.sebrenprojects.oprecipes.service.RefreshTokenServiceImpl;
import com.sebrenprojects.oprecipes.service.RoleServiceImpl;
import com.sebrenprojects.oprecipes.service.UserServiceImpl;

// MANAGES USER AUTHENTICATION USING JSON WEB TOKEN TO VERIFY USER CREDENTIALS.

@CrossOrigin(origins = "http://localhost:3000")  // set for testing from react launched via npm
@RestController
@RequestMapping("/auth")
public class AuthController {
	
	private static Logger log = LoggerFactory.getLogger(AuthController.class);
	
	@Autowired
	private UserServiceImpl userSrvc;
	
	@Autowired
	private RoleServiceImpl roleSrvc;
	
	@Autowired
	private RefreshTokenServiceImpl refreshSrvc;
	
	@Autowired
	private AuthenticationManager authenticationMgr;
	
	@Autowired
	private JwtTokenProvider tokenProvider;
	
	public enum constRoles {
		ADMIN, USER
	}
	
	// CONFIRMS GIVEN USER CREDENTIALS ARE CORRECT AND RETURNS AN OBJECT W/ JWT ACCESS AND REFRESH TOKENS
	// RETURNS UNAUTHORIZED IF THE USER DATA IS INVALID.
	@PostMapping(value="/login", consumes= {"application/json"}, produces= {"application/json"} )
	public ResponseEntity<String> login(@RequestBody User user) {
		log.info("AuthController : login start");
		JSONObject jsonObject = new JSONObject();
		try {
			Authentication authentication = authenticationMgr
					.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
			if (authentication.isAuthenticated()) {
				User authorizedUser = userSrvc.findByEmail(user.getEmail());
				
				// userSrvc.findByEmail(email).getRole() -> was in createToken()
				log.info("AuthController : authenticated -> generating token");
				log.info("{}", authorizedUser.toString());
				String email = user.getEmail();
				jsonObject.put("username", authentication.getName());
				jsonObject.put("authorities", authentication.getAuthorities());
				jsonObject.put("access_token", tokenProvider.createToken(email, authorizedUser.getRole()));
				if(refreshSrvc.existsByUserId(authorizedUser.getId())) {
					refreshSrvc.deleteByUserId(authorizedUser.getId());
				} 
				jsonObject.put("refresh_token",refreshSrvc.createRefreshToken(authorizedUser.getId()).getToken());
				
				log.info("AuthController : authenticated -> returning token");
				log.info(jsonObject.toString());
				return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
			}
		} catch (JSONException e) {
			try {
				jsonObject.put("exception", e.getMessage());
			} catch (JSONException e1) {
				e1.printStackTrace();								
			}
			return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
			
		}
		return null;
	}
	
	// ADDS NEW USER DATA TO THE DATABASE
	@PostMapping(value="/register", consumes= {"application/json"}, produces= {"application/json"} )
	public ResponseEntity<String> register(@RequestBody User user) {
		log.info("UserServiceImpl : signup");
		JSONObject jsonObject = new JSONObject();
		try {
			user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
			user.setRole(roleSrvc.findByName(constRoles.USER.toString()));
			
			User savedUser = userSrvc.saveAndFlush(user);
			jsonObject.put("message", savedUser.getUsername() + " saved successfully");
			
			return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
		} catch (JSONException e) {
			try {
				jsonObject.put("exception", e.getMessage());
			} catch (JSONException e1) {
				e1.printStackTrace();
			}
			return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
		}
	}
	
	// RECEIVES A REQUEST FOR A NEW REFRESH TOKEN, VALIDATES IF THE CURRENT TOKEN IS EXPIRED.
	// IF EXPIRED, RETURNS A NEW TOKEN SET. RETURNS UNAUTHORIZED IF NO TOKEN IS FOUND.
	@PostMapping(value="/refreshtoken", consumes= {"application/json"}, produces= {"application/json"})
	public ResponseEntity<?> refreshToken(@RequestBody TokenRefreshRequest request) {
		log.info("RefreshToken : refresh");
		JSONObject jsonObject = new JSONObject();
		String requestRefreshToken = request.getRefreshToken();
			return refreshSrvc.findByToken(requestRefreshToken)
					.map(refreshSrvc::verifyTokenExpiration)
					.map(RefreshToken::getUser)
					.map(user -> {
						try {
							jsonObject.put("username", user.getUsername());
							jsonObject.put("password", user.getPassword());
							jsonObject.put("access_token", tokenProvider.createToken(user.getEmail(), user.getRole()));
							jsonObject.put("refresh_token", refreshSrvc.createRefreshToken(user.getId()));
							
						} catch (JSONException e) {
							e.printStackTrace();
						}	
						return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
					})
					.orElseThrow( () -> new TokenRefreshException(requestRefreshToken, "Refresh token is not in database.") );
	}	
}

