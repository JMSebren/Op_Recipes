package com.sebrenprojects.oprecipes.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.OneToMany;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name="ingredient")
public class Ingredient{

	// types could be enforced on the front-end, but it seems more clear to define accepted values on the back-end
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
	
//	@NonNull
//	@Enumerated(EnumType.STRING)
//	@Column(name="ingredient_type")
//	private IngredientType type;
	
	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	@JsonIgnore
	@OneToMany(mappedBy="ingredient", fetch=FetchType.LAZY, cascade=CascadeType.ALL, orphanRemoval=true)
	Set<RecipeIngredient> recipeIngredients = new HashSet<RecipeIngredient>();
	
	public void addRecipeIngredient(Set<RecipeIngredient> rIngredients) {
		this.recipeIngredients = rIngredients;
		
		for(RecipeIngredient ingredient : recipeIngredients) {
			ingredient.setIngredient(this);
		}				
	}

	@Override
	public String toString() {
		return "Ingredient [id=" + id + ", name=" + name + "]";
	}
	
	
}
