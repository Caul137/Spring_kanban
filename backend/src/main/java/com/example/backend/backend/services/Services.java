package com.example.backend.backend.services;

import java.util.List;


import org.springframework.stereotype.Service;

import com.example.backend.backend.dto.ServicesDto;
import com.example.backend.backend.repository.ServicesRepository;
import com.example.backend.backend.model.ServicesModel;


@Service 
public class Services {

    private final ServicesRepository servicesRepository; 

    public Services(ServicesRepository servicesRepository){
        this.servicesRepository = servicesRepository;
    }

    public List<ServicesModel> list(){
        if(this.servicesRepository.count() == 0){
        return List.of();
        }
        return this.servicesRepository.findAll();
    }

  
    public ServicesDto CreateKanbanTask(ServicesDto servicesDto){
        ServicesModel serviceKanban = new ServicesModel();
        serviceKanban.setTitle(servicesDto.getTitle());
        serviceKanban.setStatus(servicesDto.getStatus());
        ServicesModel savedService = servicesRepository.save(serviceKanban);
        return toDto(savedService);
    }


    public void deleteKanbanTask(Long id){
        if(!servicesRepository.existsById(id)) {
            throw new RuntimeException("error");
        }
         servicesRepository.deleteById(id);
    }



    public ServicesDto toDto(ServicesModel savedService){
        ServicesDto service = new ServicesDto();
        service.setId(savedService.getId());
        service.setTitle(savedService.getTitle());
        service.setStatus(savedService.getStatus());
        return service;

    }
   
}
