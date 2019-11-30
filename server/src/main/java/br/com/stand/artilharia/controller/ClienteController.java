package br.com.stand.artilharia.controller;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.stand.artilharia.model.Cliente;
import br.com.stand.artilharia.service.ClienteService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class ClienteController extends DefaultController<Cliente> {

    private ClienteService service;

    @Override
    @GetMapping("/clientes")
    protected ResponseEntity<Page<Cliente>> getAll(@RequestParam("pagina") int pagina,
            @RequestParam("tamanho") int tamanho, String busca) {
        return ResponseEntity.ok()
                .body(service.getAll(busca, (PageRequest.of(pagina, tamanho, Sort.by("id").descending()))));
    }

    @Override
    @GetMapping("/clientes/{id}")
    protected ResponseEntity<Cliente> get(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(service.findOne(id));
    }

    @Override
    @PostMapping("/clientes")
    protected ResponseEntity<Cliente> post(@RequestBody @Valid Cliente obj) {
        return ResponseEntity.ok().body(service.save(obj));
    }

    @Override
    @PutMapping("/clientes/{id}")
    protected ResponseEntity<Cliente> put(@PathVariable Long id, @RequestBody Cliente obj) {
        return ResponseEntity.ok().body(service.update(id, obj));
    }

    @Override
    @DeleteMapping("/clientes/{id}")
    protected ResponseEntity<Boolean> delete(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.delete(id));
    }
}