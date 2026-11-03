package com.example.backend.backend.model;

import com.example.backend.backend.enums.EnumService;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ServicesModel {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private EnumService status;
    
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public EnumService getStatus() {
        return status;
    }
    public void setStatus(EnumService status) {
        this.status = status;
    }

    
}
