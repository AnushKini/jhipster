package com.mindtree.repository;

import com.mindtree.domain.AppUsers;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the AppUsers entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppUsersRepository extends MongoRepository<AppUsers, String> {

}
