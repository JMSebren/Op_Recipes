package com.sebrenprojects.oprecipes.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sebrenprojects.oprecipes.entity.RefreshToken;
import com.sebrenprojects.oprecipes.entity.User;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {


	Optional <RefreshToken> findByToken(String token);
	
	public Boolean existsByUserId(Long user_id);

	public int deleteByUser(User user);
}
