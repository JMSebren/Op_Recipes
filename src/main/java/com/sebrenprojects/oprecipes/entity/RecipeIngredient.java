package com.sebrenprojects.oprecipes.entity;

import javax.persistence.JoinColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity

// POJO FOR COMPLETE INGREDIENT LINES IN A RECIPE. CONTAINS THE INGREDIENT AS WELL AS
// THE TOTAL QUANTITY OF A PARTICULAR UNIT USED IN THE RECIPE.

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="id")
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
