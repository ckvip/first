package org.namingrule.services;

import org.namingrule.models.Greeting;
import org.namingrule.models.GreetingRepository;
import org.namingrule.models.exceptions.DatabaseOperationException;
import org.namingrule.models.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class GreetingService {
    private GreetingRepository repository;

    @Autowired
    public void setRepository(GreetingRepository repository) {
        this.repository = repository;
    }

    public Iterable<Greeting> getAll() {
        try {
            return this.repository.findAll();
        } catch (RuntimeException ex) {
            throw new DatabaseOperationException("Fail to query all greeting", ex);
        }
    }

    public Iterable<Greeting> getByMessage(String message) {
        try {
            return this.repository.findAllByMessage(message);
        } catch (RuntimeException ex) {
            throw new DatabaseOperationException("Fail to query greeting by message", ex);
        }
    }

    public Greeting getById(long id) {
        return this.repository.findById(id).orElseThrow(() -> new NotFoundException(id));
    }

    public void save(Greeting greeting) {
        try {
            this.repository.save(greeting);
        } catch (RuntimeException ex) {
            throw new DatabaseOperationException("fail to save greeting", ex);
        }
    }

    public boolean delete(long id) {
        try {
            this.repository.deleteById(id);
            return true;
        } catch (RuntimeException ex) {
            throw new DatabaseOperationException("fail to delete the record with id:" + id, ex);
        }
    }

}
