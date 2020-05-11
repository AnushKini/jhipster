package com.mindtree.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Role.
 */
@Document(collection = "role")
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @Field("role_name")
    private String roleName;

    @DBRef
    @Field("privilege")
    private Privilege privilege;

    @DBRef
    @Field("appUsers")
    private Set<AppUsers> appUsers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public Role roleName(String roleName) {
        this.roleName = roleName;
        return this;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Privilege getPrivilege() {
        return privilege;
    }

    public Role privilege(Privilege privilege) {
        this.privilege = privilege;
        return this;
    }

    public void setPrivilege(Privilege privilege) {
        this.privilege = privilege;
    }

    public Set<AppUsers> getAppUsers() {
        return appUsers;
    }

    public Role appUsers(Set<AppUsers> appUsers) {
        this.appUsers = appUsers;
        return this;
    }

    public Role addAppUsers(AppUsers appUsers) {
        this.appUsers.add(appUsers);
        appUsers.getRoles().add(this);
        return this;
    }

    public Role removeAppUsers(AppUsers appUsers) {
        this.appUsers.remove(appUsers);
        appUsers.getRoles().remove(this);
        return this;
    }

    public void setAppUsers(Set<AppUsers> appUsers) {
        this.appUsers = appUsers;
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
        Role role = (Role) o;
        if (role.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), role.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Role{" +
            "id=" + getId() +
            ", roleName='" + getRoleName() + "'" +
            "}";
    }
}
