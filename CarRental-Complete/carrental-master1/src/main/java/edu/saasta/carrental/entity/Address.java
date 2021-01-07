package edu.saasta.carrental.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "adress")
public class Address {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
    
	private String adress;
	
	private String zipcode;
	
	private String city;
	
	private String country;
	
	@JsonBackReference
    @OneToOne(cascade=CascadeType.ALL, targetEntity=User.class)
    @JoinColumn(name="user_id")
	private User user;
    
	public Address() {
	}
	
	public Address(String adress, String zipcode, String city, String country, User user) {
		this.adress = adress;
		this.zipcode = zipcode;
		this.city = city;
		this.country = country;
		this.user = user;
	}
	
	public long getId() {
		return id;
	}
	public String getAdress() {
		return adress;
	}
	public String getZipcode() {
		return zipcode;
	}
	public String getCity() {
		return city;
	}
	public String getCountry() {
		return country;
	}
	public User getUser() {
		return user;
	}

	
	
	
}
