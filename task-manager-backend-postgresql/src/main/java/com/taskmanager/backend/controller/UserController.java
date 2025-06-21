package com.taskmanager.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.backend.dto.AuthResponse;
import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	private AuthService authService;
	
	@PostMapping("/register")
	public ResponseEntity<AuthResponse> registerUser(@RequestBody User registerUser){
		try {
			System.out.println(registerUser);
			User newUser = authService.register(
					registerUser.getUsername(),
					registerUser.getPassword(),
					registerUser.getEmail(),
					registerUser.getGender(),
					registerUser.getFirstName(),
					registerUser.getLastName()
					);
			return ResponseEntity.ok(new AuthResponse(true, "User registered successfully!", newUser.getId(),newUser.getUsername()));
			
		} catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new AuthResponse(false, e.getMessage(), null, null));
        }
	}
	
	/*@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, Object> request){
		try {
			String username = (String) request.get("username");
			String password = (String) request.get("password");
			
			User loggedUser=authService.login(username, password);
			loggedUser.sanitize();
			
			Map<String, Object> response = new HashMap<>();
			response.put("message", "Login successful");
			response.put("user", loggedUser);
			
			return ResponseEntity.ok(response);		
		} catch (IllegalArgumentException e) {
			Map<String, Object> errorResponse = new HashMap<>();
			errorResponse.put("message", e.getMessage());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
		}
	}*/
	
	@PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody User loginRequest){ 
        try {
        	System.out.println(loginRequest.getUsername()+" :: "+loginRequest.getPassword());
            User loggedUser = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
            AuthResponse authResponse= new AuthResponse(true, "Login successful!", loggedUser.getId(), loggedUser.getUsername());
            System.out.println(authResponse);
            return ResponseEntity.ok(authResponse);
        } catch (RuntimeException e) { 
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse(false, e.getMessage(), null, null));
        }
    }

}
