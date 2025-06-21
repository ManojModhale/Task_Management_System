package com.taskmanager.backend.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public class TaskDto {
	
	private String title;
	private String description;
    private String status; 
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime dueDate;
    
	public TaskDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public TaskDto(String title, String description, String status, LocalDateTime dueDate) {
		super();
		this.title = title;
		this.description = description;
		this.status = status;
		this.dueDate = dueDate;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getDueDate() {
		return dueDate;
	}

	public void setDueDate(LocalDateTime dueDate) {
		this.dueDate = dueDate;
	}   

}