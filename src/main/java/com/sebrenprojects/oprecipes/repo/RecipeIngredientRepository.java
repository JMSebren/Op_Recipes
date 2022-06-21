package com.sebrenprojects.oprecipes.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sebrenprojects.oprecipes.entity.RecipeIngredient;

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Long>{

}
