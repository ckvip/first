package org.namingrule.controllers;

import org.namingrule.models.CustomErrorResponse;
import org.namingrule.models.exceptions.DatabaseOperationException;
import org.namingrule.models.exceptions.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RestControllerAdvice(basePackages = "org.namingrule.controllers")
public class RestControllerErrorHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<CustomErrorResponse> handleNotFoundError(HttpServletRequest request, NotFoundException ex) {
        return new ResponseEntity<>(new CustomErrorResponse(request, ex), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DatabaseOperationException.class)
    public ResponseEntity<CustomErrorResponse> handleDatabaseOperationError(HttpServletRequest request, DatabaseOperationException ex) {
        return new ResponseEntity<>(new CustomErrorResponse(request, ex), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<CustomErrorResponse> handleCommonError(HttpServletRequest request, RuntimeException ex) {
        return new ResponseEntity<>(new CustomErrorResponse(request, ex.getMessage(), 500), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
