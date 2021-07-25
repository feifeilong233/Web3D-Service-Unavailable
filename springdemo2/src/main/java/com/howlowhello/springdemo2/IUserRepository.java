package com.howlowhello.springdemo2;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IUserRepository extends CrudRepository<User, Integer> {

    List<User> findByEmail(String email);

    void deleteByEmail(String email);

}
