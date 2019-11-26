package br.com.stand.artilharia.service;

import org.springframework.stereotype.Service;

import br.com.stand.artilharia.model.Client;
import br.com.stand.artilharia.repository.ClientRepository;

@Service
public class ClientService extends DefaultService<ClientRepository, Client> {

}