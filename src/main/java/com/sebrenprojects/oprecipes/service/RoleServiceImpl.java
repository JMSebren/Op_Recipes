package com.sebrenprojects.oprecipes.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sebrenprojects.oprecipes.entity.Role;
import com.sebrenprojects.oprecipes.repo.RoleRepository;

//METHOD IMPLEMENTATIONS FOR ROLE SERVICE

@Service
public class RoleServiceImpl implements RoleService{
	
	@Autowired
	RoleRepository repository;

	@Override
	public Role findByName(String name) {
		return repository.findByName(name);
	}
	
	@Override
	public Role addRole(Role role) {
		return repository.save(role);
	}
	
	@Override
	public List<Role> findAll() {
		List<Role> roles = repository.findAll();
		
		return roles;
	}
	
	@Override
	public void addAll(List<Role> roles) {
		repository.saveAll(roles);
	}
	
}
