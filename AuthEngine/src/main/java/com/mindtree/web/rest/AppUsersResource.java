package com.mindtree.web.rest;
import com.mindtree.domain.AppUsers;
import com.mindtree.repository.AppUsersRepository;
import com.mindtree.web.rest.errors.BadRequestAlertException;
import com.mindtree.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AppUsers.
 */
@RestController
@RequestMapping("/api")
public class AppUsersResource {

    private final Logger log = LoggerFactory.getLogger(AppUsersResource.class);

    private static final String ENTITY_NAME = "appUsers";

    private final AppUsersRepository appUsersRepository;

    public AppUsersResource(AppUsersRepository appUsersRepository) {
        this.appUsersRepository = appUsersRepository;
    }

    /**
     * POST  /app-users : Create a new appUsers.
     *
     * @param appUsers the appUsers to create
     * @return the ResponseEntity with status 201 (Created) and with body the new appUsers, or with status 400 (Bad Request) if the appUsers has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/app-users")
    public ResponseEntity<AppUsers> createAppUsers(@RequestBody AppUsers appUsers) throws URISyntaxException {
        log.debug("REST request to save AppUsers : {}", appUsers);
        if (appUsers.getId() != null) {
            throw new BadRequestAlertException("A new appUsers cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AppUsers result = appUsersRepository.save(appUsers);
        return ResponseEntity.created(new URI("/api/app-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /app-users : Updates an existing appUsers.
     *
     * @param appUsers the appUsers to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated appUsers,
     * or with status 400 (Bad Request) if the appUsers is not valid,
     * or with status 500 (Internal Server Error) if the appUsers couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/app-users")
    public ResponseEntity<AppUsers> updateAppUsers(@RequestBody AppUsers appUsers) throws URISyntaxException {
        log.debug("REST request to update AppUsers : {}", appUsers);
        if (appUsers.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AppUsers result = appUsersRepository.save(appUsers);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, appUsers.getId().toString()))
            .body(result);
    }

    /**
     * GET  /app-users : get all the appUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of appUsers in body
     */
    @GetMapping("/app-users")
    public List<AppUsers> getAllAppUsers() {
        log.debug("REST request to get all AppUsers");
        return appUsersRepository.findAll();
    }

    /**
     * GET  /app-users/:id : get the "id" appUsers.
     *
     * @param id the id of the appUsers to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the appUsers, or with status 404 (Not Found)
     */
    @GetMapping("/app-users/{id}")
    public ResponseEntity<AppUsers> getAppUsers(@PathVariable Long id) {
        log.debug("REST request to get AppUsers : {}", id);
        Optional<AppUsers> appUsers = appUsersRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(appUsers);
    }

    /**
     * DELETE  /app-users/:id : delete the "id" appUsers.
     *
     * @param id the id of the appUsers to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/app-users/{id}")
    public ResponseEntity<Void> deleteAppUsers(@PathVariable Long id) {
        log.debug("REST request to delete AppUsers : {}", id);
        appUsersRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
