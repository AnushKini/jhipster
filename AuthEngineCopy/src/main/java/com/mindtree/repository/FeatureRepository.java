package com.mindtree.repository;

import com.mindtree.domain.Feature;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the Feature entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FeatureRepository extends MongoRepository<Feature, String> {
    @Query("{}")
    Page<Feature> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Feature> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Feature> findOneWithEagerRelationships(String id);

}
