package com.sebrenprojects.oprecipes.service;

import java.util.List;

import com.sebrenprojects.oprecipes.entity.Recipe;

//BASIC INTERFACE FOR RECIPE_SERVICE

public interface RecipeService {

	Recipe findById(Long id);
	
	Recipe findByName(String name);
	
	List<Recipe> findAll();
	
	List<Recipe> findAllByUserId(Long id);
	
	void addRecipe(Recipe newRecipe);
	
	int deleteRecipe(Long id);
	
}
