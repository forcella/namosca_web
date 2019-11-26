package br.com.stand.artilharia.controller;

import br.com.stand.artilharia.dto.CredentialRegisterDTO;
import br.com.stand.artilharia.model.Credential;
import br.com.stand.artilharia.service.CredentialService;
import java.net.URI;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@AllArgsConstructor
@RestController
public class CredentialController extends DefaultController {

  private CredentialService service;

  @PostMapping("/register")
  public ResponseEntity<Object> register(@RequestBody CredentialRegisterDTO dto) {
    Credential credential = service.register(dto);
    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(credential.getId())
        .toUri();
    return ResponseEntity.created(location).build();
  }
}
