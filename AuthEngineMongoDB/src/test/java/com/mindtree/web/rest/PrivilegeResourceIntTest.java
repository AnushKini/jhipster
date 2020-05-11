package com.mindtree.web.rest;

import com.mindtree.AuthEngineMongoDbApp;

import com.mindtree.domain.Privilege;
import com.mindtree.repository.PrivilegeRepository;
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
 * Test class for the PrivilegeResource REST controller.
 *
 * @see PrivilegeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AuthEngineMongoDbApp.class)
public class PrivilegeResourceIntTest {

    private static final Integer DEFAULT_PERMISSION = 1;
    private static final Integer UPDATED_PERMISSION = 2;

    @Autowired
    private PrivilegeRepository privilegeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restPrivilegeMockMvc;

    private Privilege privilege;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrivilegeResource privilegeResource = new PrivilegeResource(privilegeRepository);
        this.restPrivilegeMockMvc = MockMvcBuilders.standaloneSetup(privilegeResource)
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
    public static Privilege createEntity() {
        Privilege privilege = new Privilege()
            .permission(DEFAULT_PERMISSION);
        return privilege;
    }

    @Before
    public void initTest() {
        privilegeRepository.deleteAll();
        privilege = createEntity();
    }

    @Test
    public void createPrivilege() throws Exception {
        int databaseSizeBeforeCreate = privilegeRepository.findAll().size();

        // Create the Privilege
        restPrivilegeMockMvc.perform(post("/api/privileges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(privilege)))
            .andExpect(status().isCreated());

        // Validate the Privilege in the database
        List<Privilege> privilegeList = privilegeRepository.findAll();
        assertThat(privilegeList).hasSize(databaseSizeBeforeCreate + 1);
        Privilege testPrivilege = privilegeList.get(privilegeList.size() - 1);
        assertThat(testPrivilege.getPermission()).isEqualTo(DEFAULT_PERMISSION);
    }

    @Test
    public void createPrivilegeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = privilegeRepository.findAll().size();

        // Create the Privilege with an existing ID
        privilege.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrivilegeMockMvc.perform(post("/api/privileges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(privilege)))
            .andExpect(status().isBadRequest());

        // Validate the Privilege in the database
        List<Privilege> privilegeList = privilegeRepository.findAll();
        assertThat(privilegeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllPrivileges() throws Exception {
        // Initialize the database
        privilegeRepository.save(privilege);

        // Get all the privilegeList
        restPrivilegeMockMvc.perform(get("/api/privileges?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(privilege.getId())))
            .andExpect(jsonPath("$.[*].permission").value(hasItem(DEFAULT_PERMISSION)));
    }
    
    @Test
    public void getPrivilege() throws Exception {
        // Initialize the database
        privilegeRepository.save(privilege);

        // Get the privilege
        restPrivilegeMockMvc.perform(get("/api/privileges/{id}", privilege.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(privilege.getId()))
            .andExpect(jsonPath("$.permission").value(DEFAULT_PERMISSION));
    }

    @Test
    public void getNonExistingPrivilege() throws Exception {
        // Get the privilege
        restPrivilegeMockMvc.perform(get("/api/privileges/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updatePrivilege() throws Exception {
        // Initialize the database
        privilegeRepository.save(privilege);

        int databaseSizeBeforeUpdate = privilegeRepository.findAll().size();

        // Update the privilege
        Privilege updatedPrivilege = privilegeRepository.findById(privilege.getId()).get();
        updatedPrivilege
            .permission(UPDATED_PERMISSION);

        restPrivilegeMockMvc.perform(put("/api/privileges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrivilege)))
            .andExpect(status().isOk());

        // Validate the Privilege in the database
        List<Privilege> privilegeList = privilegeRepository.findAll();
        assertThat(privilegeList).hasSize(databaseSizeBeforeUpdate);
        Privilege testPrivilege = privilegeList.get(privilegeList.size() - 1);
        assertThat(testPrivilege.getPermission()).isEqualTo(UPDATED_PERMISSION);
    }

    @Test
    public void updateNonExistingPrivilege() throws Exception {
        int databaseSizeBeforeUpdate = privilegeRepository.findAll().size();

        // Create the Privilege

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrivilegeMockMvc.perform(put("/api/privileges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(privilege)))
            .andExpect(status().isBadRequest());

        // Validate the Privilege in the database
        List<Privilege> privilegeList = privilegeRepository.findAll();
        assertThat(privilegeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deletePrivilege() throws Exception {
        // Initialize the database
        privilegeRepository.save(privilege);

        int databaseSizeBeforeDelete = privilegeRepository.findAll().size();

        // Delete the privilege
        restPrivilegeMockMvc.perform(delete("/api/privileges/{id}", privilege.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Privilege> privilegeList = privilegeRepository.findAll();
        assertThat(privilegeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Privilege.class);
        Privilege privilege1 = new Privilege();
        privilege1.setId("id1");
        Privilege privilege2 = new Privilege();
        privilege2.setId(privilege1.getId());
        assertThat(privilege1).isEqualTo(privilege2);
        privilege2.setId("id2");
        assertThat(privilege1).isNotEqualTo(privilege2);
        privilege1.setId(null);
        assertThat(privilege1).isNotEqualTo(privilege2);
    }
}
