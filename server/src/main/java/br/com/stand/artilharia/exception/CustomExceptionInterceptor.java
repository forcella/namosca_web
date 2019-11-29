package br.com.stand.artilharia.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomExceptionInterceptor extends ResponseEntityExceptionHandler {

  @ResponseBody
  @ExceptionHandler(value = { CustomException.class })
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public CustomExceptionSchema handleConflict(CustomException ex) {
   CustomExceptionSchema error = new CustomExceptionSchema(ex.getMessage(),ex.getHint(),ex.getError());
    return error;
  }

  @ResponseBody
  @ExceptionHandler(value = { NotFoundException.class })
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public CustomExceptionSchema handleNotFound(CustomException ex) {
   CustomExceptionSchema error = new CustomExceptionSchema(ex.getMessage(),ex.getHint(),ex.getError());
    return error;
  }
}