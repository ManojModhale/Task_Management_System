package com.taskmanager.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.repository.UserRepository;

@Service
public class AuthService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public User register(String username, String password, String email, String gender, String firstName, String lastName) {
		if(userRepository.findByUsername(username).isPresent()) {
			throw new RuntimeException("Username already exists");
		}
		/*if(userRepository.findByEmail(email).isPresent()) { 
            throw new RuntimeException("Email already exists");
        }*/
		
		User newUser = new User();
		newUser.setUsername(username);
		newUser.setPassword(passwordEncoder.encode(password));
		newUser.setEmail(email);
		newUser.setGender(gender);
		newUser.setFirstName(firstName);
		newUser.setLastName(lastName);
		// createdAt and updatedAt
		
		return userRepository.save(newUser);
	}
	
	public User login(String username, String password) {
		User user=userRepository.findByUsername(username)
				.orElseThrow(() -> new RuntimeException("User not found"));
		
		if(!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return user;
	}

}
