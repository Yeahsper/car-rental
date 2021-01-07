package edu.saasta.carrental.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.saasta.carrental.entity.Order;
import edu.saasta.carrental.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	public User findByUsername(String username);
	
	@Query("select u from User u where u.id = :id")
	public User findByIdCustom(long id);
	
	@Query("select u.order from User u where u.id = :id")
	public List<Order> findAllOrdersFromUser(long id);
	

}
