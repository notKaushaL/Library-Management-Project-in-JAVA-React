package com.management.library.controller;

import com.management.library.model.Book;
import com.management.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;

@Controller
@RequestMapping("/books")
public class BookViewController {

    @Autowired
    private BookService bookService;

    @GetMapping
    public String getAllBooks(Model model) {
        model.addAttribute("books", bookService.getAllBooks());
        return "books/list";
    }

    @GetMapping("/new")
    public String showAddBookForm(Model model) {
        model.addAttribute("book", new Book());
        return "books/form";
    }

    @GetMapping("/edit/{id}")
    public String showEditBookForm(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes) {
        try {
            Book book = bookService.getBookById(id);
            model.addAttribute("book", book);
            return "books/form";
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
            return "redirect:/books";
        }
    }

    @PostMapping("/save")
    public String addBook(@Valid @ModelAttribute("book") Book book, BindingResult result, 
                         RedirectAttributes redirectAttributes, Model model) {
        if (result.hasErrors()) {
            return "books/form";
        }
        
        try {
            bookService.createBook(book);
            redirectAttributes.addFlashAttribute("successMessage", "Book added successfully!");
            return "redirect:/books";
        } catch (Exception e) {
            model.addAttribute("errorMessage", e.getMessage());
            return "books/form";
        }
    }

    @PostMapping("/update")
    public String updateBook(@Valid @ModelAttribute("book") Book book, BindingResult result, 
                            RedirectAttributes redirectAttributes, Model model) {
        if (result.hasErrors()) {
            return "books/form";
        }
        
        try {
            bookService.updateBook(book.getId(), book);
            redirectAttributes.addFlashAttribute("successMessage", "Book updated successfully!");
            return "redirect:/books";
        } catch (Exception e) {
            model.addAttribute("errorMessage", e.getMessage());
            return "books/form";
        }
    }

    @PostMapping("/delete/{id}")
    public String deleteBook(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            boolean deleted = bookService.deleteBook(id);
            if (deleted) {
                redirectAttributes.addFlashAttribute("successMessage", "Book deleted successfully!");
            } else {
                redirectAttributes.addFlashAttribute("errorMessage", "Cannot delete book because it is borrowed or has borrowing history.");
            }
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
        }
        return "redirect:/books";
    }
} 