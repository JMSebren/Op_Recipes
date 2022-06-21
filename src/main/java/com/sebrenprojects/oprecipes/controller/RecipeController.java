package com.sebrenprojects.oprecipes.controller;

import java.util.List;
import java.util.Set;

import javax.persistence.EntityNotFoundException;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sebrenprojects.oprecipes.entity.Ingredient;
import com.sebrenprojects.oprecipes.entity.Recipe;
import com.sebrenprojects.oprecipes.entity.RecipeIngredient;
import com.sebrenprojects.oprecipes.entity.RecipeStep;
import com.sebrenprojects.oprecipes.entity.User;
import com.sebrenprojects.oprecipes.service.RecipeIngredientServiceImpl;
import com.sebrenprojects.oprecipes.service.RecipeServiceImpl;
import com.sebrenprojects.oprecipes.service.RecipeStepServiceImpl;
import com.sebrenprojects.oprecipes.service.UserServiceImpl;

@RestController
@RequestMapping(value ="/recipe")
public class RecipeController {

	private static Logger log = LoggerFactory.getLogger(RecipeController.class);
	
	@Autowired
	RecipeServiceImpl recipeSrvc;
	
	@Autowired
	RecipeIngredientServiceImpl ingredientSrvc;
	
	@Autowired
	RecipeStepServiceImpl stepSrvc;
	
	@Autowired
	UserServiceImpl userSrvc;
	
	@GetMapping(value="/{id}")
	public Recipe findById(@PathVariable("id") Long id) {
		return recipeSrvc.findById(id);
	}
	
	@GetMapping(value="/name")
	public  ResponseEntity<?> findByName(@RequestParam String name) {
		JSONObject jsonObject = new JSONObject();
		log.info("RecipeController /name : Request received, retrieving recipe");
		
		Recipe recipe = recipeSrvc.findByName(name);
		log.info("RecipeController /name: Search complete. Returning results");
		try {
			jsonObject.put("Name", recipe.getName());
			jsonObject.put("Author", recipe.getAuthor());
			jsonObject.put("Summary", recipe.getAbout());
			jsonObject.put("prepTime", recipe.getPrepTime());
			jsonObject.put("cookTime", recipe.getCookTime());
			jsonObject.put("Ingredients", recipe.getIngredients());
			jsonObject.put("Steps", recipe.getSteps());
		} catch (JSONException e) {
			e.printStackTrace();
			return new ResponseEntity<String>("Request Failed", HttpStatus.NOT_FOUND);
		}				
		System.out.println(recipe);
		return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
	}
	
	@GetMapping(value="/all")
	public @ResponseBody List<Recipe> findAll() {
		return recipeSrvc.findAll();
	}
	
	@PostMapping(value="/add", consumes= {"application/json"}, produces= {"application/json"} )
	public String addRecipe(@RequestBody Recipe recipe) {		
		User user = userSrvc.findByEmail(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

		user.addRecipe(recipe);
		recipe.addRecipeStep(recipe.getSteps());	
	
		recipe.addRecipeIngredient(recipe.getIngredients());
		
		recipeSrvc.addRecipe(recipe);
		return "Recipe received";
	}
	
	@PostMapping(value="/remove")
	public ResponseEntity<?> deleteRecipe(@RequestParam Long id) {
		log.info("RecipeController /remove: Request received, deleting recipe");
		int response = recipeSrvc.deleteRecipe(id);
		System.out.println(response);
		if (response == 0) {
			return new ResponseEntity<String>("Entity cannot be found", HttpStatus.NOT_FOUND);
		} 
				
		return new ResponseEntity<String>("Entity has been removed ", HttpStatus.OK);
	}
}

