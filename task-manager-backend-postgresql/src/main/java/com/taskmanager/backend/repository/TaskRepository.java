package com.taskmanager.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanager.backend.entity.Task;
import com.taskmanager.backend.entity.User;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

	List<Task> findByUserId(Long userId);
	
	List<Task> findByUser(User user);
	
	Task findByIdAndUser(Long id, User existingUser);
	
}
