package edu.saasta.carrental.user;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import edu.saasta.carrental.entity.Address;
import edu.saasta.carrental.entity.User;

public class UserPrincipal implements UserDetails{

	private static final long serialVersionUID = 1L;

	private Long id;
	
	private String username;
	@JsonIgnore
	private String password;
	private String email;
	
	private User myUser;
	private Address address;
	private List<GrantedAuthority> authorities;
	
	
	public UserPrincipal(User myUser) {
		this.myUser = myUser;
		this.id = myUser.getId();
		this.username = myUser.getUsername();
		this.email = myUser.getEmail();
		this.password = myUser.getPassword();
		this.address = myUser.getAdress();
		this.authorities = Arrays.stream(myUser.getRoles().split(","))
		.map(SimpleGrantedAuthority::new)
		.collect(Collectors.toList());
	}

	

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public User getMyUser() {
		return myUser;
	}

	public void setMyUser(User myUser) {
		this.myUser = myUser;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

		
	public Address getAddress() {
		return address;
	}
	
	public void setAddress(Address address) {
		this.address = address;
	}

	public void setAuthorities(List<GrantedAuthority> authorities) {
		this.authorities = authorities;
	}
	
	public List<GrantedAuthority> getAuthorities() {
		return authorities;
	}
	
	
	

}
