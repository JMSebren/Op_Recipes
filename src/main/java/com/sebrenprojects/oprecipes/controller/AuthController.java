package com.sebrenprojects.oprecipes.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

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

@CrossOrigin(origins = "http://localhost:3000")
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
//
//	@Autowired
//	UserRepository userRepo;
//	
//	@Autowired
//	LoginRepository loginRepo;
//	
//	@Autowired
//	JwtUtils jwtUtils;
//	
//	@PostMapping("/login")
//	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
//		
//		Authentication authentication = authenticationManager.authenticate(
//				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
//		
//		SecurityContextHolder.getContext().setAuthentication(authentication);
//		String jwt = jwtUtils.generateJwtToken(authentication);
//		
//		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//		List<String> roles = userDetails.getAuthorities().stream()
//				.map(item -> item.getAuthority())
//				.collect(Collectors.toList());
//		
//		return ResponseEntity.ok(new JwtResponse(
//								jwt,
//								userDetails.getId(),
//								userDetails.getUsername(),
//								userDetails.getEmail,
//								roles));
//	}
//	
//	@PostMapping("/signup")
//	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
//		// Returns error message if username or email are already in use
//		if (userRepo.existsByUsername(signUpRequest.getUsername())) {
//			return ResponseEntity
//					.badRequest()
//					.body(new MessageResponse("Error: Username is already taken!"));
//		}
//		
//		if (userRepo.existsByEmail(signUpRequest.getEmail())) {
//			return ResponseEntity
//					.badRequest()
//					.body(new MessageResponse("Error: Email is already in use!"));
//		}
//		
//		// Create the new account
//		User user = new User(signUpRequest.getUsername(),
//				signUpRequest.getEmail(),
//				encoder.encode(signUpRequest.getPassword()));
//		
//		Set<String> strRoles = signUpRequest.getRole();
//		Set<Role> roles = new HashSet<>();
//	}
//	
//}
