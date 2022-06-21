package com.sebrenprojects.oprecipes.service;

import java.util.List;

import com.sebrenprojects.oprecipes.entity.Recipe;

public interface RecipeService {

	Recipe findById(Long id);
	
	Recipe findByName(String name);
	
	List<Recipe> findAll();
	
	void addRecipe(Recipe newRecipe);
	
	int deleteRecipe(Long id);
}
