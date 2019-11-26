package br.com.stand.artilharia.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomExceptionInceterceptor extends ResponseEntityExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public final ResponseEntity<CustomExceptionSchema> handleAllExceptions(CustomException ex) {
        CustomExceptionSchema exceptionResponse = new CustomExceptionSchema(ex.getMessage(), ex.getHint(),
                ex.getError());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exceptionResponse);
    }

    @ExceptionHandler(InvalidCredentialsExeception.class)
    public final ResponseEntity<CustomExceptionSchema> handleInvalidCredentialsExeception(
            InvalidCredentialsExeception ex) {
        CustomExceptionSchema exceptionResponse = new CustomExceptionSchema(ex.getMessage(), ex.getHint(),
                ex.getError());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(exceptionResponse);
    }
}