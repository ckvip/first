package org.namingrule.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.namingrule.models.Greeting;
import org.namingrule.services.GreetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/greeting")
public class GreetingController {
    private GreetingService service;
    private static final Logger logger = LogManager.getLogger(GreetingController.class);
    @Autowired
    public void setService(GreetingService service) {
        this.service = service;
    }

    @GetMapping()
    public Iterable<Greeting> getAll(@RequestParam(value = "message", defaultValue = "") String message) {
        return message.isEmpty() ? this.service.getAll() : this.service.getByMessage(message);
    }

    @GetMapping("/{id}")
    public Greeting get(@PathVariable long id) {
        logger.debug("this is a debug info");
        logger.info("this is an info");
        logger.warn("this is a warn message");
        logger.error("this is an error");
        logger.fatal("this is a fatal issue");
        return this.service.getById(id);
    }

    @PutMapping("/{id}")
    public Greeting update(@PathVariable long id, @RequestBody Greeting post) {
        Greeting origin = this.service.getById(id);
        origin.update(post);
        return this.service.save(origin);
    }

    @PostMapping
    public Greeting create(@RequestBody Greeting post) {
        String content = String.format("Hello, %s!", post.getMessage());
        Greeting greeting = new Greeting(content);
        return this.service.save(greeting);
    }

    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable long id){
        return this.service.delete(id);
    }
}
