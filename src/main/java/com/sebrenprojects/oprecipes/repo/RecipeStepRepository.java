package com.sebrenprojects.oprecipes.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sebrenprojects.oprecipes.entity.RecipeStep;

// REPO FOR RECIPE_STEP ENTITIES.

public interface RecipeStepRepository extends JpaRepository<RecipeStep, Long> {

}
