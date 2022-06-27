package com.sebrenprojects.oprecipes.service;

import java.util.List;

import com.sebrenprojects.oprecipes.entity.Role;

//BASIC INTERFACE FOR ROLE_SERVICE

public interface RoleService {
	
	Role findByName(String name);
	
	Role addRole(Role role);
	
	void addAll(List<Role> roles);
	
	List<Role> findAll();
}
