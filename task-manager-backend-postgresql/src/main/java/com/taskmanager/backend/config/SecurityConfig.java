package com.taskmanager.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.csrf(csrf -> csrf.disable())
			.authorizeHttpRequests(authorize -> authorize
	                .requestMatchers("/api/auth/register").permitAll()
	                .requestMatchers("/api/auth/login").permitAll()
	                .requestMatchers("/api/task/allTasks/{username}").permitAll()
	                .requestMatchers("/api/task/taskById/{id}/{username}").permitAll()
	                .requestMatchers("/api/task/add-Task/{username}").permitAll()
	                .requestMatchers("/api/task/update-Task/{id}/{username}").permitAll()
	                .requestMatchers("/api/task/delete-Task/{id}/{username}").permitAll()
	                .anyRequest().permitAll() 
	         )
	         .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		return http.build();	
	}

}
