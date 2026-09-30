package com.powerplay.controller;

import com.powerplay.service.ProdutoService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {

    private final ProdutoService service;

    public AdminController(ProdutoService service) {
        this.service = service;
    }

    @GetMapping("/admin/produtos")
    public String produtos(Model model) {
        model.addAttribute("produtos", service.findAll());
        return "produtos";
    }
}
