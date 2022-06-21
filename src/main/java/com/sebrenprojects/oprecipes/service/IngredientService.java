package com.sebrenprojects.oprecipes.service;

import java.util.List;
import java.util.Optional;

import org.codehaus.jettison.json.JSONObject;

import com.sebrenprojects.oprecipes.entity.Ingredient;
import com.sebrenprojects.oprecipes.entity.Ingredient.IngredientType;


public interface IngredientService{
	
	public Ingredient getReferenceById(Long id);
	
	public Ingredient findByName(String name);
	
	public List<Ingredient> findAll();
	
}
