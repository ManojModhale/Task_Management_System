package com.taskmanager.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.backend.dto.TaskDto;
import com.taskmanager.backend.entity.Task;
import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.repository.TaskRepository;
import com.taskmanager.backend.repository.UserRepository;

@Service
public class TaskService {
	
	@Autowired
	private TaskRepository taskRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public List<Task> getAllTasks(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found for Username: " + username));

        return taskRepository.findByUser(user);
    }

    public Optional<Task> getTaskById(Long id, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found for Username: " + username));

        return taskRepository.findById(id)
                .filter(task -> task.getUser() != null && task.getUser().equals(user));
    }

    public Task createTask(TaskDto newTaskDto, String username) { 
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found for Username: " + username));

        Task newTask = new Task();
        newTask.setTitle(newTaskDto.getTitle());
        newTask.setDescription(newTaskDto.getDescription());
        newTask.setStatus(newTaskDto.getStatus() != null ? newTaskDto.getStatus() : "PENDING");
        newTask.setDueDate(newTaskDto.getDueDate());
        newTask.setUser(user);
        // createdAt and updatedAt 
        return taskRepository.save(newTask);
    }

    public Task updateTask(Long id, TaskDto updatedTaskDto, String username) { 
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found for Username: " + username));

        Task existingTask = taskRepository.findByIdAndUser(id, user);
        if (existingTask == null) {
            throw new RuntimeException("Task not found or unauthorized for ID: " + id);
        }

        existingTask.setTitle(updatedTaskDto.getTitle());
        existingTask.setDescription(updatedTaskDto.getDescription());
        existingTask.setStatus(updatedTaskDto.getStatus());
        existingTask.setDueDate(updatedTaskDto.getDueDate());
        // updatedAt 
        return taskRepository.save(existingTask);
    }

    public void deleteTask(Long id, String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found for Username: " + username));
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id " + id));

        if (!task.getUser().equals(user)) {
            throw new RuntimeException("Unauthorized: You do not own this task.");
        }
        taskRepository.deleteById(id);
    }

}
