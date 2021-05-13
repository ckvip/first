package org.namingrule.models;

import org.springframework.data.repository.CrudRepository;
public interface GreetingRepository extends CrudRepository<Greeting, Long> {
    Iterable<Greeting> findAllByMessage(String message);
}
