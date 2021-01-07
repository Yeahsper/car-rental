package edu.saasta.carrental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.saasta.carrental.entity.Car;
import edu.saasta.carrental.entity.User;
import edu.saasta.carrental.exception.IdException;
import edu.saasta.carrental.service.AdminService;



@RestController
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class AdminController {

	@Autowired
	private AdminService adminService;
	
    @GetMapping("/customers")
    public ResponseEntity<List<User>> getCustomers(){
        return ResponseEntity.ok(adminService.getAllCustomers());
    }
    
    @GetMapping("/allcars")
    public ResponseEntity<Iterable<Car>> getAllCars(){
        return ResponseEntity.ok(adminService.getAllCars());
    }
    
    @PostMapping("/addcar")
    public ResponseEntity addCar(@RequestBody Car car){
        try{
        	return ResponseEntity.ok(adminService.createCar(car));
        }catch(IdException e) {
        	return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @DeleteMapping("/deletecar")
    public ResponseEntity setCarInactive(@RequestBody Car car){
        try {
			return ResponseEntity.ok(adminService.setCarInactive(car));
		} catch (IdException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
    }
    
    @PutMapping("/activatecar")
    public ResponseEntity setCarActive(@RequestBody Car car){
        try {
			return ResponseEntity.ok(adminService.setCarActive(car));
		} catch (IdException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
    }
    
    @PutMapping("/updatecar")
    public ResponseEntity updateCar(@RequestBody Car car){
        try {
			return ResponseEntity.ok(adminService.updateCar(car));
		} catch (IdException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
    }
    
}
