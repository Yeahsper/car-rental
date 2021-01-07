package edu.saasta.carrental.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.saasta.carrental.entity.Order;

@Repository
public interface OrdersRepository extends JpaRepository<Order, Long> {

	
	@Transactional
	@Modifying
	@Query("update Order o set o.active = :active WHERE o.id = :orderId")
	public int updateOrderStatus(boolean active, long orderId);
	
	@Transactional
	@Modifying
	@Query("update Order o set o.car.id = :carid WHERE o.id = :orderId")
	public int updateOrderCar(long carid, long orderId);
	
	@Query("select o from Order o where o.user.id = :userid")
	public List<Order> findByUserId(long userid);
	
	@Query("select o from Order o where o.car.id = :carid")
	public Order findByCarId(long carid);
}
