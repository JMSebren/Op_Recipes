package com.sebrenprojects.oprecipes.service;

import java.util.Optional;

import com.sebrenprojects.oprecipes.entity.RefreshToken;

public interface RefreshTokenService {

	Optional <RefreshToken> findByToken(String token);
	
	public RefreshToken createRefreshToken(Long userId);
	
	public RefreshToken verifyTokenExpiration(RefreshToken token);
	
	public Boolean existsByUserId(Long user_id);
	
	public int deleteByUserId(Long userId);
}
