package com.sebrenprojects.oprecipes.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Data
//@RequiredArgsConstructor
@NoArgsConstructor
@Entity

// ADDRESS POJO. HOLDS AN ADDRESS FOR A USER. MULTIPLE USERS CAN SHARE AN ADDRESS, WHICH IS WHY IT GETS ITS OWN ENTITY.

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="id")
@Table(name="address")
public class Address {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String streetAddress;
	
	private String addressType;  // ex. po boxy, apartment, floor, suite, etc...
	
	private String city;
	
	private String governingDistrict;  // ex. state, province, federal district, county, etc...
	
	private String postalCode;
	
	private String country;
	
	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	@OneToMany(mappedBy="address", fetch=FetchType.LAZY, cascade=CascadeType.ALL, orphanRemoval=true)
	@OnDelete(action=OnDeleteAction.CASCADE)
	private Set<User> users = new HashSet<User>();
	
	
	public void addUser(User user) {
		this.users.add(user);
		user.setAddress(this);
	}
}
