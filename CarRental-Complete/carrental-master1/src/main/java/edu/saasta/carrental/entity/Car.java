package edu.saasta.carrental.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "car")
public class Car {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String name;
	
	private String model;
	
	private String cartype;
	
	private double price;
	
	private boolean available;
	
	private boolean active;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL,
			fetch = FetchType.LAZY,
			mappedBy="car")
	private List<Order> order;

	
	

	public Car() {
	}
	
	
	
	public Car(long id, String name, String model, String cartype, double price, boolean available, boolean active,
			List<Order> order) {
		super();
		this.id = id;
		this.name = name;
		this.model = model;
		this.cartype = cartype;
		this.price = price;
		this.available = available;
		this.active = active;
		this.order = order;
	}



	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public boolean isAvailable() {
		return available;
	}
	public void setAvailable(boolean available) {
		this.available = available;
	}
	public List<Order> getOrder() {
		return order;
	}
	public void setOrder(List<Order> order) {
		this.order = order;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}

	public String getCartype() {
		return cartype;
	}

	public void setCartype(String cartype) {
		this.cartype = cartype;
	}



	@Override
	public String toString() {
		return "Car [id=" + id + ", name=" + name + ", model=" + model + ", cartype=" + cartype + ", price=" + price
				+ ", available=" + available + ", active=" + active + ", order=" + order + "]";
	}
}
