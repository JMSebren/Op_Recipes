package com.sebrenprojects.oprecipes.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sebrenprojects.oprecipes.entity.RefreshToken;
import com.sebrenprojects.oprecipes.exception.TokenRefreshException;
import com.sebrenprojects.oprecipes.repo.RefreshTokenRepository;
import com.sebrenprojects.oprecipes.repo.UserRepository;

//METHOD IMPLEMENTATIONS FOR REFRESH_TOKEN SERVICE

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {
	
	private static Logger log = LoggerFactory.getLogger(RefreshTokenServiceImpl.class);

	@Value("${jwt.RefreshExpirationMs}")
	private Long refreshTokenDurationMs;
	
	@Autowired
	private RefreshTokenRepository tokenRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Override
	public RefreshToken createRefreshToken(Long userId) {
		log.info("createRefreshToken : function start");
		RefreshToken refreshToken = new RefreshToken();
		refreshToken.setUser(userRepo.getReferenceById(userId));
		refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
		refreshToken.setToken(UUID.randomUUID().toString());
		log.info("createRefreshToken : saving token");

		refreshToken = tokenRepo.save(refreshToken);
		return refreshToken;
	}
	
	@Override
	public Optional <RefreshToken> findByToken(String token) {
		return tokenRepo.findByToken(token);
	}	

	@Override
	public RefreshToken verifyTokenExpiration(RefreshToken token) {
		if (token.getExpiryDate().compareTo(Instant.now()) < 0 ) {
			tokenRepo.delete(token);
			throw new TokenRefreshException(token.getToken(), "Refresh token expired. Sign in again to renew");
		}
		return token;
	}
	
	@Override
	public Boolean existsByUserId(Long id) {		
		return tokenRepo.existsByUserId(id);
	}

	@Transactional
	@Override
	public int deleteByUserId(Long userId) {
		return tokenRepo.deleteByUser(userRepo.getReferenceById(userId));
	}

}
