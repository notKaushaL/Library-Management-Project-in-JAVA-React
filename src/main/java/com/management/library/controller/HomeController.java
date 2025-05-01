package com.management.library.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    @GetMapping("/")
    @ResponseBody
    public String home() {
        return "<html><body>" +
                "<h1>Library Management System</h1>" +
                "<p>Welcome to the Library Management System!</p>" +
                "<h2>Available Endpoints:</h2>" +
                "<ul>" +
                "<li><a href='/swagger-ui/'>API Documentation (Swagger UI)</a></li>" +
                "<li><a href='/h2-console'>H2 Database Console</a></li>" +
                "<li><a href='/api/books'>Books API</a></li>" +
                "<li><a href='/api/users'>Users API</a></li>" +
                "</ul>" +
                "</body></html>";
    }
} 