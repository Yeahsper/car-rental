package edu.saasta.carrental.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import edu.saasta.carrental.entity.Car;
import edu.saasta.carrental.entity.Order;
import edu.saasta.carrental.entity.User;
import edu.saasta.carrental.exception.IdException;
import edu.saasta.carrental.repository.CarRepository;
import edu.saasta.carrental.repository.OrdersRepository;
import edu.saasta.carrental.repository.UserRepository;
import edu.saasta.carrental.user.UserPrincipal;

@RestController
public class CustomerService {

	private static final Logger logger = LoggerFactory.getLogger(CustomerService.class);
	
	@Autowired
	private CarRepository carRepo;
	@Autowired
	private OrdersRepository orderRepo;
	@Autowired
	private UserRepository customerRepo;
	
	public List<Car> getAvailableCars(){
		return carRepo.findAllAvailable();
	}
	
	public Order createOrder(Order order, Authentication authentication) throws IdException{
		UserPrincipal userPrincipal = (UserPrincipal)authentication.getPrincipal();
		User tempUser = customerRepo.findByIdCustom(userPrincipal.getId());
		
		order.setUser(tempUser);
		
		
		if(orderRepo.findById(order.getId()).isPresent()) {
			throw new IdException("Order with id: "+order.getUser().getId()+" already exists");
		}
		
		if(!carRepo.findById(order.getCar().getId()).isPresent() && !customerRepo.findById(order.getUser().getId()).isPresent()) {
			throw new IdException("Car with id: "+order.getCar().getId()+" doesn't exists.\n"
					+ "Customer with id: "+order.getUser().getId()+" doesn't exists.");
		}
		if(!carRepo.findById(order.getCar().getId()).isPresent()) {
			throw new IdException("Car with id: "+order.getCar().getId()+" doesn't exists");
		}
		logger.info("User created order: "+order.toString());
		
		tempUser.setNumberOfOrders(tempUser.getNumberOfOrders()+1);
		customerRepo.save(tempUser);
		carRepo.updateCarAvailable(false,order.getCar().getId());
		
		return orderRepo.save(order);
	}
	
	public Order cancelOrder(Order order) throws IdException {
		if(!orderRepo.findById(order.getId()).isPresent()) {
			throw new IdException("Order with id: "+order.getId()+" doesn't exist");
		}
		orderRepo.updateOrderStatus(false, order.getId());
		logger.info("User canceled order: "+order.toString());
		return order;
	}
	
	public List<Order> getAllOrders() {
		return orderRepo.findAll();
	}
	
	public List<Order> getAllOrdersFromLoggedInUser(Authentication authentication) {
		UserPrincipal user = (UserPrincipal)authentication.getPrincipal();
		return customerRepo.findAllOrdersFromUser(user.getId());
	}
	
}
