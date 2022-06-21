package com.sebrenprojects.oprecipes.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sebrenprojects.oprecipes.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

	@Query("From Role Where name=:name")
	Role findByName(@Param("name") String name);
}
