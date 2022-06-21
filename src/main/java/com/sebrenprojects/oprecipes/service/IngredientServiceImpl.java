package com.sebrenprojects.oprecipes.service;

import java.util.List;
import java.util.Optional;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sebrenprojects.oprecipes.entity.Ingredient;
import com.sebrenprojects.oprecipes.entity.Ingredient.IngredientType;
import com.sebrenprojects.oprecipes.repo.IngredientRepository;

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
	
	public void addIngredient(String name) {	
		Ingredient newIngredient = new Ingredient();
		newIngredient.setName(name);		

		repository.save(newIngredient);
	}
//	public void addIngredient(String name, String type) {
//		IngredientType iType = IngredientType.valueOf(type);
//		
//		Ingredient newIngredient = new Ingredient();
//		newIngredient.setName(name);		
//		newIngredient.setType(iType);
//		
//		repository.save(newIngredient);
//	}
}

