package com.sebrenprojects.oprecipes.service;

import java.util.List;

import com.sebrenprojects.oprecipes.entity.Recipe;
import com.sebrenprojects.oprecipes.entity.RecipeStep;

//BASIC INTERFACE FOR RECIPE_STEP_SERVICE

public interface RecipeStepService {

	public void addRecipeStep(RecipeStep step);
	
	public void deleteRecipeStep(RecipeStep step);
	
	public RecipeStep findRecipeStepById(Long id);
	
	public RecipeStep findRecipeStepByNumber(Long recipe_id,int number);
	
	public List<RecipeStep> findAllByRecipe(Recipe recipe);
}
