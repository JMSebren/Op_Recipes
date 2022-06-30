package com.sebrenprojects.oprecipes.entity;

import java.util.HashSet;
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
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

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
@RequiredArgsConstructor
@NoArgsConstructor
@Entity

// THE ALL-POWERFUL USER POJO.

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="id")
@Table(name="user")
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@NonNull
	@Column(unique=true)
	private String username;
	
	@NonNull
	@Email(message = "Valid email required")
	@Column(unique=true)
	private String email;
	
	@NonNull
	@Size(min=5, message="Password must have at least 5 characters")
	private String password;
	
	private String firstName;
	
	private String lastName;
	
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name="address_id")
	private Address address;
	
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
