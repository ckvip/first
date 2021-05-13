package org.namingrule.models;

import org.namingrule.models.exceptions.AppException;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

public class CustomErrorResponse {
    private final String path;
    private final Integer code;
    private final String method;
    private final String message;
    private final Date requestTime;

    public CustomErrorResponse(HttpServletRequest request, AppException ex) {
        this.method = request.getMethod();
        this.path = request.getServletPath();
        this.code = ex.getCode();
        this.message = ex.getMessage();
        this.requestTime = new Date();
    }

    public CustomErrorResponse(HttpServletRequest request, String message, Integer code) {
        this.method = request.getMethod();
        this.path = request.getServletPath();
        this.code = code;
        this.message = message;
        this.requestTime = new Date();
    }

    public String getMethod() {
        return method;
    }

    public String getPath() {
        return path;
    }

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public Date getRequestTime() {
        return requestTime;
    }
}
