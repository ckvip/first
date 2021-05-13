package org.namingrule.models.exceptions;

public abstract class AppException extends RuntimeException {
    private final Integer code;

    public AppException(String message, Integer code) {
        super(message);
        this.code = code;
    }

    public AppException(String message, Throwable cause, Integer code) {
        super(message, cause);
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }
}
