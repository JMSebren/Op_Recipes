package com.sebrenprojects.oprecipes.config;

import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;

// VALIDATES JWT'S RECEIVED IN REQUESTS. ALL REQUESTS REQUIRE A TOKEN, SO IS RUN ON EVERY RECEIVED REQUEST.

public class JwtTokenFilter extends OncePerRequestFilter{

	private static Logger log = LoggerFactory.getLogger(JwtTokenFilter.class);
	
	private JwtTokenProvider tokenProvider;
	
	public JwtTokenFilter(JwtTokenProvider tokenProvider) {
		this.tokenProvider = tokenProvider;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		log.info("JwtTokenFilter : doFilterInternal");
		// PULLS THE TOKEN FROM THE AUTHORIZATION HEADER IN THE REQUEST
		String token = request.getHeader("Authorization");
		log.info(token);
		if (token != null) {
			// RETRIEVES THE CLAIM FROM THE TOKEN, CONFIRMS THE AUTHENTICATION, AND SETS THE
			// SECURITY CONTEXT WITH THAT AUTHENTICATION.
			try {
				Claims claims = tokenProvider.getClaimsFromToken(token);
				if(!claims.getExpiration().before(new Date())) {
					Authentication authentication = tokenProvider.getAuthentication(claims.getSubject());
					if (authentication.isAuthenticated()) {
						SecurityContextHolder.getContext().setAuthentication(authentication);
					}
				}
			} catch (ExpiredJwtException e) {
				// RETURNS AN ERROR MESSAGE IF THE TOKEN IS EXPIRED. THE F/E CAN USE THAT TO
				// QUEUE IN A REQUEST FOR A NEW TOKEN.
				log.error("JWT token is expired: {}", e.getMessage());
				try {
					SecurityContextHolder.clearContext();
					response.setContentType("application/json");
					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
					response.getWriter().println(
							new JSONObject().put("Exception", "expired or invalid JWT Refresh token" + e.getMessage()));
				} catch (IOException | JSONException e1) {
					e.printStackTrace();
				}
					// may need to clear security context, and then send a JSON response w/ appropriate message to initiate new request to validate refresh token
			} catch (RuntimeException e) {
				try {
					SecurityContextHolder.clearContext();
					response.setContentType("application/json");
					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
					response.getWriter().println(
							new JSONObject().put("exception", "expired or invalid JWT token" + e.getMessage()));
				} catch (IOException | JSONException e1) {
					e1.printStackTrace();
				}
				return;
			}
		} else {
			log.info("first time so creating token using UserResourceImpl - authenticate method");
		}
		filterChain.doFilter(request, response);
	}

}
