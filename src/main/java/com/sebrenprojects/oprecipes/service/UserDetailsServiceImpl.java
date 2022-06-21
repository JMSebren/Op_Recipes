package com.sebrenprojects.oprecipes.service;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sebrenprojects.oprecipes.entity.User;
import com.sebrenprojects.oprecipes.repo.UserRepository;


	/*
	 *			Gets and sets user authorities based on associated role. 
	 */

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	

	
	@Autowired
	UserRepository userRepo;

	/*
	 * 		Takes in a user's email, and attempts to return a UserDetails obj w/ the appropriate authorities		
	 */
	 	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepo.findByEmail(email);
		if (user == null) {
			throw new UsernameNotFoundException("Email " + email + " not found");
		}
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
				getGrantedAuthority(user));
	}
	
	/*
	 * 		Takes in a user obj, checks the user's role, and sets the appropriate authorities before turning them to the caller.	
	 */	
	
	private Collection<GrantedAuthority> getGrantedAuthority(User user) {
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		if(user.getRole().getName().equalsIgnoreCase("admin")) {
			authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		}
		
		authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
		return authorities;
	}

}
