package edu.saasta.carrental.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

    @DateTimeFormat(iso = ISO.NONE)
    private String created;
    
    @DateTimeFormat(iso = ISO.NONE)
    private String fromDate;
    
    @DateTimeFormat(iso = ISO.NONE)
    private String endDate;
    
    private boolean active;
    
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity=Car.class)
    @JoinColumn(name="car_id")
    private Car car;
    
    @JsonBackReference
    @ManyToOne(cascade = CascadeType.MERGE, targetEntity=User.class)
    @JoinColumn(name="user_id")
    private User user;
    
    

	public Order() {
	}

	
	
	public Order(long id, String created, String fromDate, String endDate, boolean active, Car car, User user) {
		super();
		this.id = id;
		this.created = created;
		this.fromDate = fromDate;
		this.endDate = endDate;
		this.active = active;
		this.car = car;
		this.user = user;
	}



	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCreated() {
		return created;
	}

	public void setCreated(String created) {
		this.created = created;
	}

	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public Car getCar() {
		return car;
	}

	public void setCar(Car car) {
		this.car = car;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Orders [id=" + id + ", created=" + created + ", fromDate=" + fromDate + ", endDate=" + endDate
				+ ", active=" + active + ", car=" + car + ", customer=" + user + "]";
	}
    
    
    
	
	
	
    
	
}
