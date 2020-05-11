package com.mindtree.domain;



import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Role.
 */
@Entity
@Table(name = "role")
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "role_name")
    private String roleName;

    @OneToOne
    @JoinColumn(unique = true)
    private Privilege privilege;

    @ManyToMany
    @JoinTable(name = "role_app_users",
               joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "app_users_id", referencedColumnName = "id"))
    private Set<AppUsers> appUsers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
