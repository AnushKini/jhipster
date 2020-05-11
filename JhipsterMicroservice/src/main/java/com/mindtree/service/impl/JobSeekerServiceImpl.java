package com.mindtree.service.impl;

import com.mindtree.service.JobSeekerService;
import com.mindtree.domain.JobSeeker;
import com.mindtree.repository.JobSeekerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing JobSeeker.
 */
@Service
public class JobSeekerServiceImpl implements JobSeekerService {

    private final Logger log = LoggerFactory.getLogger(JobSeekerServiceImpl.class);

    private final JobSeekerRepository jobSeekerRepository;

    public JobSeekerServiceImpl(JobSeekerRepository jobSeekerRepository) {
        this.jobSeekerRepository = jobSeekerRepository;
    }

    /**
     * Save a jobSeeker.
     *
     * @param jobSeeker the entity to save
     * @return the persisted entity
     */
    @Override
    public JobSeeker save(JobSeeker jobSeeker) {
        log.debug("Request to save JobSeeker : {}", jobSeeker);
        return jobSeekerRepository.save(jobSeeker);
    }

    /**
     * Get all the jobSeekers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<JobSeeker> findAll(Pageable pageable) {
        log.debug("Request to get all JobSeekers");
        return jobSeekerRepository.findAll(pageable);
    }


    /**
     * Get one jobSeeker by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<JobSeeker> findOne(String id) {
        log.debug("Request to get JobSeeker : {}", id);
        return jobSeekerRepository.findById(id);
    }

    /**
     * Delete the jobSeeker by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete JobSeeker : {}", id);        jobSeekerRepository.deleteById(id);
    }
}
