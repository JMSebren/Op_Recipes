package com.sebrenprojects.oprecipes.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sebrenprojects.oprecipes.entity.RecipeIngredient;

// REPO FOR RECIPE_INGREDIENT ENTITIES. WILL LIKELY BE WRITING SOME CUSTOM QUERIES HERE IN THE FUTURE.

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Long>{

}
