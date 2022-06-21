package com.sebrenprojects.oprecipes.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="user")
public class User implements Serializable {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@NonNull
	private String username;
	
	@NonNull
	private String email;
	
	@NonNull
	private String password;
	
	@ManyToOne
	@JoinColumn(name="role_id")
	private Role role;
	
	@OneToMany(mappedBy="user", fetch=FetchType.LAZY, cascade=CascadeType.ALL, orphanRemoval=true)
	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	@OnDelete(action=OnDeleteAction.CASCADE)
	private Set<Recipe> recipes = new HashSet<Recipe>();
	
	public void addRecipe(Recipe recipe) {
		this.recipes.add(recipe);
		recipe.setUser(this);
	}


}
