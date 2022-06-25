package com.sebrenprojects.oprecipes.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sebrenprojects.oprecipes.entity.Unit;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Long>{

}
