package br.com.stand.artilharia.dto;

import br.com.stand.artilharia.model.Credential;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CredentialRegisterDTO {

  private String email;
  private String password;

  public Credential toCredential() {
    return Credential.builder().password(password).email(email).enabled(true).build();
  }
}
