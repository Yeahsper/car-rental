package edu.saasta.carrental.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.saasta.carrental.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
