package com.management.library.service;

import com.management.library.model.Book;
import com.management.library.repository.BookRepository;
import com.management.library.repository.BorrowRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    
    @Autowired
    private BorrowRecordRepository borrowRecordRepository;
    
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    
    public Book getBookById(Long id) {
        return bookRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
    }
    
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }
    
    public Book updateBook(Long id, Book bookDetails) {
        Book book = getBookById(id);
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setIsbn(bookDetails.getIsbn());
        book.setAvailable(bookDetails.isAvailable());
        return bookRepository.save(book);
    }
    
    @Transactional
    public boolean deleteBook(Long id) {
        Book book = getBookById(id);
        
        // Check if the book is currently borrowed (not available)
        if (!book.isAvailable()) {
            return false; // Book is borrowed and cannot be deleted
        }
        
        // Check if the book has any borrow history
        boolean hasBorrowHistory = borrowRecordRepository.findAll().stream()
            .anyMatch(borrow -> borrow.getBook().getId().equals(id));
        
        if (hasBorrowHistory) {
            return false; // Book has borrow history and cannot be deleted
        }
        
        try {
            bookRepository.delete(book);
            return true;
        } catch (Exception e) {
            return false; // Could not delete due to constraints
        }
    }
} 