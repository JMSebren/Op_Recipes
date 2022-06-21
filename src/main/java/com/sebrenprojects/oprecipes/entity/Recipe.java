package com.sebrenprojects.oprecipes.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
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
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@Table(name="recipe")
public class Recipe{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
//	@NonNull
//	@ManyToOne
//	@JsonBackReference(value="recipes")
//	@JoinColumn(name="user_id" )
//	private User user;
	
	@NonNull
	@NotBlank(message="Name must not be blank")
	private String name;
	
	private String author;
	
	private String cookTime;
	
	private String prepTime;
	
	private String about;
	
//	@Column(name="user_id", insertable=true, updatable=false)
//	private Long user_id;
	
	@ManyToOne
	@JoinColumn(name="user_id")
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
	
	public void addRecipeStep(Set<RecipeStep> rSteps) {
		this.steps = rSteps;
		
		for(RecipeStep step : steps) {
			step.setRecipe(this);
		}				
	}
	
	public void addRecipeIngredient(Set<RecipeIngredient> rIngredients) {
		this.ingredients = rIngredients;
		
		for(RecipeIngredient ingredient : ingredients) {
			ingredient.setRecipe(this);
		}				
	}

//	@Override
//	public String toString() {
//		return "Recipe [id=" + id + ", name=" + name + ", author=" + author + ", cookTime=" + cookTime + ", prepTime="
//				+ prepTime + ", about=" + about + ", user=" + user + ", steps=" + steps + "]";
//	}
	
	
}
