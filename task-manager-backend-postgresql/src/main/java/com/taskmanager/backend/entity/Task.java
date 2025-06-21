package com.taskmanager.backend.entity;

import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "Tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class Task {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String title;
	
	private String description;
	
	@Column(nullable = false)
	private String status= "PENDING";
	
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
	private LocalDateTime dueDate;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@Column(nullable = false)
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
	private LocalDateTime createdAt;
	
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
	private LocalDateTime updatedAt;
	
	@PrePersist
	protected void onCreate() {
		this.createdAt = LocalDateTime.now();
		this.updatedAt = LocalDateTime.now();
	}
	
	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = LocalDateTime.now();
	}

	public Task() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Task(Long id, String title, String description, String status, LocalDateTime dueDate, User user,
			LocalDateTime createdAt, LocalDateTime updatedAt) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.status = status;
		this.dueDate = dueDate;
		this.user = user;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Task(String title, String description, String status, LocalDateTime dueDate) {
		super();
		this.title = title;
		this.description = description;
		this.status = status;
		this.dueDate = dueDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	@Override
	public String toString() {
		return "Task [id=" + id + ", title=" + title + ", description=" + description + ", status=" + status
				+ ", dueDate=" + dueDate + ", user=" + user + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt
				+ "]";
	}
	
}

