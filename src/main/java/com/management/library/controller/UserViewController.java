package com.management.library.controller;

import com.management.library.model.User;
import com.management.library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;

@Controller
@RequestMapping("/users")
public class UserViewController {

    @Autowired
    private UserService userService;

    @GetMapping
    public String getAllUsers(Model model) {
        model.addAttribute("users", userService.getAllUsers());
        return "users/list";
    }

    @GetMapping("/new")
    public String showAddUserForm(Model model) {
        model.addAttribute("user", new User());
        return "users/form";
    }

    @GetMapping("/edit/{id}")
    public String showEditUserForm(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes) {
        try {
            User user = userService.getUserById(id);
            model.addAttribute("user", user);
            return "users/form";
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
            return "redirect:/users";
        }
    }

    @PostMapping("/save")
    public String addUser(@Valid @ModelAttribute("user") User user, BindingResult result, 
                         RedirectAttributes redirectAttributes, Model model) {
        if (result.hasErrors()) {
            return "users/form";
        }
        
        try {
            userService.createUser(user);
            redirectAttributes.addFlashAttribute("successMessage", "User added successfully!");
            return "redirect:/users";
        } catch (Exception e) {
            model.addAttribute("errorMessage", e.getMessage());
            return "users/form";
        }
    }

    @PostMapping("/update")
    public String updateUser(@Valid @ModelAttribute("user") User user, BindingResult result, 
                            RedirectAttributes redirectAttributes, Model model) {
        if (result.hasErrors()) {
            return "users/form";
        }
        
        try {
            userService.updateUser(user.getId(), user);
            redirectAttributes.addFlashAttribute("successMessage", "User updated successfully!");
            return "redirect:/users";
        } catch (Exception e) {
            model.addAttribute("errorMessage", e.getMessage());
            return "users/form";
        }
    }

    @PostMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            boolean deleted = userService.deleteUser(id);
            if (deleted) {
                redirectAttributes.addFlashAttribute("successMessage", "User deleted successfully!");
            } else {
                redirectAttributes.addFlashAttribute("errorMessage", "Cannot delete user because they have active borrows or borrowing history.");
            }
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
        }
        return "redirect:/users";
    }
} 