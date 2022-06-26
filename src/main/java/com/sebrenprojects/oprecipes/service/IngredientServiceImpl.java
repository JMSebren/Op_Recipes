package com.sebrenprojects.oprecipes.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sebrenprojects.oprecipes.entity.Ingredient;
import com.sebrenprojects.oprecipes.repo.IngredientRepository;

//METHOD IMPLEMENTATIONS FOR INGREDIENT SERVICE

@Service
public class IngredientServiceImpl implements IngredientService {

	@Autowired
	private IngredientRepository repository;
	
	@Override
	public Ingredient findByName(String name) {
		return repository.findByName(name);
	}
	
	@Override
	public Ingredient getReferenceById(Long id) {
		return repository.getReferenceById(id);
	}
	
	@Override
	public List<Ingredient> findAll(){
		return repository.findAll();
	}
	
	// RETURNS AN INGREDIENT IF IT ALREADY EXISTS, OTHERWISE SAVES A NEW INGREDIENT
	public Ingredient addIngredient(String name) {	
		if (existsIngredientByName(name)) {
			return findByName(name);
		}		
		Ingredient newIngredient = new Ingredient();
		newIngredient.setName(name);		
		return repository.save(newIngredient);
	}

	@Override
	public Boolean existsIngredientByName(String name) {
		return repository.existsIngredientByName(name);
	}
}

