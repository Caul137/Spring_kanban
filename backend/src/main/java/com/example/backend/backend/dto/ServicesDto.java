package com.example.backend.backend.dto;

import com.example.backend.backend.enums.EnumService;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
public class ServicesDto {

    private long id;
    private String title;
    private EnumService status;
    
}
