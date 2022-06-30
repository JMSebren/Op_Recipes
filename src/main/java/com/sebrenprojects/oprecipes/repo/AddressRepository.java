package com.sebrenprojects.oprecipes.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sebrenprojects.oprecipes.entity.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

}
