package com.management.library.controller;

import com.management.library.model.Book;
import com.management.library.model.BorrowRecord;
import com.management.library.model.User;
import com.management.library.service.BookService;
import com.management.library.service.BorrowService;
import com.management.library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/borrows")
public class BorrowViewController {

    @Autowired
    private BorrowService borrowService;
    
    @Autowired
    private BookService bookService;
    
    @Autowired
    private UserService userService;

    @GetMapping
    public String getAllBorrows(Model model) {
        model.addAttribute("borrows", borrowService.getAllBorrows());
        return "borrows/list";
    }

    @GetMapping("/new")
    public String showBorrowForm(Model model) {
        // Get only available books for borrowing
        List<Book> availableBooks = bookService.getAllBooks().stream()
                .filter(Book::isAvailable)
                .collect(Collectors.toList());
        
        model.addAttribute("books", availableBooks);
        model.addAttribute("users", userService.getAllUsers());
        return "borrows/form";
    }

    @PostMapping("/save")
    public String borrowBook(@RequestParam Long userId, @RequestParam Long bookId, 
                           RedirectAttributes redirectAttributes) {
        try {
            // Check if both user and book exist and book is available
            User user = userService.getUserById(userId);
            Book book = bookService.getBookById(bookId);
            
            if (!book.isAvailable()) {
                redirectAttributes.addFlashAttribute("errorMessage", "Book is not available for borrowing.");
                return "redirect:/borrows/new";
            }
            
            BorrowRecord borrow = borrowService.borrowBook(userId, bookId);
            redirectAttributes.addFlashAttribute("successMessage", "Book borrowed successfully!");
            return "redirect:/borrows";
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
            return "redirect:/borrows/new";
        }
    }

    @PostMapping("/return/{id}")
    public String returnBook(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            BorrowRecord returnedBorrow = borrowService.returnBook(id);
            redirectAttributes.addFlashAttribute("successMessage", 
                "Book '" + returnedBorrow.getBook().getTitle() + "' returned successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
        }
        return "redirect:/borrows";
    }
} 