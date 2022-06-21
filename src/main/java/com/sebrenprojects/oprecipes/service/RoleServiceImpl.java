package com.sebrenprojects.oprecipes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sebrenprojects.oprecipes.entity.Role;
import com.sebrenprojects.oprecipes.repo.RoleRepository;

@Service
public class RoleServiceImpl implements RoleService{
	
	@Autowired
	RoleRepository repository;

	@Override
	public Role findByName(String name) {
		return repository.findByName(name);
	}
	
	
}
