package com.sebrenprojects.oprecipes.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.sebrenprojects.oprecipes.entity.Recipe;
import com.sebrenprojects.oprecipes.repo.RecipeRepository;

@Service
public class RecipeServiceImpl implements RecipeService{

	private static Logger log = LoggerFactory.getLogger(RecipeServiceImpl.class);
	
	@Autowired
	RecipeRepository repository;
	
	@Override
	public Recipe findById(Long id) {
		return repository.getReferenceById(id);
	}
	
	@Override
	public Recipe findByName(String name) {
		log.info("RecipeSrvc findByName: Function entered. Initiating repository.findByName ");
		
		Recipe recipe = repository.findByName(name);
		recipe.setUser(recipe.getUser());
		
		return recipe;
	}
	
	@Override
	public List<Recipe> findAll() {
		try {
			List<Recipe> recipes = repository.findAll();
			return recipes;
		} catch (EmptyResultDataAccessException e) {
			e.printStackTrace();
		}
		return repository.findAll();
	}
	
	@Override
	public void addRecipe(Recipe newRecipe) {
		repository.save(newRecipe);
	}
	
	@Override
	public int deleteRecipe(Long id) {
		log.info("RecipeSrvc deleteRecipe: Function entered. Initiating repository.deleteById ");
		try {
			repository.deleteById(id);
		} catch(IllegalArgumentException e) {
			log.info("RecipeSrvc findByName err: Recipe not found, returning error. ");
			e.printStackTrace();
			return 0;
		} catch (EmptyResultDataAccessException e) {
			log.info("RecipeSrvc findByName err: Recipe not found, returning error. ");
			e.printStackTrace();
			return 0;
		}
		return 1;	
	}
}
