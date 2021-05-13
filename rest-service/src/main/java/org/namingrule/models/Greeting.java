package org.namingrule.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "greetings")
public class Greeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String message;
    private Date createdTime;
    private Date lastModifyTime;

    public Greeting() {
    }

    public Greeting(String message) {
        this.message = message;
        this.createdTime = new Date();
    }

    public long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public Date getLastModifyTime() {
        return lastModifyTime;
    }

    public void update(Greeting greeting) {
        if (greeting.getId() == greeting.getId()) {
            this.message = greeting.getMessage();
            this.lastModifyTime = new Date();
        }
    }
}