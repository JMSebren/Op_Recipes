package com.sebrenprojects.oprecipes.service;

import com.sebrenprojects.oprecipes.entity.Role;

//BASIC INTERFACE FOR ROLE_SERVICE

public interface RoleService {
	
	Role findByName(String name);
}
