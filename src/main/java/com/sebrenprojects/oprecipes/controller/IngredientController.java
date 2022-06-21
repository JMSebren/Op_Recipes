package com.sebrenprojects.oprecipes.controller;

import java.util.List;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sebrenprojects.oprecipes.entity.Ingredient;
import com.sebrenprojects.oprecipes.service.IngredientServiceImpl;

@RestController
@RequestMapping(value = "/ingredients")
public class IngredientController {
	
	@Autowired IngredientServiceImpl ingredientSrvc;	

	
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
	
	@GetMapping(value="/id")
	public Ingredient getById(@PathVariable("id") Long id) {
		return ingredientSrvc.getReferenceById(id);
	}	
	
	@GetMapping("/all")
	public List<Ingredient> getAllIngredients() {
		return ingredientSrvc.findAll();
	}
	
	@PostMapping("/add")
	public String addNewIngredient(@RequestParam String name) {
		ingredientSrvc.addIngredient(name);
		
		return "Saved";
	}
	
//	@PostMapping("/add")
//	public String addNewIngredient(@RequestParam String name, @RequestParam("type") String type) {
//		ingredientSrvc.addIngredient(name,type);
//		
//		return "Saved";
//	}
}
