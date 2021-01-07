package edu.saasta.carrental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.saasta.carrental.entity.Car;
import edu.saasta.carrental.entity.Order;
import edu.saasta.carrental.exception.IdException;
import edu.saasta.carrental.service.CustomerService;



@RestController
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class CustomerController {

	@Autowired
	private CustomerService customerService;

	@GetMapping("/availablecars")
	public ResponseEntity<List<Car>> getAvailableCars(){
		return ResponseEntity.ok(customerService.getAvailableCars());
	}

	@PostMapping("/ordercar")
	public ResponseEntity orderCar(@RequestBody Order order, Authentication auth){

		try {
			return ResponseEntity.ok(customerService.createOrder(order, auth));
		} catch (IdException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}

	}

	@PutMapping("/updateorder")
	public ResponseEntity cancelOrder(@RequestBody Order order){
		try {
			return ResponseEntity.ok(customerService.cancelOrder(order));
		} catch (IdException e) {
			return ResponseEntity.ok(e.getMessage());
		}
	}

	@GetMapping("/myorders")
	public ResponseEntity<List<Order>> getMyOrders(Authentication auth){
		return ResponseEntity.ok(customerService.getAllOrdersFromLoggedInUser(auth));
	}

}
