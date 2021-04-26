package namingrule.com.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/name")
public class NamingController {

    @GetMapping()
    public String getName() {
        return "the name controller";
    }
}
