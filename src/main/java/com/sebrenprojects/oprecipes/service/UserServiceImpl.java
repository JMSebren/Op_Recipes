package com.sebrenprojects.oprecipes.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sebrenprojects.oprecipes.entity.User;
import com.sebrenprojects.oprecipes.repo.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	private static Logger log = LoggerFactory.getLogger(UserServiceImpl.class);
	// note for later: can use return "redirect:/"; in an http statement to send the user back to a certain page
	
	@Autowired
	UserRepository repository;

	@Override
	public User findById(Long id) {
		return repository.getReferenceById(id);
	}

	@Override
	public User findByUsername(String username) {
		return repository.findByUsername(username);
	}
	
	@Override
	public User findByEmail(String email) {
		return repository.findByEmail(email);
	}

	@Override
	public List<User> findAll() {
		return repository.findAll();
	}

	@Override
	public void addUser(User newUser) {
		repository.save(newUser);		
	}

	@Override
	public User saveAndFlush(User user) {
		return repository.saveAndFlush(user);
	}
	
	@Override
	public int deleteUser(Long id) {
		log.info("UserSrvc deleteUser: Function entered. Initiating repository.deleteById ");
		try {
			repository.deleteById(id);
		} catch(IllegalArgumentException e) {
			log.info("UserSrvc findByName err: User not found, returning error. ");
			e.printStackTrace();
			return 0;
		} catch (EmptyResultDataAccessException e) {
			log.info("UserSrvc findByName err: User not found, returning error. ");
			e.printStackTrace();
			return 0;
		}
		return 1;	
	}
}
