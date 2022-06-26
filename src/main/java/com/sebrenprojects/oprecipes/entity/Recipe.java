package com.sebrenprojects.oprecipes.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity

// POJO FOR RECIPES. CONTAINS AN INGREDIENTS LIST, STEPS, AND BASIC DETAILS ABOUT A RECIPE.

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="id")
@Table(name="recipe")
public class Recipe{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NonNull
	@NotBlank(message="Name must not be blank")
	private String name;
	
	private String author;
	
	private String cookTime;
	
	private String prepTime;
	
	private String about;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	@JsonIgnore
	private User user;
	
	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	@OneToMany(mappedBy="recipe", fetch=FetchType.EAGER, cascade=CascadeType.ALL, orphanRemoval=true)
	@OnDelete(action=OnDeleteAction.CASCADE)
	private Set<RecipeStep> steps = new HashSet<RecipeStep>();
	
	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	@OneToMany(mappedBy="recipe", fetch=FetchType.EAGER, cascade= CascadeType.ALL, orphanRemoval=true)
	@OnDelete(action=OnDeleteAction.CASCADE)
	private Set<RecipeIngredient> ingredients = new HashSet<RecipeIngredient>();
	
	// ASSIGNS STEPS TO PERSIST TO *THIS* RECIPE.
	public void addRecipeStep(Set<RecipeStep> rSteps) {
		this.steps = rSteps;
		
		for(RecipeStep step : steps) {
			step.setRecipe(this);
		}				
	}
	
	// ASSIGNS INGREDIENTS TO PERSIST TO *THIS* RECIPE.
	public void addRecipeIngredient(Set<RecipeIngredient> rIngredients) {
		this.ingredients = rIngredients;
		
		for(RecipeIngredient ingredient : ingredients) {
			ingredient.setRecipe(this);
		}				
	}	
	
}
