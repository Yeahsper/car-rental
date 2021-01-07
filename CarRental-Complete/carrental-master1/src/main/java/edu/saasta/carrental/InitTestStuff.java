package edu.saasta.carrental;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import edu.saasta.carrental.entity.Address;
import edu.saasta.carrental.entity.Car;
import edu.saasta.carrental.entity.User;
import edu.saasta.carrental.repository.AddressRepository;
import edu.saasta.carrental.repository.UserRepository;

@Component
public class InitTestStuff implements CommandLineRunner {

	@Autowired
	UserRepository userRepo;
	@Autowired
	AddressRepository adrRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public void run(String... args) throws Exception {
		initStuff();
		testStuff();
	}
	
	private void initStuff() {
		String pw = passwordEncoder.encode("user");
		
		User user = new User("Jesper Saastamoinen","user",pw,"jesper@email.com","ROLE_USER","+46701234567");
		Address adress = new Address("JSVägen123","12345","JSCity","JSCountry",user);
		user.setAdress(adress);
		adrRepo.save(adress);
		userRepo.save(user);
		
		User user1 = new User("TestAnvändare","user1",pw,"användare@test.com","ROLE_USER","+467123456");
		Address adress2 = new Address("JSVägen123","12345","JSCity","JSCountry",user1);
		user1.setAdress(adress2);
		adrRepo.save(adress2);
		userRepo.save(user1);
		
		pw = passwordEncoder.encode("admin");
		user = new User("AdminName","admin",pw,"admin@email.com","ROLE_USER,ROLE_ADMIN","+46987654321");
		Address adress1 = new Address("AdminStreet 123","12345","AdminCity","AdminCountry",user);
		user.setAdress(adress1);
		userRepo.save(user);
		
		
	}
	
	private void testStuff() {

	}

}
