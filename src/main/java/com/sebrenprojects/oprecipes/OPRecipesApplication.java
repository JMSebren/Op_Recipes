package com.sebrenprojects.oprecipes;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.sebrenprojects.oprecipes.entity.Role;
import com.sebrenprojects.oprecipes.entity.User;
import com.sebrenprojects.oprecipes.service.RoleServiceImpl;
import com.sebrenprojects.oprecipes.service.UserServiceImpl;

@SpringBootApplication
@EnableJpaRepositories("com.sebrenprojects.oprecipes.repo")
public class OPRecipesApplication implements CommandLineRunner {

	@Autowired
	private UserServiceImpl userSrvc;
	
	@Autowired
	private RoleServiceImpl roleSrvc;
	
	public static void main(String[] args) {
		SpringApplication.run(OPRecipesApplication.class, args);
	}

	// USED TO MAKE A DEFAULT USER WHEN THE DB IS RELOADED. MOSTLY FOR DEV PURPOSES.
	@Override	
	public void run(String... args) throws Exception {

		if (roleSrvc.findAll().isEmpty()) {
			Role user = new Role();
			Role admin = new Role();
			
			user.setName("USER");
			admin.setName("ADMIN");
			
			List<Role> baseRoles = new ArrayList<Role>();
			baseRoles.add(user);
			baseRoles.add(admin);
			
			roleSrvc.addAll(baseRoles);
		}
		
		if (userSrvc.findAll().isEmpty()) {
			User testUser = new User();
			
			testUser.setUsername("testuser");
			testUser.setEmail("testuseremail@testuser.com");
			testUser.setPassword(new BCryptPasswordEncoder().encode("testuserpassword"));
			testUser.setRole(roleSrvc.findByName("USER"));
			
			userSrvc.addUser(testUser);
		}
	}

}
