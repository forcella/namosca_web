package br.com.stand.artilharia.service;

import org.springframework.stereotype.Service;

import br.com.stand.artilharia.model.Cliente;
import br.com.stand.artilharia.repository.ClienteRepository;

@Service
public class ClienteService extends DefaultService<ClienteRepository, Cliente> {

}