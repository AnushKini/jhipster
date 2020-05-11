package com.mindtree.web.rest;

import com.mindtree.AuthEngineMongoDb2App;

import com.mindtree.domain.AppUsers;
import com.mindtree.repository.AppUsersRepository;
import com.mindtree.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;

import java.util.List;


import static com.mindtree.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AppUsersResource REST controller.
 *
 * @see AppUsersResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AuthEngineMongoDb2App.class)
public class AppUsersResourceIntTest {

    private static final String DEFAULT_USERS_NAME = "AAAAAAAAAA";
    private static final String UPDATED_USERS_NAME = "BBBBBBBBBB";

    @Autowired
    private AppUsersRepository appUsersRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restAppUsersMockMvc;

    private AppUsers appUsers;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AppUsersResource appUsersResource = new AppUsersResource(appUsersRepository);
        this.restAppUsersMockMvc = MockMvcBuilders.standaloneSetup(appUsersResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AppUsers createEntity() {
        AppUsers appUsers = new AppUsers()
            .usersName(DEFAULT_USERS_NAME);
        return appUsers;
    }

    @Before
    public void initTest() {
        appUsersRepository.deleteAll();
        appUsers = createEntity();
    }

    @Test
    public void createAppUsers() throws Exception {
        int databaseSizeBeforeCreate = appUsersRepository.findAll().size();

        // Create the AppUsers
        restAppUsersMockMvc.perform(post("/api/app-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appUsers)))
            .andExpect(status().isCreated());

        // Validate the AppUsers in the database
        List<AppUsers> appUsersList = appUsersRepository.findAll();
        assertThat(appUsersList).hasSize(databaseSizeBeforeCreate + 1);
        AppUsers testAppUsers = appUsersList.get(appUsersList.size() - 1);
        assertThat(testAppUsers.getUsersName()).isEqualTo(DEFAULT_USERS_NAME);
    }

    @Test
    public void createAppUsersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = appUsersRepository.findAll().size();

        // Create the AppUsers with an existing ID
        appUsers.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restAppUsersMockMvc.perform(post("/api/app-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appUsers)))
            .andExpect(status().isBadRequest());

        // Validate the AppUsers in the database
        List<AppUsers> appUsersList = appUsersRepository.findAll();
        assertThat(appUsersList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllAppUsers() throws Exception {
        // Initialize the database
        appUsersRepository.save(appUsers);

        // Get all the appUsersList
        restAppUsersMockMvc.perform(get("/api/app-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(appUsers.getId())))
            .andExpect(jsonPath("$.[*].usersName").value(hasItem(DEFAULT_USERS_NAME.toString())));
    }
    
    @Test
    public void getAppUsers() throws Exception {
        // Initialize the database
        appUsersRepository.save(appUsers);

        // Get the appUsers
        restAppUsersMockMvc.perform(get("/api/app-users/{id}", appUsers.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(appUsers.getId()))
            .andExpect(jsonPath("$.usersName").value(DEFAULT_USERS_NAME.toString()));
    }

    @Test
    public void getNonExistingAppUsers() throws Exception {
        // Get the appUsers
        restAppUsersMockMvc.perform(get("/api/app-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAppUsers() throws Exception {
        // Initialize the database
        appUsersRepository.save(appUsers);

        int databaseSizeBeforeUpdate = appUsersRepository.findAll().size();

        // Update the appUsers
        AppUsers updatedAppUsers = appUsersRepository.findById(appUsers.getId()).get();
        updatedAppUsers
            .usersName(UPDATED_USERS_NAME);

        restAppUsersMockMvc.perform(put("/api/app-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAppUsers)))
            .andExpect(status().isOk());

        // Validate the AppUsers in the database
        List<AppUsers> appUsersList = appUsersRepository.findAll();
        assertThat(appUsersList).hasSize(databaseSizeBeforeUpdate);
        AppUsers testAppUsers = appUsersList.get(appUsersList.size() - 1);
        assertThat(testAppUsers.getUsersName()).isEqualTo(UPDATED_USERS_NAME);
    }

    @Test
    public void updateNonExistingAppUsers() throws Exception {
        int databaseSizeBeforeUpdate = appUsersRepository.findAll().size();

        // Create the AppUsers

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAppUsersMockMvc.perform(put("/api/app-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appUsers)))
            .andExpect(status().isBadRequest());

        // Validate the AppUsers in the database
        List<AppUsers> appUsersList = appUsersRepository.findAll();
        assertThat(appUsersList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteAppUsers() throws Exception {
        // Initialize the database
        appUsersRepository.save(appUsers);

        int databaseSizeBeforeDelete = appUsersRepository.findAll().size();

        // Delete the appUsers
        restAppUsersMockMvc.perform(delete("/api/app-users/{id}", appUsers.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AppUsers> appUsersList = appUsersRepository.findAll();
        assertThat(appUsersList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AppUsers.class);
        AppUsers appUsers1 = new AppUsers();
        appUsers1.setId("id1");
        AppUsers appUsers2 = new AppUsers();
        appUsers2.setId(appUsers1.getId());
        assertThat(appUsers1).isEqualTo(appUsers2);
        appUsers2.setId("id2");
        assertThat(appUsers1).isNotEqualTo(appUsers2);
        appUsers1.setId(null);
        assertThat(appUsers1).isNotEqualTo(appUsers2);
    }
}
