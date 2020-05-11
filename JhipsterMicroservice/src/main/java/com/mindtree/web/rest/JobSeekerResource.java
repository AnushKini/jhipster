package com.mindtree.web.rest;
import com.mindtree.domain.JobSeeker;
import com.mindtree.service.JobSeekerService;
import com.mindtree.web.rest.errors.BadRequestAlertException;
import com.mindtree.web.rest.util.HeaderUtil;
import com.mindtree.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing JobSeeker.
 */
@RestController
@RequestMapping("/api")
public class JobSeekerResource {

    private final Logger log = LoggerFactory.getLogger(JobSeekerResource.class);

    private static final String ENTITY_NAME = "jobSeeker";

    private final JobSeekerService jobSeekerService;

    public JobSeekerResource(JobSeekerService jobSeekerService) {
        this.jobSeekerService = jobSeekerService;
    }

    /**
     * POST  /job-seekers : Create a new jobSeeker.
     *
     * @param jobSeeker the jobSeeker to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jobSeeker, or with status 400 (Bad Request) if the jobSeeker has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/job-seekers")
    public ResponseEntity<JobSeeker> createJobSeeker(@RequestBody JobSeeker jobSeeker) throws URISyntaxException {
        log.debug("REST request to save JobSeeker : {}", jobSeeker);
        if (jobSeeker.getId() != null) {
            throw new BadRequestAlertException("A new jobSeeker cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JobSeeker result = jobSeekerService.save(jobSeeker);
        return ResponseEntity.created(new URI("/api/job-seekers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /job-seekers : Updates an existing jobSeeker.
     *
     * @param jobSeeker the jobSeeker to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jobSeeker,
     * or with status 400 (Bad Request) if the jobSeeker is not valid,
     * or with status 500 (Internal Server Error) if the jobSeeker couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/job-seekers")
    public ResponseEntity<JobSeeker> updateJobSeeker(@RequestBody JobSeeker jobSeeker) throws URISyntaxException {
        log.debug("REST request to update JobSeeker : {}", jobSeeker);
        if (jobSeeker.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        JobSeeker result = jobSeekerService.save(jobSeeker);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jobSeeker.getId().toString()))
            .body(result);
    }

    /**
     * GET  /job-seekers : get all the jobSeekers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of jobSeekers in body
     */
    @GetMapping("/job-seekers")
    public ResponseEntity<List<JobSeeker>> getAllJobSeekers(Pageable pageable) {
        log.debug("REST request to get a page of JobSeekers");
        Page<JobSeeker> page = jobSeekerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/job-seekers");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /job-seekers/:id : get the "id" jobSeeker.
     *
     * @param id the id of the jobSeeker to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jobSeeker, or with status 404 (Not Found)
     */
    @GetMapping("/job-seekers/{id}")
    public ResponseEntity<JobSeeker> getJobSeeker(@PathVariable String id) {
        log.debug("REST request to get JobSeeker : {}", id);
        Optional<JobSeeker> jobSeeker = jobSeekerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(jobSeeker);
    }

    /**
     * DELETE  /job-seekers/:id : delete the "id" jobSeeker.
     *
     * @param id the id of the jobSeeker to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/job-seekers/{id}")
    public ResponseEntity<Void> deleteJobSeeker(@PathVariable String id) {
        log.debug("REST request to delete JobSeeker : {}", id);
        jobSeekerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
