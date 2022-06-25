package com.sebrenprojects.oprecipes.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sebrenprojects.oprecipes.entity.Ingredient;
import com.sebrenprojects.oprecipes.entity.Ingredient.IngredientType;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
	
	Ingredient getReferenceById(Long id);
	
	Ingredient findByName(String name);
	
	public Boolean existsIngredientByName(String name);

}
