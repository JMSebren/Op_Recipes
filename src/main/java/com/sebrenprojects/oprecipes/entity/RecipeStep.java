package com.sebrenprojects.oprecipes.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@Table(name="recipe_step")
public class RecipeStep {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name="recipe_id")
	private Recipe recipe;
	
	@NonNull
	@Column(name="number")
	private Integer stepNumber;
	
	@NonNull
	private String description;
	
}
