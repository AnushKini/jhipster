package com.mindtree.repository;

import com.mindtree.domain.Role;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Role entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoleRepository extends MongoRepository<Role, String> {

}
