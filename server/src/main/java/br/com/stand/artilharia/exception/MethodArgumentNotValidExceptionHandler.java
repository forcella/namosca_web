package br.com.stand.artilharia.exception;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

/**
 * Kudos
 * http://www.petrikainulainen.net/programming/spring-framework/spring-from-the-trenches-adding-validation-to-a-rest-api/
 *
 */
@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class MethodArgumentNotValidExceptionHandler {

    @ResponseStatus(BAD_REQUEST)
    @ResponseBody
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public List<ValidationError> methodArgumentNotValidException(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();
        List<org.springframework.validation.FieldError> fieldErrors = result.getFieldErrors();
        List<ValidationError> erros = new ArrayList<>();

        fieldErrors.forEach(err -> erros.add(new ValidationError(err.getField(), err.getDefaultMessage())));

        return erros;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    static class ValidationError {
        private String field;
        private String message;
    }

}
