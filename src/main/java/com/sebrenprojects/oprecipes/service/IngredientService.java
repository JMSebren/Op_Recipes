package com.sebrenprojects.oprecipes.service;

import java.util.List;

import com.sebrenprojects.oprecipes.entity.Ingredient;

// BASIC INTERFACE FOR INGREDIENT_SERVICE

public interface IngredientService{
	
	public Ingredient getReferenceById(Long id);
	
	public Ingredient findByName(String name);
	
	public Boolean existsIngredientByName(String name);
	
	public List<Ingredient> findAll();
	
	public Ingredient addIngredient(String name);
	
}
