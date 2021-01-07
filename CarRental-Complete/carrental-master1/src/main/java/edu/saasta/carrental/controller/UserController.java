package edu.saasta.carrental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.saasta.carrental.entity.User;
import edu.saasta.carrental.repository.UserRepository;
import edu.saasta.carrental.user.UserPrincipal;

@RestController
public class UserController {

	@Autowired
	UserRepository userRepo;
	
	@GetMapping("/users/currentuser")
	public UserPrincipal getCurrentLoggedUser(Authentication authentication) {
		UserPrincipal user = (UserPrincipal)authentication.getPrincipal();
		return user;
	}
	
	@GetMapping("/users/currentuser/address")
	public ResponseEntity getCurrentLoggedUserAddress(Authentication authentication) {
		UserPrincipal user = (UserPrincipal)authentication.getPrincipal();
		return ResponseEntity.ok(user.getAddress());
	}
	
	@GetMapping("/users/logouttest")
	public ResponseEntity<Object> logoutTest() {
		return ResponseEntity.status(401).build();
	}
	

}
