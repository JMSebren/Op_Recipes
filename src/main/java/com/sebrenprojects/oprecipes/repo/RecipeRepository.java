package com.sebrenprojects.oprecipes.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sebrenprojects.oprecipes.entity.Recipe;

// REPO FOR RECIPE ENTITIES. WILL BE ADDING ADDITIONAL QUERIES AS FUNCTIONALITY IS IMPLEMENTED.

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

	Recipe findByName(String name);
	
	List<Recipe> findByUserId(Long id);
}
