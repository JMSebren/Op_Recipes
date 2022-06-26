package com.sebrenprojects.oprecipes.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sebrenprojects.oprecipes.entity.User;

// REPO FOR USER ENTITIES. WILL BE ADDING SEVERAL QUERIES AS ADDITIONAL FUNCTIONALITY IS IMPLEMENTED.

public interface UserRepository extends JpaRepository<User, Long> {
	
	@Query("Select u From User u Where email=:email")
	User findByEmail(@Param("email") String email);
	
	User findByUsername(String username);
}
