package com.sebrenprojects.oprecipes.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sebrenprojects.oprecipes.entity.Recipe;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

	Recipe findByName(String name);
}
