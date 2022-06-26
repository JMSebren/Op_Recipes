package com.sebrenprojects.oprecipes.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sebrenprojects.oprecipes.entity.Ingredient;

// REPO FOR INGREDIENT ENTITIES

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
	
	Ingredient getReferenceById(Long id);
	
	Ingredient findByName(String name);
	
	public Boolean existsIngredientByName(String name);

}
