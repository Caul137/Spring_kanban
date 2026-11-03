package com.example.backend.backend.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EnumService {
    TODO("todo"),
    IN_PROGRESS("IN_PROGRESS"),
    REVIEW("review"),
    DONE("done");

    private String value;

    EnumService(String value){
        this.value = value;
    }

    @JsonValue 
    public String getValue(){
        return value;
    }

    @JsonCreator 
    EnumService fromValue(String value){
        for(EnumService status : EnumService.values()){
            if(status.value.equalsIgnoreCase(value)){
                return status;
            }
        }
        throw new IllegalArgumentException("Status inválido: " + value);
    }
}
