package com.management.library.controller;

import com.management.library.model.BorrowRecord;
import com.management.library.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BorrowController {
    @Autowired
    private BorrowService borrowService;
    
    @PostMapping("/borrow")
    public ResponseEntity<BorrowRecord> borrowBook(@RequestParam Long userId, @RequestParam Long bookId) {
        try {
            BorrowRecord borrowRecord = borrowService.borrowBook(userId, bookId);
            return new ResponseEntity<>(borrowRecord, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @PostMapping("/return")
    public ResponseEntity<BorrowRecord> returnBook(@RequestParam Long borrowId) {
        try {
            BorrowRecord borrowRecord = borrowService.returnBook(borrowId);
            return new ResponseEntity<>(borrowRecord, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping("/borrows")
    public ResponseEntity<Iterable<BorrowRecord>> getAllBorrows() {
        return new ResponseEntity<>(borrowService.getAllBorrows(), HttpStatus.OK);
    }
} 