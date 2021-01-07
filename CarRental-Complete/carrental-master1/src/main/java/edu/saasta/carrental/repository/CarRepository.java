package edu.saasta.carrental.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.saasta.carrental.entity.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
	
	@Transactional
	@Modifying
	@Query("update Car c set c.available = :available WHERE c.id = :id")
	public int updateCarAvailable(boolean available, long id);
	
	@Transactional
	@Modifying
	@Query("update Car c set c.active = :active WHERE c.id = :carId")
	public int updateCarStatus(boolean active, Long carId);
	
	@Query("select c from Car c where c.id = :id")
	public Car findCarById(long id);
	
	@Query("select c from Car c where c.active = true and c.available = true")
	public List<Car> findAllAvailable();
	
	@Query("select c from Car c where c.cartype = :cartype and c.available = true")
	public List<Car> findOtherCarOfSameType(String cartype);
	

}
