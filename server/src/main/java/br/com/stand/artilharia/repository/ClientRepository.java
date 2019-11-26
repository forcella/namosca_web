package br.com.stand.artilharia.repository;

import br.com.stand.artilharia.model.Client;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    @Query("SELECT c FROM Client c")
    public Set<Client> getAll();
}
