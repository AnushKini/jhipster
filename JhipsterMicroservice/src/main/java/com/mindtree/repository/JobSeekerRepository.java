package com.mindtree.repository;

import com.mindtree.domain.JobSeeker;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the JobSeeker entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JobSeekerRepository extends MongoRepository<JobSeeker, String> {

}
