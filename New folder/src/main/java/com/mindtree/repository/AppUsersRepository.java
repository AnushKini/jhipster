package com.mindtree.repository;

import com.mindtree.domain.AppUsers;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AppUsers entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppUsersRepository extends JpaRepository<AppUsers, Long> {

}
