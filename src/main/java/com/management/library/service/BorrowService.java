package com.management.library.service;

import com.management.library.model.Book;
import com.management.library.model.BorrowRecord;
import com.management.library.model.User;
import com.management.library.repository.BorrowRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BorrowService {
    @Autowired
    private BorrowRecordRepository borrowRecordRepository;
    
    @Autowired
    private BookService bookService;
    
    @Autowired
    private UserService userService;
    
    public List<BorrowRecord> getAllBorrows() {
        return borrowRecordRepository.findAll();
    }
    
    @Transactional
    public BorrowRecord borrowBook(Long userId, Long bookId) {
        User user = userService.getUserById(userId);
        Book book = bookService.getBookById(bookId);
        
        if (!book.isAvailable()) {
            throw new RuntimeException("Book is not available for borrowing");
        }
        
        book.setAvailable(false);
        bookService.updateBook(bookId, book);
        
        BorrowRecord borrowRecord = new BorrowRecord();
        borrowRecord.setUser(user);
        borrowRecord.setBook(book);
        borrowRecord.setBorrowDate(LocalDateTime.now());
        
        return borrowRecordRepository.save(borrowRecord);
    }
    
    @Transactional
    public BorrowRecord returnBook(Long borrowId) {
        BorrowRecord borrowRecord = borrowRecordRepository.findById(borrowId)
            .orElseThrow(() -> new RuntimeException("Borrow record not found with id: " + borrowId));
            
        if (borrowRecord.getReturnDate() != null) {
            throw new RuntimeException("Book already returned");
        }
        
        Book book = borrowRecord.getBook();
        book.setAvailable(true);
        bookService.updateBook(book.getId(), book);
        
        borrowRecord.setReturnDate(LocalDateTime.now());
        return borrowRecordRepository.save(borrowRecord);
    }
} 