package com.sebrenprojects.oprecipes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.datasource.init.DatabasePopulator;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.sebrenprojects.oprecipes.entity.User;
import com.sebrenprojects.oprecipes.service.RoleServiceImpl;
import com.sebrenprojects.oprecipes.service.UserServiceImpl;


//@EnableWebMvc
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

	@Override	
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
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
