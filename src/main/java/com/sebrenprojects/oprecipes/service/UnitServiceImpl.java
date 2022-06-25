package com.sebrenprojects.oprecipes.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sebrenprojects.oprecipes.entity.Unit;
import com.sebrenprojects.oprecipes.repo.UnitRepository;

@Service
public class UnitServiceImpl implements UnitService {

	@Autowired
	UnitRepository repository;
	
	@Override
	public List<Unit> findAll() {
		return repository.findAll();
	}

}
