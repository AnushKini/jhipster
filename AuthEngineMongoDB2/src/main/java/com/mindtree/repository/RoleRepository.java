package com.mindtree.repository;

import com.mindtree.domain.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the Role entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
    @Query("{}")
    Page<Role> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Role> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Role> findOneWithEagerRelationships(String id);

}
