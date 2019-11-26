package br.com.stand.artilharia.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
@AllArgsConstructor
@Getter
@Setter
public class InvalidCredentialsExeception extends RuntimeException {
    private static final long serialVersionUID = -4079610358760664887L;

    private String message;
    private String hint;
    private String error;

    protected InvalidCredentialsExeception() {
    }
}