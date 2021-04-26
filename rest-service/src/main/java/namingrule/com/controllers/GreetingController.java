package namingrule.com.controllers;

import namingrule.com.models.Greeting;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/greeting")
public class GreetingController {
    @GetMapping("/{id}")
    public Greeting get(@PathVariable long id, @RequestParam(value = "name", defaultValue = "world") String name) {
        return new Greeting(id, String.format("Hello, %s!", name));
    }
    @GetMapping("/{id}/get-id")
    public long getId(@PathVariable long id, @RequestParam(value = "name", defaultValue = "world") String name) {
        Greeting greeting = new Greeting(id, String.format("Hello, %s!", name));
        return greeting.getId();
    }

    @PostMapping("/{id}/{name}")
    public String setName(@PathVariable long id, @PathVariable String name) {
        String output = String.format("id=%s, name=%s", id, name);
        System.out.println(output);
        return output;
    }
}
