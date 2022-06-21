package com.sebrenprojects.oprecipes.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sebrenprojects.oprecipes.entity.Recipe;
import com.sebrenprojects.oprecipes.entity.RecipeStep;
import com.sebrenprojects.oprecipes.repo.RecipeStepRepository;

@Service
public class RecipeStepServiceImpl implements RecipeStepService {

	@Autowired
	RecipeStepRepository repository;

	@Override
	public void addRecipeStep(RecipeStep step) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteRecipeStep(RecipeStep step) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public RecipeStep findRecipeStepById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public RecipeStep findRecipeStepByNumber(Long recipe_id, int number) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<RecipeStep> findAllByRecipe(Recipe recipe) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}
