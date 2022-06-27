package com.sebrenprojects.oprecipes.repo;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserRepositoryTest {

	@Autowired
	UserRepository repository;
	
	@Test
	public void testFindIdByUsername () {		
		Assertions.assertEquals(1, repository.findIdByUsername("testuser"));
	}
}
