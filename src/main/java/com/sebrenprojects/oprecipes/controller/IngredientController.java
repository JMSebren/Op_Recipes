package com.sebrenprojects.oprecipes.controller;

import java.util.List;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sebrenprojects.oprecipes.entity.Ingredient;
import com.sebrenprojects.oprecipes.entity.Unit;
import com.sebrenprojects.oprecipes.service.IngredientServiceImpl;
import com.sebrenprojects.oprecipes.service.UnitServiceImpl;

// HANDLES REQUESTS FOR INGREDIENTS AND UNITS.

@CrossOrigin(origins = "http://localhost:3000") // set for testing from react launched via npm
@RestController
@RequestMapping(value = "/ingredients")
public class IngredientController {
	
	private static Logger log = LoggerFactory.getLogger(IngredientController.class);
	
	@Autowired 
	IngredientServiceImpl ingredientSrvc;	
	
	@Autowired
	UnitServiceImpl unitSrvc;

	// SEARCHES FOR AN INGREDIENT FROM THE PROVIDED NAME AND RETURNS THE RESULTS
	@GetMapping(value="/name")
	public ResponseEntity<?> getByName(@RequestParam String name) {
		Ingredient ingredient = ingredientSrvc.findByName(name);
		JSONObject jsonObject = new JSONObject();
		try {
			jsonObject.put("Id", ingredient.getId());
		} catch (JSONException e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
	}
	
	// SEARCHES FOR AN INGREDIENT FROM THE PROVIDED ID AND RETURNS THE RESULTS
	@GetMapping(value="/id")
	public Ingredient getById(@PathVariable("id") Long id) {
		return ingredientSrvc.getReferenceById(id);
	}	
	
	// RETURNS ALL INGREDIENTS - MAINLY USED ON THE FE FOR CACHING THE INGREDIENT LIST
	@GetMapping("/all")
	public List<Ingredient> getAllIngredients() {
		log.info("Getting all ingredients");
		return ingredientSrvc.findAll();
	}
	
	// CREATES A NEW INGREDIENT AND RETURNS THE PERSISTED ENTITY TO THE CALLER
	@PostMapping("/add")
	public ResponseEntity<?> addNewIngredient(@RequestBody Ingredient ingredient) {
		JSONObject jsonObject = new JSONObject();
		System.out.println(ingredient.getName());
		
		ingredient = ingredientSrvc.addIngredient(ingredient.getName());
		try {
			jsonObject.put("id", ingredient.getId());
			jsonObject.put("name", ingredient.getName());
		} catch (JSONException e) {
			e.printStackTrace();
		}
		System.out.println(jsonObject.toString());
		return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
	}
	
	// RETURNS ALL UNITS - MAINLY USED ON THE FE FOR CACHING THE UNIT LIST
	@GetMapping("/allUnits")
	public List<Unit> getAllUnits() {
		log.info("Getting all units");
		return unitSrvc.findAll();
	}
}
