package com.mindtree.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Privilege.
 */
@Entity
@Table(name = "privilege")
public class Privilege implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "permission")
    private Integer permission;

    @OneToOne(mappedBy = "privilege")
    @JsonIgnore
    private Role role;

    @ManyToMany(mappedBy = "privileges")
    @JsonIgnore
    private Set<Feature> features = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPermission() {
        return permission;
    }

    public Privilege permission(Integer permission) {
        this.permission = permission;
        return this;
    }

    public void setPermission(Integer permission) {
        this.permission = permission;
    }

    public Role getRole() {
        return role;
    }

    public Privilege role(Role role) {
        this.role = role;
        return this;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Set<Feature> getFeatures() {
        return features;
    }

    public Privilege features(Set<Feature> features) {
        this.features = features;
        return this;
    }

    public Privilege addFeature(Feature feature) {
        this.features.add(feature);
        feature.getPrivileges().add(this);
        return this;
    }

    public Privilege removeFeature(Feature feature) {
        this.features.remove(feature);
        feature.getPrivileges().remove(this);
        return this;
    }

    public void setFeatures(Set<Feature> features) {
        this.features = features;
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
        Privilege privilege = (Privilege) o;
        if (privilege.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), privilege.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Privilege{" +
            "id=" + getId() +
            ", permission=" + getPermission() +
            "}";
    }
}
