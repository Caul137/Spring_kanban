package com.example.backend.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.backend.services.Services;

import com.example.backend.backend.dto.ServicesDto;
import com.example.backend.backend.model.ServicesModel;

@RestController 
@RequestMapping("/api")
public class ServiceController {

    private final Services services;

    public ServiceController(Services services){
        this.services = services;
    }

    @GetMapping("/list")
    public List<ServicesModel> list(){
        return services.list();
    }

    @PostMapping("/create")
    public ServicesDto create(@RequestBody ServicesDto servicesDto){
        return services.CreateKanbanTask(servicesDto);
    }

    @DeleteMapping("/delete/{id}")
    public void  delete(@PathVariable Long id) {
        services.deleteKanbanTask(id);
    }

}
