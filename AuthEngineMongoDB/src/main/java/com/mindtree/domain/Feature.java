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
 * A Feature.
 */
@Document(collection = "feature")
public class Feature implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @Field("description")
    private String description;

    @Field("type")
    private String type;

    @Field("is_critical")
    private String isCritical;

    @DBRef
    @Field("privileges")
    private Set<Privilege> privileges = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public Feature description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public Feature type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getIsCritical() {
        return isCritical;
    }

    public Feature isCritical(String isCritical) {
        this.isCritical = isCritical;
        return this;
    }

    public void setIsCritical(String isCritical) {
        this.isCritical = isCritical;
    }

    public Set<Privilege> getPrivileges() {
        return privileges;
    }

    public Feature privileges(Set<Privilege> privileges) {
        this.privileges = privileges;
        return this;
    }

    public Feature addPrivilege(Privilege privilege) {
        this.privileges.add(privilege);
        privilege.getFeatures().add(this);
        return this;
    }

    public Feature removePrivilege(Privilege privilege) {
        this.privileges.remove(privilege);
        privilege.getFeatures().remove(this);
        return this;
    }

    public void setPrivileges(Set<Privilege> privileges) {
        this.privileges = privileges;
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
        Feature feature = (Feature) o;
        if (feature.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), feature.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Feature{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", type='" + getType() + "'" +
            ", isCritical='" + getIsCritical() + "'" +
            "}";
    }
}
