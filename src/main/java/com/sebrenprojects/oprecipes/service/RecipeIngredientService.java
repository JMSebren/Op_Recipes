package com.sebrenprojects.oprecipes.service;

import java.util.List;

import com.sebrenprojects.oprecipes.entity.Recipe;
import com.sebrenprojects.oprecipes.entity.RecipeIngredient;

public interface RecipeIngredientService {

	public RecipeIngredient findById(Long id); 
	
	public List<RecipeIngredient> findAllByRecipe(Recipe recipe);
	
	public void addRecipeIngredient(RecipeIngredient ingredient);
	
	public void addAll(List<RecipeIngredient> ingredients);
	
	public void deleteById(Long id);
	
	
}
