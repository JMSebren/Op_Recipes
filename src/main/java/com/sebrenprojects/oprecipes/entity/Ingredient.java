package com.sebrenprojects.oprecipes.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
//import javax.persistence.EnumType;
//import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.OneToMany;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@NoArgsConstructor
@Entity

// POJO FOR INGREDIENTS THAT CAN BE USED IN RECIPES. WILL EVENTUALLY MAKE USE OF THE INGREDIENTTYPE ENUM

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="id")
@Table(name="ingredient")
public class Ingredient{

	// currently unused. will be utilized at a later point for searching and sorting methods
	public enum IngredientType {
		PROTEIN("PROTEIN"),
		VEGETABLE("VEGETABLE"),
		FRUIT("FRUIT"),
		FATS("FATS"),
		DAIRY("DAIRY"),
		GRAINS("GRAINS"),
		HERBS_AND_SPICES("HERBS_AND_SPICES"),
		OTHER("OTHER");
		
		private String typeName;
		
		public String getType() {
			return typeName;
		}
		
		IngredientType(String type) {
			this.typeName = type;
		}
		
		public static IngredientType fromValue(String value) {
			for(IngredientType type : IngredientType.values()) {
				if (type.typeName.equals(value)) {
					return type;
				}
			}
			return null;
		}
		
		public String value() {
			return typeName;
		}
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NonNull
	@NotBlank(message="Ingredient must have a name.")
	@Size(min = 2)
	@Column(unique=true)
	private String name;
	
	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@JsonIgnore
	@OneToMany(mappedBy="ingredient", fetch=FetchType.LAZY, cascade=CascadeType.ALL, orphanRemoval=true)
	Set<RecipeIngredient> recipeIngredients = new HashSet<RecipeIngredient>();
	
	public void addRecipeIngredient(Set<RecipeIngredient> rIngredients) {
		this.recipeIngredients = rIngredients;
		
		for(RecipeIngredient ingredient : recipeIngredients) {
			ingredient.setIngredient(this);
		}				
	}
}
