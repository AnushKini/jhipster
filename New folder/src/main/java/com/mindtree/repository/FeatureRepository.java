package com.mindtree.repository;

import com.mindtree.domain.Feature;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Feature entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FeatureRepository extends JpaRepository<Feature, Long> {

    @Query(value = "select distinct feature from Feature feature left join fetch feature.privileges",
        countQuery = "select count(distinct feature) from Feature feature")
    Page<Feature> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct feature from Feature feature left join fetch feature.privileges")
    List<Feature> findAllWithEagerRelationships();

    @Query("select feature from Feature feature left join fetch feature.privileges where feature.id =:id")
    Optional<Feature> findOneWithEagerRelationships(@Param("id") Long id);

}
