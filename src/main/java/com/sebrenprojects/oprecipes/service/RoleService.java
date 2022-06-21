package com.sebrenprojects.oprecipes.service;

import com.sebrenprojects.oprecipes.entity.Role;
import com.sebrenprojects.oprecipes.repo.RoleRepository;

public interface RoleService {
	Role findByName(String name);
}
