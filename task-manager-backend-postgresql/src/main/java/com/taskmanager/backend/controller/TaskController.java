package com.taskmanager.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.backend.dto.TaskDto;
import com.taskmanager.backend.entity.Task;
import com.taskmanager.backend.service.TaskService;

@RestController
@RequestMapping("/api/task")
public class TaskController {
	
	@Autowired
	private TaskService taskService;
	
	@GetMapping("/allTasks/{username}")
    public ResponseEntity<List<Task>> getAllTasks(@PathVariable String username){
        try {
            List<Task> tasks = taskService.getAllTasks(username);
            return ResponseEntity.ok(tasks);
        } catch (RuntimeException e) {
            // User not found or unauthorized
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/taskById/{id}/{username}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id, @PathVariable String username){
        try {
            return taskService.getTaskById(id, username)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/add-Task/{username}")
    public ResponseEntity<Task> createTask(@PathVariable String username, @RequestBody TaskDto newTaskDto) { 
        try {
            Task createdTask = taskService.createTask(newTaskDto, username);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/update-Task/{id}/{username}") 
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @PathVariable String username, @RequestBody TaskDto updatedTaskDto) {  
        try {
            Task updatedTask = taskService.updateTask(id, updatedTaskDto, username); 
            return ResponseEntity.ok(updatedTask);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Task not found")) {
                return ResponseEntity.notFound().build(); 
            } else if (e.getMessage().contains("Unauthorized")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); 
            } else if (e.getMessage().contains("User not found")) { 
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); 
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); 
        }
    }

    @DeleteMapping("/delete-Task/{id}/{username}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id, @PathVariable String username) {
        try {
            taskService.deleteTask(id, username);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Task not found")) {
                return ResponseEntity.notFound().build();
            } else if (e.getMessage().contains("Unauthorized")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            } else if (e.getMessage().contains("User not found")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
