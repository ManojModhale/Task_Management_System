package com.taskmanager.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
	
	 @Override
	 public void addCorsMappings(CorsRegistry registry) {
	     registry.addMapping("/**")
	         .allowedOrigins("https://task-management-system-app.onrender.com")
	         .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
	         .allowedHeaders("*") 
	         .allowCredentials(true);
	 }
}

