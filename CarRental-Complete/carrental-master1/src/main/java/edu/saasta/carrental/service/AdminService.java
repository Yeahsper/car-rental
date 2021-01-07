package edu.saasta.carrental.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.saasta.carrental.entity.Car;
import edu.saasta.carrental.entity.Order;
import edu.saasta.carrental.entity.User;
import edu.saasta.carrental.exception.IdException;
import edu.saasta.carrental.repository.CarRepository;
import edu.saasta.carrental.repository.OrdersRepository;
import edu.saasta.carrental.repository.UserRepository;

@Service
public class AdminService {

	private static final Logger logger = LoggerFactory.getLogger(AdminService.class);

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private CarRepository carRepo;

	@Autowired
	private OrdersRepository orderRepo;

	public List<User> getAllCustomers(){
		return userRepo.findAll();
	}

	public Iterable<Car> getAllCars(){
		return carRepo.findAll();
	}

	public Car createCar(Car car) throws IdException {
		if(carRepo.findById(car.getId()).isPresent()) {
			throw new IdException("Car with id: "+car.getId()+" already exists");
		}
		carRepo.save(car);
		logger.info("Admin created: "+car.toString());
		return car;
	}

	public Car setCarActive(Car car) throws IdException {
		if(!carRepo.findById(car.getId()).isPresent()) {
			throw new IdException("Car with id: "+car.getId()+" doesn't exist");
		}
		carRepo.updateCarStatus(true, car.getId());
		logger.info("Admin set car to active: "+car.toString());
		return car;
	}

	public Car setCarInactive(Car car) throws IdException {
		if(!carRepo.findById(car.getId()).isPresent()) {
			throw new IdException("Car with id: "+car.getId()+" doesn't exist");
		}

		Car tempCar = carRepo.findCarById(car.getId());
		Order order = new Order();
		if(!car.isAvailable()) {

			order = orderRepo.findByCarId(tempCar.getId());

			List<Car> tempCarList = carRepo.findOtherCarOfSameType(tempCar.getCartype());
			try {
				order.setCar(tempCarList.get(0));
				orderRepo.save(order);
			}catch(Exception e) {
				System.out.println("No car of type: "+tempCar.getCartype());
			}
		}

		carRepo.updateCarAvailable(false, tempCar.getId());
		carRepo.updateCarStatus(false, car.getId());

		logger.info("Admin set car to inactive: "+car.toString());
		return car;
	}

	/*
 	If-satserna finns så om man inte skickar in en fullständig json så blir inget null, och på det här sättet
	kan man uppdatera en variabel för sig själv.
	Dock sätter den active och available till false (ur säkerhetsperspektiv) så om man råkar skriva in fel
	så blir den inte public och man kan hyra den för t.ex 1kr.
	 */
	public Car updateCar(Car car) throws IdException {

		if(carRepo.findById(car.getId()).isPresent()) {
			Optional<Car> existingCar = carRepo.findById(car.getId());

			if(car.getModel() == null) 
				car.setModel(existingCar.get().getModel());

			if(car.getName() == null) 
				car.setName(existingCar.get().getModel());

			if(car.getPrice() == 0.0) 
				car.setPrice(existingCar.get().getPrice());

			car.setActive(car.isActive());
			car.setAvailable(car.isAvailable());

			logger.info("Admin updated: "+car.toString());
			carRepo.save(car);
			return car;
		}else {
			throw new IdException("Car with id: "+car.getId()+" doesn't exists");
		}

	}

}
