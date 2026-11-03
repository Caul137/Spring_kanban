package com.example.backend.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.backend.model.ServicesModel;

@Repository 
public interface ServicesRepository extends JpaRepository<ServicesModel, Long> {

}
