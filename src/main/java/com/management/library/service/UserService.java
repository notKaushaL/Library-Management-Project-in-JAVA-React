package com.management.library.service;

import com.management.library.model.User;
import com.management.library.repository.UserRepository;
import com.management.library.repository.BorrowRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BorrowRecordRepository borrowRecordRepository;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
    
    public User createUser(User user) {
        return userRepository.save(user);
    }
    
    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        return userRepository.save(user);
    }
    
    @Transactional
    public boolean deleteUser(Long id) {
        User user = getUserById(id);
        
        // Check if the user has any active borrow records
        boolean hasActiveBorrows = borrowRecordRepository.findAll().stream()
            .anyMatch(borrow -> borrow.getUser().getId().equals(id) && borrow.getReturnDate() == null);
        
        if (hasActiveBorrows) {
            return false; // User has active borrows and cannot be deleted
        }
        
        try {
            userRepository.delete(user);
            return true;
        } catch (Exception e) {
            return false; // Could not delete due to constraints
        }
    }
} 