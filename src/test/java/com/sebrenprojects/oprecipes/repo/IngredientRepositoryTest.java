package com.sebrenprojects.oprecipes.repo;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import com.sebrenprojects.oprecipes.entity.Ingredient;

@SpringBootTest
public class IngredientRepositoryTest {

	@Autowired
	IngredientRepository repository;
	
	@Test
	public void testFindByName () {
		Ingredient ingredient = repository.findByName("pork");
		Assertions.assertEquals(1, ingredient.getId());
	}
	
	@Test
	public void testExistsIngredientByName () {
		Assertions.assertTrue(repository.existsIngredientByName("salt"));
	}
}
