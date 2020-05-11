package com.mindtree.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A AppUsers.
 */
@Entity
@Table(name = "app_users")
public class AppUsers implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "users_name")
    private String usersName;

    @OneToMany(mappedBy = "appUsers")
    private Set<Role> roles = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsersName() {
        return usersName;
    }

    public AppUsers usersName(String usersName) {
        this.usersName = usersName;
        return this;
    }

    public void setUsersName(String usersName) {
        this.usersName = usersName;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public AppUsers roles(Set<Role> roles) {
        this.roles = roles;
        return this;
    }

    public AppUsers addRole(Role role) {
        this.roles.add(role);
        role.setAppUsers(this);
        return this;
    }

    public AppUsers removeRole(Role role) {
        this.roles.remove(role);
        role.setAppUsers(null);
        return this;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AppUsers appUsers = (AppUsers) o;
        if (appUsers.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), appUsers.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AppUsers{" +
            "id=" + getId() +
            ", usersName='" + getUsersName() + "'" +
            "}";
    }
}
