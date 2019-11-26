package br.com.stand.artilharia.controller;

import com.fasterxml.jackson.annotation.JsonView;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import br.com.stand.artilharia.model.Client;
import br.com.stand.artilharia.service.ClientService;
import br.com.stand.artilharia.view.UserView;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class ClientController extends DefaultController {

    private ClientService service;

    @GetMapping("/clients/{id}")
    @JsonView({ UserView.Get.class })
    public ResponseEntity<Client> getClient(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.findOne(id));
    }
}
