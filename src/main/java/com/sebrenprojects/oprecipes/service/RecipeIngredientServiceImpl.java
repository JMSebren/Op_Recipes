package com.sebrenprojects.oprecipes.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sebrenprojects.oprecipes.entity.Recipe;
import com.sebrenprojects.oprecipes.entity.RecipeIngredient;
import com.sebrenprojects.oprecipes.repo.RecipeIngredientRepository;

@Service
public class RecipeIngredientServiceImpl implements RecipeIngredientService{

	@Autowired
	RecipeIngredientRepository repository;
	
	@Override
	public RecipeIngredient findById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<RecipeIngredient> findAllByRecipe(Recipe recipe) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addRecipeIngredient(RecipeIngredient ingredient) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addAll(List<RecipeIngredient> ingredients) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub
		
	}

}
