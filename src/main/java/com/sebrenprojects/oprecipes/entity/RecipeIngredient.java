package com.sebrenprojects.oprecipes.entity;

import javax.persistence.JoinColumn;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name="recipe_ingredient")
public class RecipeIngredient {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;	
	
	@ManyToOne
	@JoinColumn(name="recipe_id")
	private Recipe recipe;

	@ManyToOne
	@JoinColumn(name="ingredient_id")
	private Ingredient ingredient;

	private String quantity;
	
	@ManyToOne
	@JoinColumn(name="unit_id")
	private Unit unit;
}
