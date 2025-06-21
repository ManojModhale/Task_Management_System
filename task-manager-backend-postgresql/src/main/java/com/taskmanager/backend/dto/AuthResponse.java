package com.taskmanager.backend.dto;

public class AuthResponse {
	
	private boolean success;
	
	private String message;
	
	private Long userId;
	
	private String username;

	public AuthResponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AuthResponse(boolean success, String message, Long userId, String username) {
		super();
		this.success = success;
		this.message = message;
		this.userId = userId;
		this.username = username;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String toString() {
		return "AuthResponse [success=" + success + ", message=" + message + ", userId=" + userId + ", username="
				+ username + "]";
	}
}
